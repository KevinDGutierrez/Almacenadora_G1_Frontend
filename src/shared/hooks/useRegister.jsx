import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../../services';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, surname, username, email, password, phone) => {
    setIsLoading(true);

    try {
      const response = await registerRequest({
        name,
        surname,
        username,
        email,
        password,
        phone,
        role: 'EMPLOYEE',
      });

      const { userDetails } = response.data;

      if (!userDetails) {
        toast.error('La respuesta del servidor no contiene los datos esperados.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(userDetails));
      toast.success('Usuario registrado');
      navigate('/');
    } catch (error) {
      const msg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'Ocurrió un error al registrarse, intenta de nuevo';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};
