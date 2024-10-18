import { IEventModel } from "../interfaces/IEvent";
import EventsSequelize from "../database/models/Events.model";

class EventsModel implements IEventModel {
  private model = EventsSequelize;

  async createEvent(name: string, description: string, date: Date, location: string) {
    const event = await this.model.create({ name, description, date, location });

    return event;
  }

  async getAllEvents() {
    const events = await this.model.findAll();
    console.log(events);
    return events;
  }

  async findByEventId(id: number) {
    const event = await this.model.findOne({ where: { id } });

    return event;
  }

  async updateEvent(id: number, name: string, description: string, date: Date, location: string) {
    const event = await this.model.update({ name, description, date, location }, { where: { id } });

    return event;
  }

  async deleteEvent(id: number) {
    const event = await this.model.destroy({ where: { id } });

    return event;
  }
}

export default EventsModel;