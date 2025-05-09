import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteUserRequest } from '../../services/index';

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteUser = async ({ username, password }) => {
    setLoading(true);

    const response = await deleteUserRequest({ username, password });

    setLoading(false);

    if (response.error) {
      return toast.error(
        response.e?.response?.data?.msg || 'Ocurrió un error al eliminar el usuario'
      );
    }

    toast.success('Usuario desactivado exitosamente');
    navigate('/auth');
  };

  return {
    deleteUser,
    loading,
  };
};
