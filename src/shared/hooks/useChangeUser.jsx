import toast from "react-hot-toast";
import { changeUser as changeUserRequest, getUser } from "../../services";

export const useChangeUser = () => {
  const changeUser = async (data) => {
    try {
      const responseData = await changeUserRequest(data);

      if (responseData.error) {
        const raw = responseData.e?.response?.data;
        const message = Array.isArray(raw)
          ? raw.map((err) => err.msg).join(", ")
          : raw?.msg || "No fue posible actualizar los datos";

        toast.error(message);
        return { error: true };
      }

      toast.success("Datos actualizados correctamente");
      return { error: false };
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      return { error: true };
    }
  };

  return {
    changeUser,
    getUser,
  };
};
