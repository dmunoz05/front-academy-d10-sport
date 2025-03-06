import { useEffect, useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";
import './athlete-register.css'

export default function AthleteRegisterTwo() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate()

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  function handleCountry(event) {
    let countryId = context.registerAthlete.countryID;
    if (event.target?.selectedOptions != undefined) {
      countryId = event.target.selectedOptions[0].id
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: '',
      cityID: ''
    }))
    context.setRegisterAthlete((prev) => ({
      ...prev,
      country: event.target.value,
      countryID: countryId
    })
    )
    if (countryId != '') {
      fetchCities(event.target.selectedOptions[0].id);
    }
  }

  function handleCity(event) {
    let cityId = context.registerAthlete.cityID;
    if (event.target?.selectedOptions != undefined) {
      cityId = event.target.selectedOptions[0].id
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: cityId
    })
    )
  }

  function handleEmail(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      mail: event.target.value,
    })
    )
  }

  function handleCellPhone(event) {
    let number = parseInt(event.target.value);
    if (isNaN(number)) {
      event.target.value = '';
      number = 0;
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      contact: number,
    })
    )
  }

  function handleAcademicLevel(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      academic_level: event.target.value,
    })
    )
  }

  function handleInstagram(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      social_networks: { instagram: event.target.value },
    })
    )
  }

  function clearCity() {
    setCountries([]);
    setCities([]);
    fetchCountries();
    context.setRegisterAthlete({
      ...context.registerAthlete,
      country: "",
      countryID: "",
      city: "",
      cityID: ""
    });
  }

  async function fetchCountries() {
    axios.get(`${urlApi}external/g/rest/countries/america`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return
        };
        setCountries(response.data.data);
      })
      .catch(() => {
        console.error('Error al obtener los paises');
      });
  }

  function fetchCities(countryId) {
    axios.get(`${urlApi}external/g/geon/cities/${countryId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return
        };
        setCities(response.data.data);
      })
      .catch(() => {
        console.error('Error al obtener las ciudades');
      });
  }

  function nextStep() {
    if (!context.registerAthlete.country || !context.registerAthlete.city || !context.registerAthlete.mail || !context.registerAthlete.contact || !context.registerAthlete.academic_level || !Object.keys(context.registerAthlete.social_networks).length > 0) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/athlete/step-three')
  }

  useEffect(() => {
    fetchCountries()
  }, [])


  return (
    <div className="container__login fixed top-0 left-0 right-0 bottom-0 bg-color__login">
      <section className="section__login">
        <div className="form__login">
          <label htmlFor="pais" className="label__login cursor-pointer">
            País
          </label>
          {countries.length === 0 ?
            (
              <input
                type="text"
                id="country"
                name="country"
                autoComplete="off"
                className="input__login"
                placeholder="País"
                defaultValue={context.registerAthlete.country}
                onClick={(e) => handleCountry(e)}
              />
            ) :
            (
              <select
                key={context.registerAthlete.countryID}
                name="country"
                id="country"
                className="input__login"
                value={context.registerAthlete.country}
                onChange={(e) => handleCountry(e)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                {countries.map((country) => (
                  <option key={country.id} id={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}

          <label htmlFor="ciudad" className="label__login cursor-pointer">
            Ciudad
          </label>
          {cities.length === 0 && countries.length === 0 ||
            context.registerAthlete.city != '' && context.registerAthlete.country != '' ?
            (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="off"
                  className="input__login cursor-no-drop outline-none"
                  placeholder="Ciudad"
                  defaultValue={context.registerAthlete.city}
                  disabled
                />
                <button className="input-btn" onClick={() => clearCity()}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            ) : (
              <select
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerAthlete.city}
                onChange={(e) => handleCity(e)}
                disabled={cities.length === 0 && !context.registerAthlete.city ? true : false}
              >
                <option selected>
                  Seleccionar...
                </option>
                {cities.map((city) => (
                  <option key={city.id} id={city.code} defaultValue={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            )}

          <label htmlFor="email" className="label__login ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre"
            defaultValue={context.registerAthlete.mail}
            onChange={(e) => handleEmail(e)}
          />

          <label htmlFor="numero-celular" className="label__login cursor-pointer">
            Numero celular
          </label>
          <input
            type="text"
            maxLength={10}
            id="number_phone"
            name="number_phone"
            autoComplete="off"
            className="input__login"
            placeholder="Numero celular"
            defaultValue={context.registerAthlete.contact == 0 ? '' : context.registerAthlete.contact}
            onChange={(e) => handleCellPhone(e)}
          />

          <label htmlFor="academic_level" className="label__login cursor-pointer">
            Grado Académico
          </label>
          <select
            id="academic_level"
            name="academic_level"
            className="input__login"
            defaultValue={context.registerAthlete.academic_level}
            onChange={(e) => handleAcademicLevel(e)}
          >
            <option defaultValue="" selected>
              Seleccionar...
            </option>
            <option defaultValue="bachiller">Bachiller</option>
            <option defaultValue="tecnico">Técnico</option>
            <option defaultValue="tecnologico">Tecnológico</option>
            <option defaultValue="pregrado">Pregrado</option>
            <option defaultValue="postgrado">Postgrado</option>
            <option defaultValue="especializacion">Especializacion</option>
            <option defaultValue="doctorado">Doctorado</option>
          </select>

          <label htmlFor="user_instagram" className="label__login cursor-pointer">
            Usuario Instagram
          </label>
          <input
            type="text"
            id="user_instagram"
            name="user_instagram"
            autoComplete="off"
            className="input__login"
            placeholder="Usuario_Instagram"
            defaultValue={context.registerAthlete.social_networks?.instagram || ''}
            onChange={(e) => handleInstagram(e)}
          />

          <button onClick={() => nextStep()} className="button-three__login">Siguiente</button>
          <button
            className="link__login center-text__login"
            onClick={() => navigate('/register/athlete/step-one')}
          >
            Regresar
          </button>
        </div>
      </section>
    </div>
  );
}
