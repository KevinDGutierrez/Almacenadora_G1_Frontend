import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDelete } from "../../shared/hooks/useDelete";

export const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const { deleteUser } = useDelete();

  const handleDelete = async () => {
    const confirmed = window.confirm("¿Estás seguro que quieres eliminar tu cuenta?");
    if (!confirmed) return;

    const response = await deleteUser({ password });
    if (response?.error) {
      toast.error(response?.e?.response?.data || "Error al eliminar la cuenta");
    } else {
      toast.success("Cuenta eliminada exitosamente");
    }
  };

  return (
    <div className="user-settings">
      <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
        <h2 style={{ textAlign: "center", color: "white", marginBottom: "1rem" }}>
          Eliminar Cuenta
        </h2>
        <label htmlFor="password" style={{ color: "white", fontWeight: "bold" }}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="delete-button">
          Eliminar Cuenta
        </button>
      </form>
    </div>
  );
};
