// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./log-form-1.css";
import "../../css/loginStyles.css";

export default function Club1() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">Regístrate como club</h2>
          <p className="text__login link--color__login margin-general__login">
            Foto de perfil
          </p>
          <div className="cntr-img__login">
            <img
              src="assets/background-img.png"
              alt="img"
              className="img__login"
            />
          </div>
          <button className="button-two__login">Cambiar</button>
          <label className="label__login">Nombre club</label>
          <input
            type="text"
            className="input__login"
            placeholder="Nombre del club"
          />
          <label className="label__login">Fecha de fundado</label>
          <input type="date" className="input__login" />
          <label className="label__login">Comet</label>
          <input type="text" className="input__login" placeholder="Comet" />
          <label className="label__login">Presidente</label>
          <input
            type="text"
            className="input__login"
            placeholder="Nombre del presidente del club"
          />

          <button className="button-three__login">Siguiente</button>
          <a
            href=""
            className="link__login link--color__login center-text__login link--active__login"
          >
            Cancelar
          </a>
        </form>
      </section>
    </>
  );
}
