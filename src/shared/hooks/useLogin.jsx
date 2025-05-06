import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../../services';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);

    const response = await loginRequest({ email, password });

    setLoading(false);

    if (response.error) {
      return toast.error(
        response.e?.response?.data || 'Ocurrió un error al iniciar sesión'
      );
    }

    // 👇 Mostrar la estructura de la respuesta para depurar
    console.log('Login response:', response.data);

    // 👇 Verifica si el token se encuentra en la respuesta
    const userDetails = response.data?.userDetails || response.data;
    const { token, ...restUser } = userDetails || {};

    if (!token) {
      return toast.error('No se recibió el token');
    }

    // 👇 Guardar token y datos del usuario
    localStorage.setItem('user', JSON.stringify({ token, ...restUser }));

    toast.success('Sesión iniciada exitosamente');
    navigate('/');
  };

  return {
    login,
    loading,
  };
};
