import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import AppContext from "@context/app/app-context";
import "./video-class.css";

export default function VideoClass() {
  const { idCourse } = useParams();
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const id_user = context.user?.id_login;

  const [selectedClass, setSelectedClass] = useState(null);
  const [comments, setComments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [unlockedClass, setUnlockedClass] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`unlockedClass_${idCourse}`);
    if (savedProgress) {
      setUnlockedClass(Number(savedProgress));
    }
    getClassMenu();
  }, []);

  async function getClassContent(id) {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/content`, {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setSelectedClass(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error al obtener el contenido de la clase:", error);
    }
  }

  async function getClassMenu() {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/menu`, {
        params: { id_course: idCourse },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setClasses(response.data.data);
        const savedProgress = localStorage.getItem(`unlockedClass_${idCourse}`);
        const lastUnlocked = savedProgress
          ? Number(savedProgress)
          : response.data.data[0].class_id;
        setUnlockedClass(lastUnlocked);
        getClassContent(lastUnlocked);
        getClassComments(lastUnlocked);
      }
    } catch (error) {
      console.error("Error al obtener el menú de clases:", error);
    }
  }

  async function getClassComments(classId) {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/comments`, {
        params: { id_class: classId },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error al obtener los comentarios de la clase:", error);
    }
  }

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(class_id, id_user) {
    if (!comment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${urlApi}academy/i/class/post-comments`,
        {
          id_class: class_id,
          id_user: id_user,
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Comentario publicado con éxito");
        setComment("");
      } else {
        throw new Error("Error al publicar el comentario");
      }
    } catch (error) {
      setError("Hubo un problema al publicar el comentario");
      console.error("Hubo un problema al publicar el comentario:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClassSelector(id) {
    if (id === unlockedClass) {
      getClassContent(id);
      getClassComments(id);
    }
  }

  function unlockNextClass() {
    const currentIndex = classes.findIndex(
      (cls) => cls.class_id === unlockedClass
    );
    if (currentIndex < classes.length - 1) {
      const nextClassId = classes[currentIndex + 1].class_id;
      setUnlockedClass(nextClassId);
      localStorage.setItem(`unlockedClass_${idCourse}`, nextClassId);
      getClassContent(nextClassId);
      getClassComments(nextClassId);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const changeBtnClass = useMemo(() => {
    switch (deviceType) {
      case "mobile":
        return { show: true };
      case "tablet":
        return { show: true };
      default:
        return { show: false };
    }
  }, [deviceType]);

  useEffect(() => {
    getClassMenu();
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
      } else if (width > 768 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="class">
        <div className="cntr-list__class">
          <div className="subcntr-list__class">
            {changeBtnClass.show ? (
              <div className="cntr-list__class">
                <div className="subcntr-list__class">
                  <h1 className="title-btn__class" onClick={toggleList}>
                    Clases
                  </h1>
                  {isOpen && (
                    <ul className="list__class">
                      {classes.map((cls) => (
                        <li
                          key={cls.class_id}
                          className="list-item__class"
                          onClick={() => handleClassSelector(cls.class_id)}
                        >
                          {cls.class_title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="cntr-list__class">
                <div className="subcntr-list__class">
                  <h1 className="title__class">Clases</h1>
                  <ul className="list__class">
                    {classes.map((cls) => (
                      <li
                        key={cls.class_id}
                        className={`list-item__class ${
                          cls.class_id === unlockedClass ? "unlocked" : "locked"
                        }`}
                        onClick={() => handleClassSelector(cls.class_id)}
                        style={{
                          cursor:
                            cls.class_id === unlockedClass
                              ? "pointer"
                              : "not-allowed",
                        }}
                      >
                        {cls.class_title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="cntr-video__class">
          {selectedClass && (
            <>
              <div className="subcntr-video__class">
                <video
                  className="video__class"
                  src={selectedClass.class_content?.video || ""}
                  controls
                  muted
                ></video>
              </div>

              <div className="description__class">
                <h2 className="subtitle__class">{selectedClass.class_title}</h2>
                <p className="text__class">{selectedClass.class_description}</p>
                <div className="profile__class">
                  <img className="profile-img__class" src="" alt="Profile" />
                  <p className="text__class">Prof. Juan Pérez</p>
                </div>
                <div className="confirmation-section">
                  <p>¿Ya viste la clase?</p>
                  <button onClick={unlockNextClass}>Sí, continuar</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="cntr-comment__class">
          <h2 className="subtitle__comment">Comentarios</h2>
          <div className="form__class">
            <textarea
              className="textarea__class"
              placeholder="Escribe tu comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn__class"
              onClick={() => handleSubmit(selectedClass.id, id_user)}
              disabled={loading}
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>
            {error && <p className="error">{error}</p>}
          </div>
          <ul className="comment__class">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item__class">
                <h2 className="subtitle__class">
                  {comment.nombre || "Usuario Desconocido"}
                </h2>
                <p className="text__class">{comment.comentario}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
