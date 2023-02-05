import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/residentInfo.css";


  const ResidentInfo = ({ url }) => {
  const [character, setCharacter] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCharacter(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article className="resident">
      <header className="resident_header">
        <img className="resident_img" src={character?.image} alt="" />
        <div className="resident_container_status">
          <span className={`resident_circle ${character?.status}`}></span>
          <span className="resident_status">{character?.status}</span>
        </div>
      </header>

      <section className="resident_body">
        <h3 className="resident_name">{character?.name}</h3>
        <hr className="resident_hr"/>
        <ul className="resident_list">
          <li className="resident_item">
            <span className="resident_label">Specie</span>
            {character?.species}
          </li>
          <li className="resident_item">
            <span className="resident_label">Origin</span>
            {character?.origin.name}
          </li>
          <li className="resident_item">
            <span className="resident_label">Eppisodes where appear</span>
            {character?.episode.length}
          </li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentInfo;