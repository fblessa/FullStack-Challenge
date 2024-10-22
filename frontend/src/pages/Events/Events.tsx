import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsBackground from '../../components/EventsBackground';
import { requestData, setToken } from '../../services/requests';
import { EventType } from '../../types/eventTypes';
import { Card, CardBody } from '@material-tailwind/react';
import WhiteButton from '../../components/WhiteButton';

function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Eventos';
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchEvents() {
      try {
        const data = await requestData('/events');
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, [events, navigate]);

  return (
    <EventsBackground>
      <h1 className="text-xl md:text-4xl text-btn-orange font-bold">
        Eventos
      </h1>
      <WhiteButton
        type="button"
        onClick={ () => navigate('/create-event') }
      >
        Criar Evento
      </WhiteButton>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        { events ? (
          events.map((event) => (
            <Card
              key={event.id}
              className="w-96 md:w-[37rem] md:h-[17rem] m-4 select-none
              cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
            >
              <CardBody className="flex flex-col items-start">
                <div className="break-all mb-10 w-full">
                  <h2 className="text-xl md:text-2xl font-semibold text-btn-orange">
                    {event.name}
                  </h2>
                  <br />
                  <br />
                  <div className="flex items-center">
                    <p className="text-xl md:text-2xl font-semibold text-btn-orange">
                      {event.description}
                    </p>
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-btn-orange">
                  {event.date}
                </p>
                <p className="text-xl md:text-2xl font-semibold text-btn-orange">
                  {event.location}
                </p>
              </CardBody>
            </Card>
          ))
        )
          : (
            <h2
              className="text-xl md:text-4xl font-bold
              col-span-2 row-start-2 text-center"
            >
              Não existem eventos cadastrados
            </h2>
          )}
      </div>
    </EventsBackground>
  );
}

export default Events;