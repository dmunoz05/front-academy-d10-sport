import { useState, useEffect, useContext } from "react";
import photoUser from "@assets/icons/photo_user.png"
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";
import "./coach-register.css";

export default function CoachRegisterTwo() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const apiKeyRapidApi = context.apiKeyRapidApi;
  const apiHostRapidIntagram = context.apiHostRapidIntagram;

  const [userIntagram, setUserInstagram] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterClub, setFilterClub] = useState("");
  const [clubResults, setClubResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  function handleCountry(event) {
    let countryId = context.registerCoach.countryID;
    if (event.target?.selectedOptions != undefined) {
      countryId = event.target.selectedOptions[0].id
    }
    context.setRegisterCoach((prev) => ({
      ...prev,
      city: '',
      cityID: ''
    }))
    context.setRegisterCoach((prev) => ({
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
    let cityId = context.registerCoach.cityID;
    if (event.target?.selectedOptions != undefined) {
      cityId = event.target.selectedOptions[0].id
    }
    context.setRegisterCoach((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: cityId
    })
    )
  }

  function handleEmail(event) {
    context.setRegisterCoach((prev) => ({
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
    context.setRegisterCoach((prev) => ({
      ...prev,
      contact: parseInt(event.target.value),
    })
    )
  }

  function handleAcademicLevel(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      academic_level: event.target.value,
    })
    )
  }

  function handleLinceses(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      licenses_obtained: event.target.value,
    })
    )
  }

  function handleOthers(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      other: event.target.value,
    })
    )
  }

  function handleSocialNetworks(user) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      social_networks: { instagram: user },
    })
    )
  }

  const handleClubSelect = (id, clubName) => {
    setFilterClub(clubName);
    setClubResults([]);
    context.setRegisterCoach((prev) => ({
      ...prev,
      current_club: clubName,
      id_club: id,
    }));
  };

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

  const fetchFilterClub = async (filter) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${urlApi}academy/g/search/club/${filter}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (!response.data.success || response.data.data.length === 0) {
        setClubResults([]);
        return []
      } else {
        setClubResults(response.data.data);
        return [response.data.data];
      }
    } catch (error) {
      console.error("Error al filtrar entrenadores:", error);
      return []
    } finally {
      setIsLoading(false);
    }
  };

  function clearSelectClub() {
    setFilterClub("");
    context.setRegisterCoach((prev) => ({
      ...prev,
      current_club: "",
      id_club: 0,
    })
    )
  }

  function clearCity() {
    setCountries([]);
    setCities([]);
    fetchCountries();
    context.setRegisterCoach({
      ...context.registerAthlete,
      country: "",
      countryID: "",
      city: "",
      cityID: ""
    });
  }

  const clearSelectInstagram = () => {
    setUserInstagram("");
    setSuggestions([]);
    context.setRegisterCoach((prev) => ({
      ...prev,
      instagram: "",
    })
    )
  }

  const handleInstagramSearch = () => {
    if (userIntagram.length >= 1) {
      toast.promise(fetchFilterInstragram(userIntagram), {
        loading: 'Cargando...',
        success: (data) => {
          if (data.length > 0) {
            return 'Filtro realizado con exito'
          } else {
            return 'No se encontraron resultados'
          }
        },
        error: 'Error al filtrar',
      });
    } else {
      setSuggestions([]);
      toast.error('Por favor, ingrese un usuario');
    }
  };

  const handleOnChangeClub = (e) => {
    const selectedIndex = e.target.selectedIndex - 1;
    const selectedOption = clubResults[selectedIndex];
    handleClubSelect(selectedOption.id, selectedOption.name_club);
  }

  async function fetchFilterInstragram() {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://${apiHostRapidIntagram}/v1/info?username_or_id_or_url=${userIntagram}`, {
        headers: {
          "x-rapidapi-key": apiKeyRapidApi,
          "x-rapidapi-host": apiHostRapidIntagram,
        },
      });
      if (!response?.data?.data) {
        setSuggestions([]);
        return []
      } else {
        setSuggestions([response.data.data]);
        return [response.data.data];
      }
    } catch (error) {
      console.error("Error al filtrar entrenadores:", error);
      setUserInstagram(userIntagram);
      handleSocialNetworks(userIntagram);
      return []
    } finally {
      setIsLoading(false);
    }
  }

  const handleClubSearch = (e) => {
    let value = e.target.value;
    if (context.registerCoach.current_club != "") {
      const newValue = e.target.value.replace(context.registerCoach.current_club, "").trim();
      value = newValue;
      clearSelectClub();
    }
    setFilterClub(value);

    if (value.length >= 2) {
      toast.promise(fetchFilterClub(value), {
        loading: 'Cargando...',
        success: (data) => {
          if (data.length > 0) {
            return 'Filtro realizado con exito'
          } else {
            return 'No se encontraron resultados'
          }
        },
        error: 'Error al filtrar entrenadores',
      });
    } else {
      setClubResults([]);
    }
  };

  const handleUserInstagram = async (e) => {
    let value = e.target.value;
    if (Object.keys(context.registerCoach.social_networks).length > 0 && context.registerCoach.social_networks?.instagram != "") {
      let newValue = value.replace(context.registerCoach.social_networks?.instagram, "").trim();
      value = newValue;
      clearSelectInstagram();
    }
    setUserInstagram(value);
  };

  const handleSuggestionClick = (username) => {
    if (username.full_name != "") {
      setUserInstagram(username.full_name);
      handleSocialNetworks(username.full_name);
    } else {
      setUserInstagram(username.username)
      handleSocialNetworks(username.username);
    }
    setSuggestions([]);
  };

  async function saveRegisterCoach(data) {
    let res = false;
    await axios.post(`${urlApi}academy/register/coach`,
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
    const validRegister = await context.validateEmptyCoach();
    if (!validRegister) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    const button = document.querySelector(".button-three__login");
    button.disabled = true;
    button.classList.add("opacity-50", "cursor-not-allowed");
    toast.promise(saveRegisterCoach(context.registerCoach), {
      loading: 'Cargando...',
      success: (data) => {
        if (data) {
          context.clearRegisterCoach();
          navigate('/success-register')
          return 'Solicitud de Registro realizada'
        } else {
          throw Error('Error al registrarte')
        }
      },
      error: (msg) => {
        console.error(msg)
        button.disabled = false;
        button.classList.remove("opacity-50", "cursor-not-allowed");
        return 'Error al registrarte'
      },
    });
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (filterClub === "") {
      setClubResults([]);
    }
  }, [filterClub]);

  return (
    <div className="container__login fixed top-0 left-0 right-0 bottom-0 bg-color__login">
      <section className="section__login">
        <div className="form__login">
          <h2 className="title__login">D10+ Academy</h2>
          <h2 className="subtitle__login margin-general__login">
            Regístrate como <span className="text-decoration__login">Entrenador</span>
          </h2>

          <label htmlFor="pais" className="label__login">
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
                defaultValue={context.registerCoach.country}
                onClick={(e) => handleCountry(e)}
              />
            ) :
            (
              <select
                key={context.registerCoach.countryID}
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerCoach.country}
                onChange={(e) => handleCountry(e)}
              >
                <option selected>
                  Seleccionar...
                </option>
                {countries.map((country) => (
                  <option key={country.id} id={country.code} defaultValue={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}

          <label htmlFor="ciudad" className="label__login">
            Ciudad
          </label>
          {cities.length === 0 && countries.length === 0 ||
            context.registerCoach.city != '' && context.registerCoach.country != '' ?
            (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="off"
                  className="input__login cursor-no-drop outline-none"
                  placeholder="Ciudad"
                  defaultValue={context.registerCoach.city}
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
                defaultValue={context.registerCoach.city}
                onChange={(e) => handleCity(e)}
                disabled={cities.length === 0 && !context.registerCoach.city ? true : false}
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

          <label htmlFor="club" className="label__login">
            Club Actual
          </label>
          {context.registerCoach.current_club != '' && context.registerCoach.id_club != 0 ?
            (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="off"
                  className="input__login cursor-no-drop outline-none"
                  placeholder="Ciudad"
                  defaultValue={context.registerCoach.current_club}
                  disabled
                />
                <button className="input-btn" onClick={() => clearSelectClub()}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            ) : (
              <input
                type="text"
                id="club"
                name="club"
                autoComplete="off"
                className="input__login"
                placeholder="Buscar club"
                defaultValue={context.registerCoach.current_club}
                onChange={(e) => handleClubSearch(e)}
              />
            )}
          <div className="input-container">
            {isLoading && <p>Cargando...</p>}
            {clubResults.length > 0 && (
              <>
                <p>Resultados</p>
                <select
                  className="select__login input__login"
                  onChange={(e) => handleOnChangeClub(e)}
                  defaultValue={context.registerCoach.current_club}
                >
                  <option defaultValue="" selected >Seleccione un club...</option>
                  {clubResults.map((coach) => (
                    <option key={coach.id} defaultValue={coach.id}>
                      {coach.name_club}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <label htmlFor="email" className="label__login">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            className="input__login"
            placeholder="Email"
            defaultValue={context.registerCoach.mail}
            onChange={(e) => handleEmail(e)}
          />

          <label htmlFor="number_phone" className="label__login">
            Numero celular
          </label>
          <input
            maxLength={10}
            type="text"
            id="number_phone"
            name="number_phone"
            autoComplete="off"
            className="input__login"
            pattern="[0-9]{10}"
            placeholder="Numero celular"
            defaultValue={context.registerCoach.contact == 0 ? '' : context.registerCoach.contact}
            onChange={(e) => handleCellPhone(e)}
          />

          <label htmlFor="grado-academico" className="label__login">
            Grado Académico
          </label>
          <select
            name="academic_level"
            id="academic_level"
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

          <label htmlFor="licenses_obtained" className="label__login">
            Licencias obtenidas
          </label>
          <input
            type="text"
            id="licenses_obtained"
            name="licenses_obtained"
            autoComplete="off"
            className="input__login"
            placeholder="Licenciado en..."
            defaultValue={context.registerCoach.licenses_obtained}
            onChange={(e) => handleLinceses(e)}
          />

          <label htmlFor="other" className="label__login">
            Otros
          </label>
          <input
            type="text"
            id="other"
            name="other"
            autoComplete="off"
            className="input__login"
            placeholder="Soy bueno en..."
            defaultValue={context.registerCoach.other}
            onChange={(e) => handleOthers(e)}
          />

          <label htmlFor="user-instagram" className="label__login">
            Usuario Instagram
          </label>
          <div className="input-container">
            <div className="w-full flex justify-between gap-2">
              <input
                type="text"
                id="user-instagram"
                name="user-instagram"
                autoComplete="off"
                className="input__login"
                placeholder="Usuario Instagram"
                defaultValue={userIntagram || context.registerCoach.social_networks?.instagram || ''}
                onChange={(e) => handleUserInstagram(e)}
              />
              <button className="input-btn" onClick={handleInstagramSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
          </div>
          {isLoading && <p>Cargando...</p>}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(user)}
                >
                  <div className="suggestion-info">
                    <p className="suggestion-fullname">{user.full_name != "" ? user.full_name : user.username}</p>
                  </div>
                  <img
                    // src={user.hd_profile_pic_url_info.url}
                    src={photoUser}
                    width="24"
                    height="24"
                    alt={user.username}
                    className="suggestion-avatar"
                  />
                </li>
              ))}
            </ul>
          )}

          <button onClick={() => nextStep()} className="button-three__login">Registrar</button>
          <button
            className="cursor-pointer link__login center-text__login"
            onClick={() => navigate('/register/coach/step-one')}
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}
