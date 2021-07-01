import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { changeEmailForm } from "../../../Api/user";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function ChangeEmailForm(props) {
  //Es necesario validar que los emails sean exactamente los mismo
  //Es necesario tener el cuidado necesario cuando se quiere poner el email de otro usuario
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await changeEmailForm(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el nombre y apellidos");
      } else {
        setReloadUser(true);
        toast.success("Nombres y apellidos actualizados ");
        formik.handleReset();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>(tu e-mail actual:{user.email})</span>{" "}
      </h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.email}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}
// oneOf es para ver si el email y el repeat email son iguales
// true es para que simplemente lo marque en rojo , tambien se puede poner un texto en ves de eso
function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
}
