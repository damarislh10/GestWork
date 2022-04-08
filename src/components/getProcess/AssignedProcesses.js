import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProcessAsync } from "../../redux/actions/actionProcess";
import "../../styles/StyleAssignedProcesses.css";
import { convertirID } from "../helpers/ConvertirId";
import { MenuNavigation } from "../MenuNavigation";
import { NavBar } from "../NavBar";

export const AssignedProcesses = () => {
  const dispatch = useDispatch();

  const { process } = useSelector((store) => store.process);

  useEffect(() => {
    dispatch(listProcessAsync());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <MenuNavigation />
      <div className="containerAdd containerAssigned">
        <div className="me-3  p-3" style={{ textAlign: "center" }}>
          <div className="title-assign">
            <h2 className="title__section mt-5">Procesos Asignados</h2>
          </div>
          <p className="mt-4">Mira aquí los procesos que te han sido asignados</p>
        </div>
        <section className="m-3 contaner__list">
          {process.map((item, index) => (
            <div className="mb-4">
              <Card
                className="card__process card-assign"
                key={item.id}
                sx={{ minWidth: 275 }}
              >
                <CardContent>
                  <div className="container-action">
                    <Typography variant="h5" component="div">
                      <span className="primary">Proceso</span>
                    </Typography>
                  </div>
                  <div className="container-action">
                    <Typography variant="h6" component="div">
                      {item.nombre}
                    </Typography>
                    <CardActions>
                      <Button
                        className="btn__process btnAssign mb-3"
                        variant="contained"
                        as={Link}
                        to={`/detailProcess/${item.id}`}
                      >
                        Ver
                      </Button>
                      
                    </CardActions>
                  </div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    N°: {convertirID(item.id)}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
