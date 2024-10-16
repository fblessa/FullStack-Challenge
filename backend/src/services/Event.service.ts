import { IEventService } from "../interfaces/IEvent";
import { EventType } from "../types/Data.types";
import EventsModel from "../models/EventsModel";

class EventsService implements IEventService {
  private model = new EventsModel();

  async createEvent({ name, description, date, location }: EventType) {
    try {
      if (!name || !description || !date || !location) return { status: 'BAD_REQUEST', data: { message: 'Todos os campos são obrigatórios.' }};

    const event = await this.model.createEvent(name, description, date, location);
    return { status: 'CREATED', data: event };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao criar evento.' }};
    }
  }

  async getAllEvents() {
    try {
      const events = await this.model.getAllEvents();
      return { status: 'SUCCESSFUL', data: events };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao buscar eventos.' }};
    }
  }

  async findByEventId(id: number) {
    try {
      const event = await this.model.findByEventId(id);
      if (!event) return { status: 'NOT_FOUND', data: { message: 'Evento não encontrado.' }};
      return { status: 'SUCCESSFUL', data: event };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao buscar evento.' }};
    }
  }

  async updateEvent(id: number, name: string, description: string, date: Date, location: string) {
    try {
      const event = await this.model.updateEvent(id, name, description, date, location);
      if (event[0] === 0) return { status: 'NOT_FOUND', data: { message: 'Evento não encontrado.' }};
      return { status: 'SUCCESSFUL', data: event };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao atualizar evento.' }};
    }
  }

  async requestDeleteEvent(id: number) {
    try {
      const event = await this.model.deleteEvent(id);
      if (event === 0) return { status: 'NOT_FOUND', data: { message: 'Evento não encontrado.' }};
      return { status: 'SUCCESSFUL', data: event };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao deletar evento.' }};
    }
  }
}