import { ReminderRepository } from "@transaction/data/protocols"
import { Reminder } from "@transaction/domain/entities"

export class ReminderRepositorySpy implements ReminderRepository {
  async create(reminder: Reminder): Promise<Reminder> {
    return {
      ...reminder,
      createdAt: new Date(),
      _id: "12345",
      updatedAt: new Date(),
    }
  }
}
