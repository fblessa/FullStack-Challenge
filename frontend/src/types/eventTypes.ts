export type EventType = {
  id?: number;
  name: string;
  description: string;
  date: string;
  location: string;
};

export const initialEventState: EventType = {
  name: '',
  description: '',
  date: '',
  location: '',
};