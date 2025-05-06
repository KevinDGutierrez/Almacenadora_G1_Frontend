import { useEffect, useState } from "react";
import {
  validatePassword,
  validateActualPassword,
  validatePasswordMessage,
  validateActualPasswordMessage
} from "../../shared/validators";
import { useChangeUser } from "../../shared/hooks";
import { Input } from "../Input";
import toast from "react-hot-toast";

const inputs = [
  { field: "name", label: "Nombre", type: "text" },
  { field: "surname", label: "Apellido", type: "text" },
  { field: "username", label: "Usuario", type: "text" },
  { field: "email", label: "Correo Electrónico", type: "email" },
  { field: "phone", label: "Teléfono", type: "text" },
  {
    field: "password",
    label: "Contraseña Actual",
    validationMessage: validateActualPasswordMessage,
    type: "password"
  },
  {
    field: "newPassword",
    label: "Nueva Contraseña",
    validationMessage: validatePasswordMessage,
    type: "password"
  }
];

export const UserSettings = () => {
  const [formState, setFormState] = useState({
    name: { value: "" },
    surname: { value: "" },
    username: { value: "" },
    email: { value: "" },
    phone: { value: "" },
    password: { value: "", isValid: false, showError: false },
    newPassword: { value: "", isValid: false, showError: false }
  });

  const { changeUser, getUser } = useChangeUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response && !response.error) {
          const user = response.data;
          setFormState((prev) => ({
            ...prev,
            name: { value: user.name || "" },
            surname: { value: user.surname || "" },
            username: { value: user.username || "" },
            email: { value: user.email || "" },
            phone: { value: user.phone || "" }
          }));
        } else {
          console.error("Error al obtener usuario:", response?.message || response);
        }
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
      }
    };

    fetchUser();
  }, []);

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    const trimmedValue = value.trim();
    const isValid =
      field === "password"
        ? validateActualPassword(trimmedValue)
        : validatePassword(trimmedValue);

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const isSubmitButtonDisabled =
    !formState.password?.isValid || !formState.newPassword?.isValid;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: formState.name.value.trim(),
      surname: formState.surname.value.trim(),
      username: formState.username.value.trim(),
      email: formState.email.value.trim(),
      phone: formState.phone.value.trim(),
      actualpassword: formState.password.value,
      password: formState.newPassword.value
    };

    const response = await changeUser(userData);

    if (response?.error) {
      toast.error(response?.e?.response?.data || "Error al actualizar usuario");
    } else {
      toast.success("Usuario actualizado exitosamente");
    }
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar cuenta (puedes personalizarla según lo necesario)
    toast.success("Cuenta eliminada exitosamente");
  };

  return (
    <div className="user-settings">
      <form className="settings-form" onSubmit={handleFormSubmit}>
        <span className="hola">SETTINGS</span>
        {inputs.map((input) => (
          <Input
            key={input.field}
            field={input.field}
            label={input.label}
            value={formState[input.field]?.value || ""}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={
              input.field === "password" || input.field === "newPassword"
                ? handleInputValidationOnBlur
                : undefined
            }
            showErrorMessage={formState[input.field]?.showError}
            validationMessage={input.validationMessage}
            type={input.type}
            textArea={input.textArea || false}
          />
        ))}
        <button type="submit" disabled={isSubmitButtonDisabled}>
          Actualizar Datos
        </button>
      </form>

      <div className="delete-account-section">
        <button
          type="button"
          className="delete-button"
          onClick={handleDeleteAccount}
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};
