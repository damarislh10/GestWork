import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import imgg1 from "../../asset/imgg1.svg"
import { registroEmailPasswordNombre } from "../../redux/actions/actionRegister";
 import "../../styles/StyleRegister.css";

export const Register = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      cargo: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        cargo: Yup.string()
          .max(30, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 charaters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password must match")
          .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        registroEmailPasswordNombre(
          values.firstName + " " + values.lastName,
          values.email,
          values.cargo,
          values.password,
        )
      );
      formik.resetForm();
    },
  });
  return (
    <div className="container mt-3 pt-2 body">
    <div className="row">
      <div className="col-md-4">
        <h2 className='input mb-4'> Registrate en Gestwork </h2>
      <form className=" mb-4" onSubmit={formik.handleSubmit}>

<div className="user-details">
   <div className='input-box mb-2'>
  <input
    value={formik.values.firstName}
    onChange={formik.handleChange}
    placeholder="Nombre"
    label="Nombre"
    name="firstName"
    type="text"
    className="form-control"
    {...formik.getFieldProps("firstName")}
  />
  {formik.touched.firstName && formik.errors.firstName ? (
    <div className="error">{formik.errors.firstName}</div>
  ) : null}
  </div>
  <div className='input-box mb-2'>

  <input
    value={formik.values.lastName}
    onChange={formik.handleChange}
    label="Apellido"
    placeholder="Apellido"
    name="lastName"
    type="text"
    className="form-control"
    {...formik.getFieldProps("lastName")}
  />
  {formik.touched.lastName && formik.errors.lastName ? (
    <div className="error">{formik.errors.lastName}</div>
  ) : null}
  </div>

   <div className='input-box mb-2'>

  <input
    value={formik.values.email}
    onChange={formik.handleChange}
    label="Correo"
    name="email"
    placeholder="email"
    type="email"
    className="form-control"

  />
  {formik.touched.email && formik.errors.email ? (
    <div className="error">{formik.errors.email}</div>
  ) : null}
</div>
<div className='input-box mb-2'>

  <input
    label="cargo"
    name="cargo"
    placeholder="Cargo"
    value={formik.values.cargo}
    onChange={formik.handleChange}
    type="text"
    className="form-control"

  />
  {formik.touched.cargo && formik.errors.cargo ? (
    <div className="error">{formik.errors.cargo}</div>
  ) : null}
</div>

   <div className='input-box mb-2'>
  <input
    value={formik.values.password}
    onChange={formik.handleChange}
    label="Contraseña"
    placeholder="contraseña"
    name="password"
    type="password"
    className="form-control"

  />
  {formik.touched.password && formik.errors.password ? (
    <div className="error">{formik.errors.password}</div>
  ) : null}
</div>

   <div className='input-box mb-2'>

  <input
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    label="Confirmar contraseña"
    name="confirmPassword"
    placeholder="Confirmar contraseña"
    type="password"
    className="form-control"

  />
  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
    <div className="error">{formik.errors.confirmPassword}</div>
  ) : null}
</div>

</div>
<div style={{marginLeft: "25%"}} >
      <p>
       Ya tienes cuenta? <Link to="/login" className="linkini">Inicia sesión</Link>
      </p>
    </div>

<button className="Btn btn align-items-center text-register" id='centrar' type="submit">
  Registrar
</button>
</form>
      </div>
      <div className="col-md-7 me-5">
      <img src={imgg1} className='m-5 pb-5 me-auto' width="480" alt="" />
      </div>
     
    </div>
    </div>
  );
};
