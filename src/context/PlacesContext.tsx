import React, { createContext } from "react";
import { CardProps } from "../types/Card";

const PlacesContext = createContext<React.Dispatch<
  React.SetStateAction<{ [name: string]: CardProps }>
> | null>(null);
export default PlacesContext;
