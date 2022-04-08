import React from "react";
import { Link } from "react-router-dom";
// import g from "../assets/g.jpg.crdownload";
import g from "../asset/g.png"
import icon1 from "../asset/icon1.svg";
import  '../styles/StyleLogin.css';
import {useForm } from '../hooks/useForm';
import {useDispatch} from 'react-redux';
import { loginGoogle, loginEmailPassword } from "../redux/actions/actionLogin";



export const Login = () => {


  const dispatch = useDispatch();

  const [values,handleInputChange] = useForm({
    email: '',
    password: '',
  })

  const {email,password} = values

  const handleLogin = (e)=>{
    e.preventDefault();
 dispatch(loginEmailPassword(email,password))
   console.log(email,password)
  }
const handleGoogle = () =>{
  dispatch(loginGoogle())
}



  return (
    <div className="container w-95">
      <div className="row  align-items-stretch" >
        <div className="col bg mt-5 d-none d-lg-block col-xl-6">

          <img className="bg mt-5" src={icon1} alt="icon1" width='460' />
        </div>
        <div className="col">

          <h2 className="text-center B pt-5">Bienvenido a</h2>
          <div className="text-center mb-4">
            <Link className='a ' to='/landing'>GestWork</Link>
          </div>

          {/* login */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label">Correo Electronico</label>
              <input
                className="form-control"
                type="email"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <input
                className="form-control"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}

              />
            </div>
            <div className="my-3">
              <span>
                No tienes cuenta? <Link to="/register" className="linkregistro">Registrate</Link>
              </span>
            </div>
            <div className="d-grid">
              <button type="submit" id='boton'className="btn text-login">
                Inicia Sesión
              </button>
              <button
                type="submit"
                className="btn btn-outline-danger w-100 my-1"
                onClick={handleGoogle}
              >
                <div className="row align-items-center">
                  <div className="col-3 text-center">
                    <img src={g} alt="google" width="25" />
                  </div>
                  <div className="col-6">Inicia con Google</div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
