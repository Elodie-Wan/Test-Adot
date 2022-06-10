import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
    const button = screen.getByText("+ Ajouter");
    userEvent.click(button);
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
      const button = screen.getByText("CONFIRM");
      userEvent.click(button);
    });
    expect(screen.getByText("Veuillez entrer une adresse")).toBeInTheDocument();
  });
});
