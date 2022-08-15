/* eslint-disable import/no-extraneous-dependencies */
import { Tag } from "@tag/domain/entities"
import faker from "@faker-js/faker/locale/pt_BR"
import { Builder } from "@core/generic/data/protocols"

export type TagUnion = keyof Tag

export class TagBuilder implements Builder<Tag> {
  public data: Tag

  constructor() {
    this.data = this.build()
  }

  build(): Tag {
    const data = new Tag({
      color: faker.random.arrayElement([
        "primary",
        "secondary",
        "error",
        "success",
        "grey",
        "purple",
      ]),
      description: faker.random.words(),
      title: faker.random.word(),
      userId: faker.datatype.uuid(),
      inactivatedAt: null,
    })

    return data
  }

  withoutFields(fields: TagUnion[]): TagBuilder {
    fields.map(field => {
      delete this.data[field]
    })

    return this
  }
}