import React, { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./Modal.module.css";
import { CardProps } from "../../types/Card";
import PlacesContext from "../../context/PlacesContext";

type ModalProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup
  .object({
    name: yup.string().required("Veuillez entrer un nom"),
    adress: yup.string().required("Veuillez entrer une adresse"),
    url: yup
      .string()
      .required("Veuillez entrer un url")
      .matches(/^https:\/\/+/, "Lien invalide"),
    peoples: yup
      .number()
      .positive("Doit être positif")
      .required("Le champ est requis")
      .typeError("Doit être un chiffre"),
    hotels: yup
      .number()
      .positive("Doit être positif")
      .required("Le champ est requis")
      .typeError("Doit être un chiffre"),
    money: yup
      .number()
      .positive("Doit être positif")
      .required("Le champ est requis")
      .typeError("Doit être un chiffre"),
    size: yup
      .number()
      .positive("Doit être positif")
      .required("Le champ est requis")
      .typeError("Doit être un chiffre"),
    toggle: yup.boolean().default(false),
  })
  .required();

const Modal: FC<ModalProps> = ({ setOpenModal }) => {
  const setPlaces = useContext(PlacesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const setCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (data: CardProps) => {
    const places: { [key: string]: CardProps } = JSON.parse(
      localStorage.getItem("places") as string
    );
    localStorage.setItem(
      "places",
      JSON.stringify({ ...places, [data.name]: data })
    );
    setPlaces?.({ ...places, [data.name]: data });
    setCloseModal();
  };

  return (
    <div
      className={`position-fixed w-100 h-100 start-0 top-0 d-flex ${style.modalSurrounding}`}
      data-testid="modal"
    >
      <div
        className="position-absolute bg-dark opacity-50 w-100 h-100 start-0 top-0"
        onClick={setCloseModal}
      ></div>
      <div
        className={`position-relative ${style.modalContent} bg-white mx-auto my-auto p-3 col-5 shadow rounded`}
      >
        <h3>Ajoutez une nouvelle destination</h3>
        <form className={style.input} onSubmit={handleSubmit(onSubmit)}>
          <label>{errors.name?.message}</label>
          <input
            {...register("name")}
            className="row w-100"
            placeholder="Nom de la destination"
          />
          <label>{errors.adress?.message}</label>
          <input
            {...register("adress")}
            className="row w-100"
            placeholder="Adresse"
            autoFocus
          />
          <label>{errors.url?.message}</label>
          <input
            {...register("url")}
            className="row w-100"
            placeholder="Lien de l'image"
          />
          <div
            className={`row d-flex justify-content-center ${style.smallInput}`}
          >
            <div className="col">
              <label>{errors.peoples?.message}</label>
              <input {...register("peoples")} placeholder="Nb Habitants" />
            </div>
            <div className="col">
              <label>{errors.hotels?.message}</label>
              <input {...register("hotels")} placeholder="Nb. Hotêls" />
            </div>
            <div className="col">
              <label>{errors.money?.message}</label>
              <input {...register("money")} placeholder="Revenu Moy" />
            </div>
            <div className="col">
              <label>{errors.size?.message}</label>
              <input {...register("size")} placeholder="Superficie" />
            </div>
          </div>
          <div className="form-switch">
            <input
              type="checkbox"
              className={`form-check-input mt-4 ${style.checkCustom}`}
              {...register("toggle")}
            />
            <label className={`mt-4 ms-3 ${style.textCustom}`}>Activer</label>
          </div>
          <div className="mt-5 float-end">
            <button className={`me-5 ${style.cancel}`} onClick={setCloseModal}>
              CANCEL
            </button>
            <button className={style.confirm} type="submit">
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
