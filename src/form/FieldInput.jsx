import React from "react";
import { useField } from "formik";

const FieldInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
    </div>
  );
};

export default FieldInput;