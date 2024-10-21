import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { requestPost } from '../../services/requests';
import EyeButton from '../../components/EyeButton';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import WarnigIcon from '../../components/WarningIcon';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';
import { UserType, initialUserState } from '../../types/userTypes';

function CreateAccount() {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cadastrar Usuário';

  //  const token = localStorage.getItem('token');

  //  if (token) {
  //    navigate('/events');
  //  }
  //[navigate]
  }, []);

  const handleChange = (event: any) => {
    event.preventDefault();

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      return setMessage('As senhas não coincidem');
    }

    try {
      setIsLoading(true);

      const data = await requestPost('/create-account', { 
        name: user.name,
        email: user.email,
        password: user.password
      });

      setMessage(data.message);
      if (data.message === 'Usuário criado com sucesso.') {
        MySwal.fire({
          imageUrl: '/src/assets/email.png',
          title: 'Sucesso!',
          html:
  <p>
    Faça login
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

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <LoginBackground>
      <FormBackground onSubmit={ handleRegister }>
        <h1
          className="text-xl md:text-4xl text-btn-orange mb-3 font-semibold"
        >
          Cadastre-se
        </h1>
        <Input
          crossOrigin={ undefined }
          name="name"
          value={ user.name }
          size="lg"
          type="text"
          onChange={ handleChange }
          label="Nome Completo"
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        <Input
          crossOrigin={ undefined }
          name="email"
          value={ user.email }
          size="lg"
          type="email"
          onChange={ handleChange }
          label='Email'
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        <div>
          <Input
            crossOrigin={ undefined }
            name="password"
            value={ user.password }
            size="lg"
            type={ showPassword ? 'text' : 'password' }
            onChange={ handleChange }
            onFocus={ () => setShowEye(true) }
            label='Senha'
            onPointerEnterCapture={() => console.log("Pointer entered")}
            onPointerLeaveCapture={() => console.log("Pointer left")}
            icon={ <EyeButton
              type="button"
              onClick={ (event) => handleShowPassword(event) }
              showEye={ showEye }
              showPassword={ showPassword }
            /> }
          />
          { showEye && (
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
              placeholder="Password"
              onPointerEnterCapture={() => console.log("Pointer entered")}
              onPointerLeaveCapture={() => console.log("Pointer left")}
            >
              <WarnigIcon />
              {('Minimo de 8 digitos')}
            </Typography>
          )}
        </div>
        <Input
          crossOrigin={ undefined }
          name="confirmPassword"
          value={ user.confirmPassword }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          onChange={ handleChange }
          label='Confirme sua senha'
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        { message === 'Usuário criado com sucesso.'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
        <OrangeButton
          type="submit"
          isLoading={ isLoading }
        >
          Cadastrar
        </OrangeButton>
        <p className="self-center">{('Ja possui conta?')}</p>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/') }
        >
          Entrar
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default CreateAccount;
