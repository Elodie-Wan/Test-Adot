import React from "react";
import {
  act,
  fireEvent,
  queries,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import Modal from "./components/Modal/Modal";
import userEvent from "@testing-library/user-event";

describe("modal", () => {
  test("modal should be closen when app start", () => {
    render(<App />);
    expect(screen.queryByTestId("modal")).toBeNull();
  });
  test("modal should be open when click on ajouter", () => {
    render(<App />);
    userEvent.click(screen.getByText("+ Ajouter"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});

describe("cards", () => {
  test("should have the card paris after initialization", () => {
    render(<App />);
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });
});

describe("form", () => {
  test("invalid form submit", async () => {
    const mockSetOpenModal = jest.fn();
    render(<Modal setOpenModal={mockSetOpenModal} />);
    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText("Nom de la destination"), {
        target: {
          value: "Berlin",
        },
      });
      userEvent.click(screen.getByText("CONFIRM"));
    });
    expect(screen.getByText("Veuillez entrer une adresse")).toBeInTheDocument();
  });

  test("valid form submit", async () => {
    render(<App />);
    userEvent.click(screen.getByText("+ Ajouter"));
    await act(async () => {
      const inputList: { [key: string]: string | number } = {
        "Nom de la destination": "Berlin",
        Adresse: "Random Adress, Allemagne",
        "Lien de l'image":
          "https://images.ladepeche.fr/api/v1/images/view/5c2e06d98fe56f0b27572b11/large/image.jpg",
        "Nb Habitants": 10,
        "Nb. Hotêls": 5,
        "Revenu Moy": 300,
        Superficie: 160,
      };

      Object.entries(inputList).map(([key, valueInput]) => {
        fireEvent.input(screen.getByPlaceholderText(key), {
          target: {
            value: valueInput,
          },
        });
      });

      userEvent.click(screen.getByText("CONFIRM"));
    });
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });
});
