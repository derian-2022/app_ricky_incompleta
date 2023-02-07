import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentInfo from "./components/ResidentInfo";
import getRandomLocation from "./utils/getRandomLocation";


function App() {
  const [location, setLocation] = useState();
  const [numberLocation, setNumberLocation] = useState(getRandomLocation());
  const [hasError, setHasError] = useState(false);
  const [listLocation, setListLocation] = useState();
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    axios.get(url)
      .then(res => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch(err => {
        console.log(err);
        setHasError(true);
      });
  }, [numberLocation]);

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation());
    } else {
      setNumberLocation(e.target.inputLocation.value.trim());
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim();
  };

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?.name=${e.target.value.trim()}`;
    axios.get(url)
      .then(res => setListLocation(res.data.results))
      .catch(err => console.log(err));
  };

    const handleFocus = () => setIsShow(true)
    const handleBlur = () => setIsShow(false)
    const handleClickList = id => setNumberLocation(id)
  
  console.log(isShow)


  return (

    <div className="app">
      <header className="app_header"></header>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form_input"
          id="inputLocation"
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="form_btn">Search</button>
      </form>
      {
        isShow && 
        <ul>
          {
            listLocation?.map(loc => (
             <li onClick={() => handleClickList(loc.id)} key={loc.id}>
                {loc.name}</li>
            ))
          }
        </ul>
      }
      
      {
        hasError ? 
              <h2 className="app_error">
                  ❌ Hey!! you must provide an id from 1 to 126 🥺 
                  <img className="app_img_err" src="/imagen_errores.gif" alt="morty err" />   
              </h2>
       : (
        <>
          <LocationInfo location={location} />
          <div className="residents_container">
            {location?.residents.map((url) => (
              <ResidentInfo key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
