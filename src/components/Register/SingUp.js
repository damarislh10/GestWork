// import React from "react";
// import { Formik, Form } from "formik";
// import { TextField } from "./TextField";
// import * as Yup from "yup";
// import { useForm } from "../../hooks/useForm";
// import { useDispatch } from "react-redux";
// import { registroEmailPasswordNombre } from "../../redux/actions/actionRegister";

// export const SingUp = () => {
//   const validate = Yup.object({
//     firstName: Yup.string()
//       .max(15, "Must be 15 characters or less")
//       .required("Required"),
//     lastName: Yup.string()
//       .max(20, "Must be 20 characters or less")
//       .required("Required"),
//     email: Yup.string().email("Email is invalid").required("Email is required"),
//     cargo: Yup.string()
//       .max(15, "Must be 15 characters or less")
//       .required("Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 charaters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Password must match")
//       .required("Confirm password is required"),
//   });

//   const dispatch = useDispatch();

//   // const [formValues, handleInputChange] = useForm({
//   //   firstName: "",
//   //   lastName: "",
//   //   email: "",
//   //   cargo: "",
//   //   password: "",
//   //   confirmPassword: "",
//   // });

//   // const { firstName, lastName, email, cargo, password, confirmPassword } =
//   //   formValues;

//   // const handleRegistro = (e) => {
//   //   e.preventDefault();
//   //   dispatch(registroEmailPasswordNombre(email, password));
//   // };

//   return (
//     <Formik
//       initialValues={{
//         firstName: "",
//         lastName: "",
//         email: "",
//         cargo: "",
//         password: "",
//         confirmPassword: "",
//       }}
//       // validationSchema={validate}
//       onSubmit={(values) => {
//         console.log(values);
//         dispatch(
//           registroEmailPasswordNombre(
//             values.firstName + values.lastName,
//             values.email,
//             values.cargo,
//             values.password,
//             values.confirmPassword
//           )
//         );
//       }}
//     >
//       {(formik) => (
//         <div className="container mt-5">
//           <h1 className=" font-weight-bold .display-4 text-center">Registro</h1>
//           <Form className="row g-3">
//             <div className="col-md-6">
//               <TextField
//                 value={firstName}
//                 onChange={handleInputChange}
//                 label="Nombre"
//                 name="firstName"
//                 type="text"
//               />
//               <TextField
//                 value={lastName}
//                 onChange={handleInputChange}
//                 label="Apellido"
//                 name="lastName"
//                 type="text"
//               />
//               <TextField
//                 value={email}
//                 onChange={handleInputChange}
//                 label="Correo"
//                 name="email"
//                 type="email"
//               />
//             </div>
//             <div className="col-md-6">
//               <TextField
//                 label="cargo"
//                 name="cargo"
//                 value={cargo}
//                 type="text"
//                 onChange={handleInputChange}
//               />

//               <TextField
//                 value={password}
//                 onChange={handleInputChange}
//                 label="Contraseña"
//                 name="password"
//                 type="password"
//               />
//               <TextField
//                 value={confirmPassword}
//                 onChange={handleInputChange}
//                 label="Confirmar contraseña"
//                 name="confirmPassword"
//                 type="password"
//               />
//             </div>

//             {/* <button className="btn btn-danger mt-3 ml-3" type="reset">
//               Google
//             </button> */}
//           </Form>
//           <button className="btn btn-dark mt-5" type="submit">
//             Register
//           </button>
//         </div>
//       )}
//     </Formik>
//   );
// };
