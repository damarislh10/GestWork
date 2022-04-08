import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editProcessAsync } from "../../redux/actions/actionProcess";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { NavBar } from "../NavBar";
import { MenuNavigation } from "../MenuNavigation";
import { FormPrevious } from "grommet-icons";
import { convertirID } from "../helpers/ConvertirId";

const EditProcesses = ({ editData }) => {
  const [dataUser, setDataUser] = useState();
  const [spinner, setSpinner] = useState(false);
  const [spinnerLoad, setSpinnerLoad] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const { process } = useSelector((store) => store.process);

  const getProcess = process.find((item) => item.id === id);

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

  const formik = useFormik({
    initialValues: {
      url: getProcess.url,
      nombre: getProcess.nombre,
      areaEncargada: getProcess.areaEncargada,
      fecha: getProcess.fecha,
      responsable: getProcess.responsable,
      descripcion: getProcess.descripcion,
    },
    onSubmit: (data) => {
      dispatch(editProcessAsync(getProcess.id, data));
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
      <div className="containerAdd mt-1">
        <Link to={"/activeProcesses"}>
          <FormPrevious size="large" />
        </Link>
        <form className="form-group" onSubmit={formik.handleSubmit}>
          <Row className="row-form">
            <Col xs={4} className="col-file">
              <h2 className="subtitle-text mb-4">Sube tu proceso</h2>
              <label className="mb-3">Sube propuesta</label>
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
                  <label>N° Solicitud</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="nombre"
                    autoComplete="off"
                    value={
                      getProcess.id !== undefined
                        ? convertirID(getProcess.id)
                        : ""
                    }
                    disabled
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <label>Nombre de la iniciativa</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="nombre"
                    autoComplete="off"
                    value={formik.values.nombre}
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
                    value={formik.values.areaEncargada}
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
                    value={formik.values.fecha}
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
                <option value="selected">{formik.values.responsable}</option>
                {dataUser ? (
                  dataUser.map((u) => (
                    <option key={u.id} value={u.name + " " + u.cargo}>
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
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  required
                ></textarea>
              </Col>
            </Row>
          </Row>

          <div className=" mt-4 container-btn-add">
            <input
              disabled={spinner}
              value="Guardar"
              type="submit"
              className="btn btn-add-process px-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProcesses;
