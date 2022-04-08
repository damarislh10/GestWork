import { collection, getDocs } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { addProcessAsync } from "../../redux/actions/actionProcess";
import "../../styles/StyleAddProcess.css";
import { MenuNavigation } from "../MenuNavigation";
import { NavBar } from "../NavBar";

export const AddProcess = () => {
  const [dataUser, setDataUser] = useState();
  const [spinner, setSpinner] = useState(false);
  const [spinnerLoad, setSpinnerLoad] = useState(false);

  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        ...doc.data(),
      });
    });

    setDataUser(users);
  };

  useEffect(() => {
    getUser();
  }, []);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      url: "",
      nombre: "",
      areaEncargada: "",
      fecha: "",
      responsable: "",
      descripcion: "",
    },
    onSubmit: (data) => {
      dispatch(addProcessAsync(data));
      console.log(data);
    },
  });



  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  function guardarArchivo(e) {
    var file = e.target.files[0]; //the file
    var reader = new FileReader(); //this for convert to Base64
    reader.readAsDataURL(e.target.files[0]); //start conversion...
    reader.onload = function (e) {
      //.. once finished..
      var rawLog = reader.result.split(",")[1]; //extract only thee file data part
      setSpinner(true);
      setSpinnerLoad(true);
      var dataSend = {
        dataReq: { data: rawLog, name: file.name, type: file.type },
        fname: "uploadFilesToGoogleDrive",
      }; //preapre info to send to API

      fetch(
        "https://script.google.com/macros/s/AKfycbxGIL5Mdajs3FTpwX9IJSwomOBK5igjhc9rNgA9GaMf_D-olgYTvFVE7qSOg_yoD1d8/exec", //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }
      ) //send to Api
        .then((res) => res.json())
        .then((file) => {

          formik.values.url = file.url;
          console.log(formik.values.url); //See response actualziar estado

          if (file.url !== null) {
            setSpinner(false);
          }
        })
        .catch((e) => console.log(e)); // Or Error in console
    }; 
  }

  return (
    <div>
      <NavBar />
      <MenuNavigation />
      <div className="containerAdd">
        <form className="form-group mt-0" onSubmit={formik.handleSubmit}>
          <Row className="row-form mt-0">
            <Col xs={4} className="col-file">
              <h2 className="subtitle-text mb-4">Sube tu proceso</h2>
              <label className="mb-3">Por favor subir archivos en formato pdf</label>
              <br />
              <input
                id="fileSelector"
                type="file"
                name="url"
                style={{ display: "none" }}
                onChange={(e) => guardarArchivo(e)}
              />

              <button
                disabled={spinnerLoad}
                className="btn btnAddFile"
                onClick={handlePictureClick}
                type="button"
              >
                {spinner ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="xl"
                    role="status"
                    aria-hidden="true"
                  />
                ) : spinnerLoad ? (
                  <img
                  src="https://res.cloudinary.com/df90q7vvj/image/upload/v1648658251/GestWork/icons8-file-47_wl0a51.png"
                  alt="pdf"
                />
                ) : (
                  "SELECCIONAR ARCHIVO"
                )}
              </button>
            </Col>

            <Col xs={8}>
              <Row className="mt-5">
                <Col>
                  <label>Nombre de la iniciativa</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="nombre"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    required
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <label>Area encargada</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="areaEncargada"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    required
                  />
                </Col>
                <Col>
                  <label>Fecha Aproximada de solución</label>
                  <input
                    type="date"
                    className="form-control mt-2"
                    name="fecha"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    required
                  />
                </Col>
              </Row>
              <label className="mt-4">Lider / responsable</label>

              <select
                name="responsable"
                className="form-control mt-2"
                onChange={formik.handleChange}
              >
                <option value="selected">Selecciona una opción</option>
                {dataUser ? (
                  dataUser.map((u) => (
                    <option key={u.id} value={u.name + ' '+ u.cargo}>
                      {u.name} / {u.cargo}
                    </option>
                  ))
                ) : (
                  <option></option>
                )}
                ;
              </select>
            </Col>
            <Row className="row-resum mt-4">
              <Col className="col-resum">
                <label className="mb-3">Resumen Proceso</label>
                <textarea
                  className="form-control mt-2 w-50 m-auto texareaResum"
                  placeholder="Descripción"
                  name="descripcion"
                  onChange={formik.handleChange}
                  required
                ></textarea>
              </Col>
            </Row>
          </Row>

          <div className=" mt-4 container-btn-add">
            <input
              disabled={spinner}
              value="Subir"
              type="submit"
              className="btn btn-add-process px-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
