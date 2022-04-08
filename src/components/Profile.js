import React from "react";
import { Col, Row } from "react-bootstrap";
import UserPerfil from "../hooks/UserPerfil";
import "../styles/StyleProfile.css";
import { MenuNavigation } from "./MenuNavigation";
import { NavBar } from "./NavBar";

export const Profile = () => {
  const user = UserPerfil();

  return (
    <div>
      <NavBar />
      <MenuNavigation />
      <div className="containerAdd containerProfile w-95">
        <form className="form-group form-profile mt-0">
          <Row className="row-form mt-0">
            <Col>
              <Row className="mt-5">
                <Col>
                  <div className="d-flex p-1">
                    {user.foto !== undefined ? (
                      <img
                        className="fotoPerfil m-auto"
                        src={user.foto}
                        alt="Foto"
                      />
                    ) : (
                      (user.foto =
                        "https://res.cloudinary.com/df90q7vvj/image/upload/v1648860811/GestWork/23408e565fc3f43454636fec27572d1f_v8bhk3.jpg")
                    )}
                  </div>
                  <label>Nombres</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="nombre"
                    value={user.nombre}
                    autoComplete="off"
                    disabled
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <label>Correo Electronico</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="correo"
                    value={user.correo}
                    autoComplete="off"
                    disabled
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};
