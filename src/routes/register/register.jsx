import imageAthlete from "@assets/img/deportista.png";
import imageCoach from "@assets/img/entrenador.png";
import imageClub from "@assets/img/club.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "@context/app/app-context";
import "./register.css";

export default function Register() {
  const { setTypeUser } = useContext(AppContext);
  const navigate = useNavigate();

  function selectTypeUser(event) {
    setTypeUser(event.currentTarget.id);
    if (event.currentTarget.id === "athlete")
      return navigate("/register/athlete/step-one");
    if (event.currentTarget.id === "coach")
      return navigate("/register/coach/step-one");
    if (event.currentTarget.id === "club")
      return navigate("/register/club/step-one");
  }

  return (
    <>
      <section className="section__register">
        <div className="cntr-link__register">
          <button
            id="athlete"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Deportista</h1>
            </div>
            <img
              src={imageAthlete}
              alt="Img Deportista"
              className="img__register"
            />
          </button>

          <button
            id="coach"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <img
              src={imageCoach}
              alt="Img Entrenador"
              className="img__register"
            />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Entrenador</h1>
            </div>
          </button>

          <button
            id="club"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <img src={imageClub} alt="Img Club" className="img__register" />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Club</h1>
            </div>
          </button>
        </div>
        <div className="cntr-menu__register">
          <div className="cntr-title__register">
            <h1 className="title__register">Registro</h1>
          </div>
          <div className="cntr-text__register">
            <p className="text__register">¿Ya tienes una cuenta?</p>
            <Link to="/login-user" className="text__register text--color">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
