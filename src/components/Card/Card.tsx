import React, { FC, useState } from "react";
import style from "./Card.module.css";
import { CardProps } from "../../types/Card";

const Card: FC<CardProps> = ({
  name,
  adress,
  peoples,
  hotels,
  money,
  size,
  url,
  toggle,
}) => {
  const [isToggled, setChangeToggle] = useState(toggle);

  const changeToggle = () => {
    const places: { [key: string]: CardProps } = JSON.parse(
      localStorage.getItem("places") as string
    );
    localStorage.setItem(
      "places",
      JSON.stringify({
        ...places,
        [name]: {
          name,
          adress,
          peoples,
          hotels,
          money,
          size,
          url,
          toggle: !isToggled,
        },
      })
    );
    setChangeToggle(!isToggled);
  };

  return (
    <div
      className={`cards ms-2 me-2 mt-3 mb-3 ps-0 pe-0 pb-3 shadow ${style.cards}`}
    >
      <div className={style.cardImage}>
        <img className={style.img} src={url} alt="screen" />
      </div>
      <div className="card-body mt-2">
        <div className="ms-2 me-2 text-start">
          <div className="form-switch float-end mt-2">
            <input
              type="checkbox"
              className={`form-check-input ${style.checkCustom}`}
              checked={isToggled}
              onChange={changeToggle}
            />
          </div>
          <h5 className="card-title mb-1">{name}</h5>
          <p className={style.smallText}> {adress}</p>
        </div>
        <hr />
        <div className={`row ${style.smallText} text-center`}>
          <div className="col">
            <p>{peoples} M</p>
            <p>Habitants</p>
          </div>
          <div className="col">
            <p>{hotels}</p>
            <p>Hôtels</p>
          </div>
          <div className="col">
            <p>{money}</p>
            <p>Revenu Moy</p>
          </div>
          <div className="col">
            <p>{size}</p>
            <p>km&sup2;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
