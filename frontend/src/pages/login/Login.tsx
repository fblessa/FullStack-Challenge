import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import { requestPost, setToken } from '../../services/requests';
import EyeButton from '../../components/EyeButton';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
  //  const token = localStorage.getItem('token');

  //  if (token) {
  //    navigate('/events');
   // }
  }, [navigate]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { token, user } = await requestPost('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);

      localStorage.setItem('role', user.role);

      localStorage.setItem('userId', user.id);

      localStorage.setItem('userEmail', user.email);

      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/courses');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error);
        setIsLoading(false);
        const rawMessage = error?.response?.data?.message;
        const errMessage = typeof rawMessage === 'object'
        && rawMessage !== null ? rawMessage.name : (rawMessage ?? 'Erro inesperado');
        setMessage(errMessage);
      }
    }
  };

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <LoginBackground>
      <FormBackground onSubmit={ handleLogin }>
        <h1 className="text-xl md:text-4xl text-btn-orange font-semibold">Entrar</h1>
        <Input
          crossOrigin={ undefined }
          value={ email }
          size="lg"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
          label='Email'
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        />
        <Input
          value={ password }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          onChange={ (e) => setPassword(e.target.value) }
          onFocus={ () => setShowEye(true) }
          label='Senha'
          crossOrigin={ undefined }
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
          icon={ <EyeButton
            type="button"
            onClick={ (event) => handleShowPassword(event) }
            showEye={ showEye }
            showPassword={ showPassword }
          /> }
        />
        { message && <p className="text-red-500">{ message }</p> }
        <OrangeButton
          type="submit"
          isLoading={ isLoading }
        >
          Entrar
        </OrangeButton>
        <p className="self-center">Ainda não tem uma conta?</p>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/create-account') }
        >
          Cadastre-se
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default Login;
