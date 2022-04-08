import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import "../../styles/StyleChat.css";
import UserPerfil from "../../hooks/UserPerfil";
import { app } from "../../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import CanalEnSidebar from "./CanalEnSidebar";
import { Link } from "react-router-dom";

const firestore = getFirestore(app);

const Sliderbar = ({ setCanalActivo }) => {
  const [listaCanales, setListaCanales] = useState([]);

  const user = UserPerfil();

  const getCanales = async () => {
    const canalesArr = [];
    const collectionRef = collection(firestore, "canales");
    const canalesCifrados = await getDocs(collectionRef);
    canalesCifrados.forEach((canalCifrado) => {
      canalesArr.push(canalCifrado.data());
    });
    setListaCanales(canalesArr);
  };

  useEffect(() => {
    getCanales();
  }, []);
  const agregarCanal = () => {
    const nombreCanal = prompt("Cual es el nombre del canal?");
    if (nombreCanal) {
      const docuRef = doc(firestore, `canales/${nombreCanal}`);
      setDoc(docuRef, {
        id: new Date().getTime(),
        nombre: nombreCanal,
      });

      getCanales();
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link className="link-gest" to="/*">
          <h3>GestWork</h3>
        </Link>
        <ExpandMore />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Canales de texto</h4>
          </div>

          <Add className="sidebar__addChannel" onClick={agregarCanal} />
        </div>

        <div className="sidebar_channelsList">
          {listaCanales
            ? listaCanales.map((canal) => {
                return (
                  <div onClick={() => setCanalActivo(canal.nombre)}>
                    <CanalEnSidebar
                      key={canal.id}
                      nombre={canal.nombre}
                      id={canal.id}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.foto} />
        <div className="sidebar__profileInfo">
          <h3>
            {user.nombre !== undefined ? user.nombre : (user.nombre = "")}
          </h3>
          <p>{user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Sliderbar;
