// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./log-form-1.css";
import "../../css/loginStyles.css";

export default function Club4() {
  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como Club
          </h2>

          <label htmlFor="ayudantes" className="label__login">
            Ayudantes
          </label>
          <input
            type="text"
            id="ayudantes"
            name="ayudantes"
            className="input__login"
            placeholder="Ayudantes"
          />
          <label htmlFor="pasantes" className="label__login">
            Pasantes
          </label>
          <input
            type="text"
            id="pasantes"
            name="pasantes"
            className="input__login"
            placeholder="Pasantes"
          />
          <label htmlFor="sedes" className="label__login">
            Sedes
          </label>
          <input
            type="text"
            id="sedes"
            name="sedes"
            className="input__login"
            placeholder="Sedes"
          />
          <label htmlFor="sitios" className="label__login">
            Sitios
          </label>
          <input
            type="text"
            id="sitios"
            name="sitios"
            className="input__login"
            placeholder="Sitios"
          />

          <button className="button-three__login">Siguiente</button>
          <a
            href=""
            className="link__login link--color__login center-text__login"
          >
            Regresar
          </a>
        </form>
      </section>
    </>
  );
}
