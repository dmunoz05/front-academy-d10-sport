import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from 'sonner';
import axios from "axios";

export default function AthleteRegisterThree() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate()

  function handleNameFamily(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      first_names_family: event.target.value,
    })
    )
  }

  function handleLastNameFamily(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      last_names_family: event.target.value,
    })
    )
  }

  function handleCellPhoneFamily(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      contact_family: event.target.value,
    })
    )
  }

  async function saveRegisterAthlete(data) {
    let res = false;
    await axios.post(`${urlApi}academy/register/athletes`,
      JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
      .then((response) => {
        if (!response.data.success) {
          toast.error(`${response.data.message}`);
          return
        };
        res = true
      })
      .catch(() => {
        res = false
      });
    return res
  }

  async function nextStep() {
    const validRegister = await context.validateEmptyAthlete();
    if (!validRegister) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    // const register = await saveRegisterAthlete(context.registerAthlete);
    toast.promise(saveRegisterAthlete(context.registerAthlete), {
      loading: 'Cargando...',
      success: (data) => {
        if (data) {
          context.clearRegisterAthlete();
          navigate('/success-register')
          return 'Registro realizado'
        } else {
          return 'Error al registrarte'
        }
      },
      error: 'Error al filtrar entrenadores',
    });
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
          </h2>

          <label htmlFor="nombre-familia" className="label__login">
            Nombres del Padre o Madre
          </label>
          <input
            type="text"
            id="firstname_family"
            name="firstname_family"
            className="input__login"
            placeholder="Nombres"
            value={context.registerAthlete.first_names_family}
            onChange={(e) => handleNameFamily(e)}
          />

          <label htmlFor="apellido-familia" className="label__login">
            Apellidos del Padre o Madre
          </label>
          <input
            type="text"
            id="lastname_family"
            name="lastname_family"
            className="input__login"
            placeholder="Apellidos"
            value={context.registerAthlete.last_names_family}
            onChange={(e) => handleLastNameFamily(e)}
          />

          <label htmlFor="contacto-familia" className="label__login">
            Contacto del Padre o Madre
          </label>
          <input
            type="tel"
            id="contac_family"
            name="contac_family"
            className="input__login"
            placeholder="Numero de celular"
            value={context.registerAthlete.contact_family == 0 ? '' : context.registerAthlete.contact_family}
            onChange={(e) => handleCellPhoneFamily(e)}
          />

          <button onClick={() => nextStep()} className="button-three__login">Registrar</button>
          <button
            className="link__login link--color__login center-text__login"
            onClick={() => navigate('/register/athlete/step-two')}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
