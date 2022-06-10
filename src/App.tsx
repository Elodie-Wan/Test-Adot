import React, { useEffect, useState } from "react";
import { CardProps } from "./types/Card";
import "./App.css";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import PlacesContext from "./context/PlacesContext";

function App() {
  const cards: {
    [name: string]: CardProps;
  } = {
    Copenhagen: {
      name: "Copenhagen",
      adress: "Radhuspladsen 1, 1500 Kobenhavn, Denmark",
      peoples: 8.6,
      hotels: 400,
      money: 40000,
      size: 730,
      url: "https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/denmark/copenhagen/destinations-copenhagen-banner-mobile-1024x553.jpg",
      toggle: false,
    },
    Tehran: {
      name: "Tehran",
      adress: "Tehran, Azadi Square, Iran",
      peoples: 8.6,
      hotels: 400,
      money: 30000,
      size: 730,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Aerial_View_of_Tehran_26.11.2008_04-35-03.JPG/1280px-Aerial_View_of_Tehran_26.11.2008_04-35-03.JPG",
      toggle: false,
    },
    Paris: {
      name: "Paris",
      adress: "Pl. de l'Hôtel de Ville, 75004 Paris",
      peoples: 2.1,
      hotels: 7500,
      money: 50000,
      size: 105.4,
      url: "https://photos.mandarinoriental.com/is/image/MandarinOriental/paris-2017-home?wid=2880&hei=1280&fmt=jpeg&crop=9,336,2699,1200&anchor=1358,936&qlt=75,0&fit=wrap&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72",
      toggle: true,
    },
    London: {
      name: "London",
      adress: "London SW1A 0AA, United Kingdom",
      peoples: 8.98,
      hotels: 10000,
      money: 90000,
      size: 1572,
      url: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/tower-bridge/thames_copyright_visitlondon_antoinebuchet640x360.jpg?mw=640&hash=27AEBE2D1B7279A196CC1B4548638A9679BE107A",
      toggle: true,
    },
    Tokyo: {
      name: "Tokyo",
      adress: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan",
      peoples: 13.9,
      hotels: 7000,
      money: 70000,
      size: 627.6,
      url: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
      toggle: true,
    },
    "New York": {
      name: "New York",
      adress: "New York, NY 10004, United States",
      peoples: 8.4,
      hotels: 12000,
      money: 100000,
      size: 783.8,
      url: "https://www.nyc.fr/wp-content/uploads/2015/07/New_York_City-770x385.jpg",
      toggle: false,
    },
  };

  const [isOpenModal, setOpenModal] = useState(false);
  const [places, setPlaces] = useState<{ [name: string]: CardProps }>({});

  const openModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("initPlaces") === null) {
      localStorage.setItem("places", JSON.stringify(cards));
      localStorage.setItem("initPlaces", "true");
    }
    setPlaces(JSON.parse(localStorage.getItem("places") as string));
  }, []);

  return (
    <PlacesContext.Provider value={setPlaces}>
      <div className="App ps-5 pe-5 pt-5">
        <div id="background"></div>
        <div className="ms-5 me-5 mt-5 ps-5 pe-5">
          <div className="d-flex mb-4">
            <p className="h2">Destination</p>
            <button
              className="add shadow pe-2 ps-2 jalign-self-end"
              onClick={openModal}
              data-testid="add-button"
            >
              + Ajouter
            </button>
            {isOpenModal && <Modal setOpenModal={setOpenModal} />}
          </div>
          <div className="row d-flex">
            {Object.values(places).map((place, index) => (
              <Card
                name={place.name}
                adress={place.adress}
                peoples={place.peoples}
                hotels={place.hotels}
                money={place.money}
                size={place.size}
                url={place.url}
                toggle={place.toggle}
                key={`place_${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </PlacesContext.Provider>
  );
}

export default App;
