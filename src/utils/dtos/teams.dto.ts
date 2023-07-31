import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, IsUUID, IsEnum } from 'class-validator'
import { FixtureStatus } from '../../entities/fixture.entity'


export class CreateTeamDTO {

    @IsString()
    name!: string

    @IsString()
    alias!: string 

}

export class GetTeamParam {
    @IsString()
    @IsUUID(4)
    teamId!: string
}

export class GetFixtureParam {
    @IsString()
    @IsUUID(4)
    fixtureId!: string
}
export class UpdateTeamDTO {

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    alias?: string 

}

export class CreateFixtureDTO {

    @IsUUID()
    homeTeamId!: string

    @IsUUID()
    awayTeamId!: string
}

export class UpdateFixtureDTO {
    @IsUUID()
    @IsOptional()
    homeTeamId?: string

    @IsEnum(FixtureStatus)
    @IsOptional()
    status?: FixtureStatus

    @IsUUID()
    @IsOptional()
    awayTeamId?: string
}