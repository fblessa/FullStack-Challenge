import { Router, Request, Response } from 'express';
import EventsController from '../controllers/Event.controller';
import { validateToken } from '../middlewares/validateLogin';

const eventController = new EventsController();
const eventRouter = Router();

eventRouter.get('/events', (req: Request, res: Response) => eventController.getAllEvents(req, res));
eventRouter.post('/create-event', validateToken, (req: Request, res: Response) => eventController.createEvent(req, res));
eventRouter.get('/event/:id', validateToken, (req: Request, res: Response) => eventController.findByEventId(req, res));
eventRouter.put('/event/:id', validateToken, (req: Request, res: Response) => eventController.updateEventData(req, res));
eventRouter.delete('/event/:id', validateToken, (req: Request, res: Response) => eventController.requestDeleteEvent(req, res));

export default eventRouter;