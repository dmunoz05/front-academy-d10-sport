import { useContext, useState, useEffect } from "react";
import AddNews from "./add-news/add-news.jsx";
// import EditNews from "./edit-news/edit-news.jsx";
import DeleteNews from "./delete-news/delete-news.jsx";
import AppContext from "@context/app/app-context";
import axios from "axios";
import "./admin-news.css";

export default function NewsAdmin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  // const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [modalIsOpenThree, setModalIsOpenThree] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);

  const [sectionNews, setSectionNews] = useState({
    gallery: "",
  });

  function getNews() {
    axios
      .get(`${urlApi}landing/g/news`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        setSectionNews(Object.entries(response.data[0].section_one.news));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getNews();
    }
  }, [context.token]);

  return (
    <>
      <section className="admin-section">
        <h1 className="title__admin-section">Noticias</h1>
        <button
          onClick={() => setModalIsOpenOne(true)}
          className="btn-add__news"
        >
          Add News
        </button>
        <ul className="list__admin-section">
          {sectionNews.length > 0 ? (
            sectionNews.map(([key, item], index) => (
              <li key={key} className="item__admin-section">
                <label htmlFor="" className="label__admin-section">
                  Pre-visualización de imagen:
                </label>
                <div className="cntr-img__admin-section sm-margin-bottom">
                  <img
                    className="img__admin-section"
                    src={item.image}
                    alt={`Img ${index + 1}`}
                  />
                </div>
                <label htmlFor="" className="label__admin-section">
                  Fecha:
                </label>
                <input
                  type="text"
                  className="text-[black] input__admin-section sm-margin-bottom"
                  value={item.date}
                  readOnly
                />
                <label htmlFor="" className="label__admin-section">
                  Imagen:
                </label>
                <input
                  type="text"
                  className="text-[black] input__admin-section sm-margin-bottom"
                  value={item.image}
                  readOnly
                />
                <label htmlFor="" className="label__admin-section">
                  Titulo:
                </label>
                <input
                  type="text"
                  className="text-[black] input__admin-section sm-margin-bottom"
                  value={item.title}
                  readOnly
                />
                <label htmlFor="" className="label__admin-section">
                  Descripción
                </label>
                <textarea
                  className="textarea__admin-section sm-margin-bottom"
                  value={item.description}
                  readOnly
                ></textarea>
                <div className="cntr-btn__news">
                  {/* <button
                    onClick={() => {
                      setSelectedIndex(parseInt(key.match(/\d+/)[0]));
                      setModalIsOpenTwo(true);
                    }}
                    className="btn-update__news"
                  >
                    Update
                  </button> */}
                  <button
                    onClick={() => {
                      setSelectedIndex(parseInt(key.match(/\d+/)[0]));
                      setModalIsOpenThree(true);
                    }}
                    className="btn-delete__news"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </ul>
      </section>

      <AddNews
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
        refreshCourses={() => getNews()}
      ></AddNews>

      {/* <EditNews
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
        indice={selectedIndex}
        refreshCourses={() => getNews()}
      ></EditNews> */}

      <DeleteNews
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        indice={selectedIndex}
        refreshCourses={() => getNews()}
      ></DeleteNews>
    </>
  );
}
