import { Builder } from "@core/data/protocols"
import { User } from "@user/domain"
import faker from "@faker-js/faker/locale/pt_BR"

export class UserBuilder implements Builder<User> {
  public data: User

  constructor() {
    this.data = this.build()
  }

  build(): User {
    const data: User = {
      email: faker.internet.email(),
      lastname: faker.name.lastName(),
      name: faker.name.firstName(),
      password: faker.internet.password(),
      token: faker.datatype.uuid(),
      _id: faker.datatype.uuid(),
    }

    return data
  }
}
