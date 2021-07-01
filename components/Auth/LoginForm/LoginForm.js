import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi, resetPasswordApi } from "../../../Api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setloading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    // identifier y password
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setloading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El email o la contrasena son incorrectos");
      }
      setloading(false);
    },
  });

  const resetPassword = () => {
    //Para reiniciar todos los errores del formulario,esten todos vacios.
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({
        identifier: true,
      });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          {console.log("se renderizo login form")}
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            Has olvidado tu Contrasena?
          </Button>
        </div>
      </div>
      b
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}
function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
