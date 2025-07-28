import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";

function LoginModal({ isOpen, handleCloseClick, onSubmit, onClickRegister }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation({
      email: "",
      password: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      secondaryButtonText={"or Sign up"}
      secondaryButtonAction={onClickRegister}
    >
      <label className="modal__label">
        Email*
        <input
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          type="email"
          name="email"
          placeholder="Email"
          maxLength="30"
          required
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password*
        <input
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          type="password"
          name="password"
          placeholder="Password"
          minLength="8"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
          title="Password must be at least 8 characters long and contain at least one letter and one number"
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
