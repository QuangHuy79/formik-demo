import React from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import FieldInput from "./FieldInput";

const FormDebugger = () => {
  const formik = useFormikContext();
  return (
    <pre style={{ background: "#f1f1f1", padding: "1rem" }}>
      {JSON.stringify(formik, null, 2)}
    </pre>
  );
};

const initialValues = {
  name: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function FormExample() {
  const handleSubmit = async (values, helpers) => {
    console.log("Submitted!", values);

    helpers.setSubmitting(true);

    setTimeout(() => {
      if (values.email.includes("error")) {
        helpers.setErrors({ email: "Email bị lỗi!" });
      } else {
        alert("✅ Submitted thành công!");
        helpers.resetForm();
      }
      helpers.setSubmitting(false);
    }, 1500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <h3>Demo Formik Helper Methods</h3>
          <FieldInput name="name" type="text" label="Tên" />
          <FieldInput name="email" type="email" label="Email" />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
          <button
            type="button"
            onClick={() => setFieldValue("email", "preset@email.com")}
          >
            Gán Email tự động
          </button>
          <FormDebugger />
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;