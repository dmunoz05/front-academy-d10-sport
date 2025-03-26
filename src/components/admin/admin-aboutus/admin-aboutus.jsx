import { useContext, useState, useEffect } from "react";
import AppContext from "@context/app/app-context";
// import "./admin-aboutus.css";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // const [isEditing, setIsEditing] = useState(false);

  const [isEditingOne, setIsEditingOne] = useState(false);
  const [isEditingTwo, setIsEditingTwo] = useState(false);
  const [isEditingThree, setIsEditingThree] = useState(false);
  const [isEditingFour, setIsEditingFour] = useState(false);
  const [isEditingFive, setIsEditingFive] = useState(false);

  // --------------------------------------

  const [sectionOneAboutUs, setSectionOneAboutUs] = useState({
    title: "",
    description: "",
  });

  const [sectionTwoAboutUs, setSectionTwoAboutUs] = useState({
    title1: "",
    title2: "",
    bg_photo: "",
    subtitle: "",
    description: "",
  });

  const [sectionThreeAboutUs, setSectionThreeAboutUs] = useState({
    title: "",
    description: "",
  });

  const [sectionFourAboutUs, setSectionFourAboutUs] = useState({
    title: "",
    bg_photo: "",
    description: "",
  });

  const [sectionSixAboutUs, setSectionSixAboutUs] = useState({
    title: "",
    bg_photo: "",
    description: "",
  });

  function getDataAbout() {
    axios
      .get(`${urlApi}landing/g/aboutus`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data?.length == 0 || response.data[0] == undefined) return;
        setSectionOneAboutUs(response.data[0].section_one);
        setSectionTwoAboutUs(response.data[0].section_two);
        setSectionThreeAboutUs(response.data[0].section_three);
        setSectionFourAboutUs(response.data[0].section_four);
        setSectionSixAboutUs(response.data[0].section_six);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ----------------------------- Update About Us Conócenos ---------------------------------

  async function handleUpdateAboutUsConocenos() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-conocenos/1`,
        sectionOneAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Fundador ---------------------------------

  async function handleUpdateAboutUsFundador() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-fundador/1`,
        sectionTwoAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Objetivos ---------------------------------

  async function handleUpdateAboutUsObjetivos() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-objetivos/1`,
        sectionThreeAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Misión ---------------------------------

  async function handleUpdateAboutUsMision() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-mision/1`,
        sectionFourAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Vision ---------------------------------

  async function handleUpdateAboutUsVision() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-vision/1`,
        sectionSixAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDataAbout();
    }
  }, [context.token]);

  return (
    <>
      <h1 className="title__admin-section">Nosotros</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Conócenos</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOneAboutUs.title}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionOneAboutUs.description}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditingOne ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsConocenos}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingOne(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingOne(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Fundador</h1>
          <label htmlFor="" className="label__admin-section">
            Titulo #1:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.title1}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title1: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Titulo #2:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.title2}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title2: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Subtitulo:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.subtitle}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                subtitle: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.description}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionTwoAboutUs.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.bg_photo}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                bg_photo: e.target.value,
              })
            }
            readOnly
          />
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled required />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {isEditingTwo ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsFundador}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingTwo(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingTwo(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Objetivos</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThreeAboutUs.title}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionThreeAboutUs.description}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditingThree ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsObjetivos}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingThree(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingThree(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Misión</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourAboutUs.title}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionFourAboutUs.description}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionFourAboutUs.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourAboutUs.bg_photo}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                bg_photo: e.target.value,
              })
            }
            readOnly
          />
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled required />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {isEditingFour ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsMision}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingFour(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingFour(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Visión</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.title}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.description}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionSixAboutUs.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.bg_photo}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                bg_photo: e.target.value,
              })
            }
            readOnly
          />
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled required />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {isEditingFive ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsVision}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingFive(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingFive(true)}
            >
              Editar
            </button>
          )}
        </li>
      </ul>
    </>
  );
}
