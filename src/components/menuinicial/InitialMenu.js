//procesos activos, subir procesos, chat, asignados
import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import UserPerfil from "../../hooks/UserPerfil";
import { DocumentUpload, Copy, ChatOption, Attachment } from "grommet-icons";
import { Avatar, Box, Toolbar } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "../../styles/styleinitmenu.css";

const InitialMenu = () => {
  const user = UserPerfil();
  console.log(user);

  return (
    <div>
      <div id="navbarmenu">
        <Navbar
          bg="light"
          className="container-fluid d-flex justify-content-end t-0"
          id="mm"
        >
          <Container
            fluid
            className="container-fluid d-flex justify-content-end t-0"
          >
            <Link to="/*">
              {" "}
              <img
                className="logoImg "
                style={{ width: "200px", marginRight: "682px" }}
                src="https://res.cloudinary.com/dss4kjwzk/image/upload/v1649172010/GestWork/Gestwork_oieal5.png"
                alt=""
              />
            </Link>
            <Toolbar disableGutters>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Link to="/profile" className="link-name">
                      <Button className="nameuserMenu" color="inherit">
                        {user.nombre !== undefined
                          ? user.nombre
                          : (user.nombre = "")}
                      </Button>
                    </Link>
                    {user.foto !== undefined ? (
                      <Avatar alt="Remy Sharp" src={user.foto} />
                    ) : (
                      (user.foto =
                        "https://res.cloudinary.com/dss4kjwzk/image/upload/v1649172010/GestWork/Gestwork_oieal5.png")
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </Navbar>
      </div>
      <div id="servicios" className="block servicios">
        <div className="containerAdd navbarmenu"></div>
        <div id="servicios" className="block servicios">
          <div className="container">
            <h3 className="text-center title__section titleMenu">
              Usa Gestwork
            </h3>
            <h6 className="text-center my-5">
              La tecnología que te ayuda a gestionar el rendimiento de tu
              organización.
            </h6>
          </div>
          <div className="container">
            <div className="row box">
              <div className="col-sm-5 col-md-6 contenido">
                <Link to="/activeProcesses" className="destaque">
                  <div className="img-container mb-3 icon">
                    <Copy size="large" color="#05BE50" />
                  </div>
                  <div className="text">
                    <h5 className="text">Procesos activos</h5>
                    <p className="mb-0">
                      Podras ver todo lo que debes resolver de forma urgente.
                    </p>
                  </div>
                </Link>
              </div>

              <div className="col-sm-5 col-md-6">
                <Link to="assignedProcesses" className="destaque">
                  <div className="img-container mb-3">
                    <Attachment size="large" color="#05BE50" />
                  </div>
                  <h5 className="text">Procesos asignados</h5>
                  <p className="mb-0">Cuanta tarea tienes por resolver.</p>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5 col-md-6">
                <Link to="/addp" className="destaque">
                  <div>
                    <DocumentUpload size="large" color="#05BE50" />
                  </div>
                  <h5 className="text">Subir procesos</h5>
                  <p className="mb-0">Sube y asigna procesos.</p>
                </Link>
              </div>

              <div className="col-sm-5 col-md-6">
                <Link to="/chat" className="destaque">
                  <div className="img-container mb-3 icon">
                    <ChatOption size="large" color="#05BE50" />
                  </div>
                  <h5 className="text">Chat público y crea salas</h5>
                  <p className="mb-0">Ponte en contacto con tus compañeros.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialMenu;
