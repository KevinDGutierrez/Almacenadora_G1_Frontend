import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDelete } from "../../shared/hooks/useDelete";


export const DeleteAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { deleteUser  } = useDelete();

  const handleDelete = async () => {
    const confirmed = window.confirm("¿Estás seguro que quieres eliminar tu cuenta?");
    if (!confirmed) return;

    const response = await deleteUser({ username, password });
    if (response?.error) {
      toast.error(response?.e?.response?.data || "Error al eliminar la cuenta");
    } else {
      toast.success("Cuenta eliminada exitosamente");
    }
  };

  return (
    <div className="delete-account-form">
      <h2>Eliminar Cuenta</h2>
      <div>
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleDelete}>Eliminar Cuenta</button>
    </div>
  );
};
