import User from "../../entities/user.entity"
import  { faker, Faker } from "@faker-js/faker"
import { define } from "typeorm-seeding"
import Team from "../../entities/team.entity"
import Fixture from "../../entities/fixture.entity"

define(User, (f: Faker) => {
    
    const user = new User()
    user.firstName = faker.person.firstName()
    user.lastName = faker.person.lastName()
    user.email = faker.internet.email({ 
        firstName: user.firstName,
        lastName: user.lastName
    })

    user.password = faker.word.sample(8)
    return user
  })


  define(Team, (f: Faker) => {
    const team = new Team()
    team.name = faker.word.sample()
    team.alias = faker.word.sample()
    return team
  })


  define(Fixture, (f: Faker) => {
    const fixture = new Fixture()
    return fixture
  })