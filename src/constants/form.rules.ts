import { Rule } from "antd/es/form";

export const loginEmailRules: Rule[] = [
  { required: true, message: "Este campo es obligatorio" },
  { type: "email", message: "Debe ser un correo electrónico válido" },
];

export const loginPasswordRules: Rule[] = [
  { required: true, message: "La contraseña es obligatoria" },
];

export const registerNameRules: Rule[] = [
  { required: true, message: "El nombre es obligatorio" },
];

export const registerEmailRules: Rule[] = [
  { required: true, message: "El correo es obligatorio" },
  { type: "email", message: "Debe ser un correo electrónico válido" },
];

const basePasswordRules: Rule[] = [
  { required: true, message: "La contraseña es obligatoria" },
  { min: 8, message: "La contraseña debe tener al menos 6 caracteres" },
  {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    message:
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
  },
];

export const baseConfirmPasswordRules: Rule[] = [
  { required: true, message: "Por favor, confirma tu contraseña" },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Las contraseñas no coinciden"));
    },
  }),
];

export const registerPasswordRules = [...basePasswordRules];
export const registerConfirmPasswordRules = [...baseConfirmPasswordRules];

export const resetPasswordRules = [...basePasswordRules];
export const resetConfirmPasswordRules = [...baseConfirmPasswordRules];

// EMPLOYEE FORM RULES
export const registerEmployeeFullNameRules: Rule[] = [
  {
    required: true,
    message: "El nombre completo es obligatorio",
  },
  {
    pattern: /^[a-zA-Z\s]+$/,
    message: "El nombre completo solo puede contener letras y espacios",
  },
  {
    min: 5,
    message: "El nombre completo debe tener al menos 5 caracteres",
  },
];

export const registerEmployeeDocumentRules: Rule[] = [
  {
    required: true,
    message: "El DNI es obligatorio",
  },
];

export const registerEmployeeEmailRules: Rule[] = [...registerEmailRules];

export const registerEmployeePhoneRules: Rule[] = [
  {
    required: true,
    message: "El teléfono es obligatorio",
  },
  {
    pattern: /^[0-9]+$/,
    message: "El teléfono solo puede contener números",
  },
  {
    min: 9,
    message: "El teléfono debe tener al menos 8 caracteres",
  },
];

export const registerEmployeeAddressRules: Rule[] = [
  {
    required: true,
    message: "La dirección es obligatoria",
  },
  {
    min: 5,
    message: "La dirección debe tener al menos 5 caracteres",
  },
];

export const registerEmployeeRoleRules: Rule[] = [
  {
    required: true,
    message: "El rol es obligatorio",
  },
];