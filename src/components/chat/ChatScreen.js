import React, { useState, useEffect, useRef } from "react";
import { AddCircle, CreditCard, Gif, EmojiEmotions } from "@material-ui/icons";
import EncabezadoChat from "./EncabezadoChat";
import { app } from "../../firebase/firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import UserPerfil from "../../hooks/UserPerfil";
import Mensaje from "../chat/Mensaje";


const firestore = getFirestore(app);

const ChatScreen = ({ canalActivo }) => {
  const [inputMensaje, setInputMensaje] = useState("");
  const [listaMensajes, setListaMensajes] = useState([]);
  const anchor = useRef();
  const user = UserPerfil();

  const filtrarContenido = (textoOriginal) => {
    const groserias = ["tonto", "hp", "mk"];

    const array = textoOriginal.split(" ");
    array.forEach((palabra, index) => {
      if (groserias.includes(palabra)) {
        array[index] = "***";
      }
    });
    return array.join(" ");
  };
  const enviarMensaje = (e) => {
    e.preventDefault();
    const docuRef = doc(
      firestore,
      `canales/${canalActivo}/mensajes/${new Date().getTime()}`
    );

    const mensajeFiltrado = filtrarContenido(inputMensaje);

    setDoc(docuRef, {
      foto: user.foto,
      usuario: user.nombre,
      mensaje: mensajeFiltrado,
      id: new Date().getTime(),
    });

    setInputMensaje("");
    getListaMensajes();
    anchor.current.scrollIntoView({ behavior: "smooth" });
  };

  const getListaMensajes = async () => {
    const mensajesArr = [];

    const collectionRef = collection(
      firestore,
      `canales/${canalActivo}/mensajes`
    );

    const mensajesJeroglificos = await getDocs(collectionRef);
    mensajesJeroglificos.forEach((mensaje) => {
      mensajesArr.push(mensaje.data());
    });
    setListaMensajes([...mensajesArr]);
  };

  useEffect(() => {
    getListaMensajes();
  }, [canalActivo]);
  return (
    <div className="chat">
      <EncabezadoChat nombreCanal={canalActivo} />
      <div className="chat_messages">
        {listaMensajes
          ? listaMensajes.map((mensaje) => {
              return <Mensaje mensajeFirebase={mensaje} />;
            })
          : null}
        <div ref={anchor} style={{ marginBottom: "75px" }}></div>
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form onSubmit={enviarMensaje}>
          <input
            type="text"
            disabled={canalActivo ? false : true}
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder={`Enviar mensajes a #${canalActivo || ""}`}
          />
          <button
            disabled={canalActivo ? false : true}
            className="chat__inputButton"
            type="submit"
          >
            Enviar mensaje
          </button>
        </form>

        <div className="chat__inputIcons">
          <CreditCard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
