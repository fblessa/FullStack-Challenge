import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { requestPost } from '../../services/requests';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';
import { EventType, initialEventState } from '../../types/eventTypes';

function CreateEvent() {
  const [newEvent, setNewEvent] = useState<EventType>(initialEventState);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cadastrar Evento';
  }, [newEvent]);

  const handleChange = (event: any) => {
    event.preventDefault();

    setNewEvent({
      ...newEvent,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const data = await requestPost('/create-event', { 
        name: newEvent.name,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location
      });

      setMessage(data.message);
      if (data.message === 'Evento criado com sucesso.') {
        MySwal.fire({
          imageUrl: '/src/assets/email.png',
          title: 'Sucesso!',
          html:
  <p>
    Evento Criado com Sucesso!
  </p>,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          showCloseButton: true,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      if (error.isAxiosError) {
        setIsLoading(false);
        setMessage(error.response.data.message);
      } else {
        console.log('Erro desconhecido:', error);
      }
    }
  };

  return (
    <LoginBackground>
      <FormBackground onSubmit={ handleRegister }>
        <h1
          className="text-xl md:text-4xl text-btn-orange mb-3 font-semibold"
        >
          Cadastre seu Evento
        </h1>
        <Input
          crossOrigin={ undefined }
          name="name"
          value={ newEvent.name }
          size="lg"
          type="text"
          onChange={ handleChange }
          label="Nome do Evento"
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        <Input
          crossOrigin={ undefined }
          name="description"
          value={ newEvent.description }
          size="lg"
          type="text"
          onChange={ handleChange }
          label='Descrição'
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        <div>
          <Input
            crossOrigin={ undefined }
            name="date"
            value={ newEvent.date }
            size="lg"
            type="text"
            onChange={ handleChange }
            label='Data do evento'
            onPointerEnterCapture={() => console.log("Pointer entered")}
            onPointerLeaveCapture={() => console.log("Pointer left")}
          />
        </div>
        <Input
          crossOrigin={ undefined }
          name="location"
          value={ newEvent.location }
          size="lg"
          type="text"
          onChange={ handleChange }
          label='Digite o local do evento'
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        { message === 'Evento criado com sucesso.'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
        <OrangeButton
          type="submit"
          isLoading={ isLoading }
        >
          Criar Evento
        </OrangeButton>
        <p className="self-center">Deseja voltar a lista de eventos?</p>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/events') }
        >
          Eventos
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}


export default CreateEvent;
