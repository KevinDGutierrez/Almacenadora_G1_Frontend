import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validatePassword,
  validateActualPassword,
  validatePasswordMessage,
  validateActualPasswordMessage
} from "../../shared/validators";
import { useChangeUser } from "../../shared/hooks";
import { useUser } from "../../shared/hooks/useUser";
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
  const { user, loading } = useUser();
  const [formState, setFormState] = useState({
    name: { value: "" },
    surname: { value: "" },
    username: { value: "" },
    email: { value: "" },
    phone: { value: "" },
    password: { value: "", isValid: false, showError: false },
    newPassword: { value: "", isValid: false, showError: false }
  });

  const { changeUser } = useChangeUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      setFormState((prev) => ({
        ...prev,
        name: { value: user.name || "" },
        surname: { value: user.surname || "" },
        username: { value: user.username || "" },
        email: { value: user.email || "" },
        phone: { value: user.phone || "" }
      }));
    }
  }, [loading, user]);

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = async (value, field) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid: false,
          showError: true
        }
      }));
      return;
    }

    let isValidResult;

    if (field === "password") {
      isValidResult = await validateActualPassword(trimmedValue);
    } else {
      isValidResult = validatePassword(trimmedValue);
    }

    const isValid = typeof isValidResult === "object" ? isValidResult.valid : isValidResult;

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

    try {
      const passwordValidation = await validateActualPassword(
        userData.actualpassword,
        userData.password
      );

      if (!passwordValidation.valid) {
        setFormState((prev) => ({
          ...prev,
          password: {
            ...prev.password,
            isValid: false,
            showError: true
          }
        }));

        toast.error(passwordValidation.message || "Contraseña actual incorrecta");
        return;
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          isValid: false,
          showError: true
        }
      }));

      toast.error("Error al validar la contraseña actual");
      return;
    }

    if (formState.newPassword.value && formState.newPassword.value.length < 8) {
      toast.error("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const response = await changeUser(userData);

    if (response?.error) {
      toast.error("Error al actualizar usuario");
    } else {
      toast.success("Usuario actualizado exitosamente");
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.reload();
      }
    }
  };

  const handleDeleteAccount = () => {
    navigate("/dashboard/settings/delete-account");
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="user-settings">
      <form className="settings-form" onSubmit={handleFormSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>SETTINGS</h2>
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
