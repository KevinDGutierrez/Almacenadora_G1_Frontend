import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../../services';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, surname, username, email, password, phone) => {
    setIsLoading(true);

    const response = await registerRequest({ name, surname, username, email, password, phone });

    setIsLoading(false);

    if (response.error) {
      return toast.error(response.error?.response?.data || 'Ocurrió un error al registrarse, intenta de nuevo');
    }

    const { userDetails } = response.data;
    localStorage.setItem('user', JSON.stringify(userDetails));

    toast.success('Usuario registrado');
    navigate('/');
  };

  return {
    register,
    isLoading,
  };
};
