import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form, Button } from "semantic-ui-react";
import { updatePasswordApi } from "../../../Api/user";
import styles from "./ChangePasswordForm.module.scss";
export default function ChangePasswordForm(props) {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response) {
        toast.error("Error al actualizar");
      } else {
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className={styles["change-password-form"]}>
      <h4>Cambia tu password</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Tu nuevo password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="confirma tu nuevo password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button
          type="submit"
          className={`submit ${styles.submit}`}
          loading={loading}
        >
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}
function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
