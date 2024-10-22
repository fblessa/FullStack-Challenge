import { EventType } from "../types/Data.types";
import { ServiceResponse } from "../types/Service.response";
import EventsSequelize from "../database/models/Events.model";
import { Request, Response } from 'express';

export interface IEvents {
  id?: number;
  name: string;
  description: string;
  date: string;
  userId?: number;
  location: string;
}

export interface IEventModel {
  createEvent({name, description, date, location}: EventType): Promise<EventsSequelize>;
  getAllEvents(): Promise<EventsSequelize[]>;
  findByEventId(id: number): Promise<EventsSequelize | null>;
  updateEvent(id: number, name: string, description: string, date: string, location: string): Promise<[affectedCount: number]>;
  deleteEvent(id: number): Promise<number>;
}

export interface IEventService {
  createEvent({ name, description, date, location }: EventType): Promise<ServiceResponse<EventType>>;
  getAllEvents(): Promise<ServiceResponse<EventsSequelize[]>>;
  findByEventId(id: number): Promise<ServiceResponse<EventsSequelize | null>>;
  updateEvent(id: number, name: string, description: string, date: string, location: string): Promise<ServiceResponse<[affectedCount: number]>>;
  requestDeleteEvent(id: number): Promise<ServiceResponse<number>>;
}

export interface IEventController {
  createEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getAllEvents(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  findByEventId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateEventData(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestDeleteEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
