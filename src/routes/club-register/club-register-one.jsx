import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from 'sonner';
import './club-register.css'

export default function ClubRegisterOne() {
  const context = useContext(AppContext);
  const navigate = useNavigate()

  function handleName(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      name_club: event.target.value,
    })
    )
  }

  function handlePresident(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      president: event.target.value,
    })
    )
  }

  function handleDateFounded(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      date_founded: event.target.value,
    })
    )
  }

  function handleComet(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        comet: inputValue,
      }));
    }
  }

  function nextStep() {
    context.setRegisterClub((prev) => ({
      ...prev,
      role: context.typeUser,
    }))
    if (!context.registerClub.name_club || !context.registerClub.date_founded || !context.registerClub.president || !context.registerClub.comet) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/club/step-two')
  }

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h1 className="title__login">D10+ Academy</h1>
          <h2 className="subtitle__login">Regístrate como <span className="text-decoration__login">{context.typeUser.name_role}</span></h2>
          <div className="cntr-img__login">
            <img
              src={new URL(`../../assets/img/${context.typeUser.description_role}.png`, import.meta.url).href}
              alt="img"
              className="img__login"
            />
          </div>
          <label htmlFor="nombre-club" className="label__login">
            Nombre club
          </label>
          <input
            type="text"
            id="nombre-club"
            name="nombreClub"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre del club"
            value={context.registerClub.name_club}
            onChange={(e) => handleName(e)}
          />

          <label htmlFor="president" className="label__login">
            Presidente
          </label>
          <input
            type="text"
            id="president"
            name="president"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre del presidente"
            value={context.registerClub.president}
            onChange={(e) => handlePresident(e)}
          />

          <label htmlFor="date_founded" className="label__login">
            Fecha de fundación
          </label>
          <input
            type="date"
            id="date_founded"
            name="date_founded"
            autoComplete="off"
            className="input__login"
            min="1900-01-01"
            max="2099-12-31"
            value={context.registerAthlete.date_founded}
            onChange={(e) => handleDateFounded(e)}
          />

          <label htmlFor="comet" className="label__login">
            Comet
          </label>
          <input
            type="number"
            id="comet"
            name="comet"
            autoComplete="off"
            className="input__login"
            placeholder="10"
            min={1}
            max={100}
            step={1}
            value={context.registerClub.comet == 0 ? '' : context.registerClub.comet}
            onChange={(e) => handleComet(e)}
          />

          <button onClick={() => nextStep()} className="button-three__login">Siguiente</button>
          <button
            className="cursor-pointer link__login center-text__login"
            onClick={() => navigate('/register')}
          >
            Cancelar
          </button>
        </div>
      </section>
    </>
  );
}
