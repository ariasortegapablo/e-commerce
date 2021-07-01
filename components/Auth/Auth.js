import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  useEffect(() => {
    console.log("Auth");
    return () => console.log("se desmonto auth");
  });
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);
  const showLoginForm = () => {
    setTitleModal("Inicar sesion");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
  };
  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
