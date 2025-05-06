import toast from "react-hot-toast";
import { changeUser as changeUserRequest, getUser } from "../../services";

export const useChangeUser = () => {

    const changeUser = async (data) => {
        const responseData = await changeUserRequest(data);
        if (responseData.error) {
            return toast.error(
                responseData.e?.response?.data || 'No fue posible actualizar los datos'
            );
        }
        toast.success('Datos actualizados correctamente');
    };

    return {
        changeUser,
        getUser
    };
};
