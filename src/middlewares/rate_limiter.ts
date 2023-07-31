import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { Cache } from 'cache-manager'
import {  getUnixTime, getMinutes, subMinutes } from 'date-fns'

/**
* maxRequests -  Max requests to be allowed
* window - Window to check for the max requests in minutes
*/
type LimiterConfig = {
    windowLogInterval?: number
    maxRequests?: number 
    window?: number
}

type strategy = "IP" | "USER_ID" | "USER_ID_WITH_ENDPOINT"



@Service()
export class RateLimiter {
    constructor(@Inject('cache_service') private cache: Cache){
    }

    getUnixTimestampInMinutes(date: Date){
        return Math.ceil(getUnixTime(date) / 60)
    }

    limit = (config: LimiterConfig , strategy: strategy = "IP") =>  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { maxRequests = 100, window = 60, windowLogInterval = 1 } = config

            const key = this.getKeyUsingStrategy(req, strategy)
            const cacheData: string | undefined = await this.cache.get(key)


            const currentRequestTime = new Date()

            if (!cacheData){
                const newRecord = []
                const requestLog = {
                    requestTimestamp: this.getUnixTimestampInMinutes(currentRequestTime), // Unix timestamp to minutes
                    requestCount: 1
                }

                newRecord.push(requestLog)
                await this.cache.set(key, JSON.stringify(newRecord), 2 * 60 * 1000 * window)
                return next()
            }

            const parsedData: {requestCount: number, requestTimestamp: number}[] = JSON.parse(cacheData)
            const windowStartTime = this.getUnixTimestampInMinutes(subMinutes(currentRequestTime, window)) // window minutes ago
            const requestsWithinWindow = parsedData.filter((entry) => {
                return windowStartTime < entry.requestTimestamp
            })

            let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount;
            }, 0);

            if(totalWindowRequestsCount >= maxRequests) {
                return res.status(429).send({
                    status: 'failed',
                    message: 'You have made too many requests in a short amount of time. Kindly try again after sometime'
                })
            } else {
                const lastLoggedData = parsedData[parsedData.length - 1]
                let potentialCurrentWindowIntervalStartTimeStamp = this.getUnixTimestampInMinutes(subMinutes(currentRequestTime, windowLogInterval))

                if (lastLoggedData.requestTimestamp >= potentialCurrentWindowIntervalStartTimeStamp) {
                    lastLoggedData.requestCount++;
                    parsedData[parsedData.length - 1] = lastLoggedData;
                } else {
                    //  if interval has passed, log new entry for current user and timestamp
                    parsedData.push({
                    requestTimestamp:  this.getUnixTimestampInMinutes(currentRequestTime),
                    requestCount: 1,
                    });
                }
                await this.cache.set(key, JSON.stringify(parsedData), 2 * 60 * 1000 * window);
                return next()
            } 
        } catch(err){
            console.log('Error with limit middleware')
            throw new Error('Error limiting user requests')
        }

    } 

    getKeyUsingStrategy(req: Request, strategy: strategy): string {
        switch (strategy){
            case "IP":
                if(!req.ip){
                    throw new Error('Could not get IP')
                }
                return req.ip
            case "USER_ID":
                if(!req.user || !req.user.id){
                    throw new Error('Could not get user or user id')
                }
                return req.user.id
            case "USER_ID_WITH_ENDPOINT":
                if(!req.user || !req.user.id){
                    throw new Error('Could not get user or user id')
                }
                return `${req.path}-${req.user.id}`
            default:
                throw new Error('No strategy passed, could not get key')
        }
    }

}