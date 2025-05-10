import { deleteUserRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDelete = () => {
  const navigate = useNavigate();

  const deleteUser = async (data) => {
    try {
      const response = await deleteUserRequest(data);

      if (response?.error || response.status !== 200) {
        throw new Error("Error al eliminar");
      }

      toast.success("Usuario eliminado exitosamente");

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/auth");
    } catch (e) {
      toast.error("No se pudo eliminar la cuenta");
      console.error(e);
      return { error: true, e };
    }
  };

  return { deleteUser };
};
