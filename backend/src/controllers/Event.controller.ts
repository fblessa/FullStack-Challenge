import EventsService from "../services/Event.service";
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapHttp";
import { IEventController } from "../interfaces/IEvent";

class EventsController implements IEventController {
  private service = new EventsService();

  async createEvent(req: Request, res: Response) {
    const { name, description, date, location } = req.body;
    const { status, data } = await this.service.createEvent({
      name,
      description,
      date,
      location,
    });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAllEvents(_req: Request, res: Response) {
    const { status, data } = await this.service.getAllEvents();
    console.log(data);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findByEventId(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.findByEventId(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateEventData(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, date, location } = req.body;
    const { status, data } = await this.service.updateEvent(
      Number(id),
      name,
      description,
      date,
      location
    );
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestDeleteEvent(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.requestDeleteEvent(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default EventsController;