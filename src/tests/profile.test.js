import { act, screen, waitFor } from "@testing-library/react";
import React from "react";
import Profile from "../pages/Profile";
import { renderWithRouter } from "./RenderWithRouter";

describe("Testando o componente Profile", () => {
  beforeEach(() => {
    jest.spyOn(localStorage, "getItem");
    localStorage.getItem = jest.fn();

    jest.spyOn(localStorage, "setItem");
    localStorage.setItem = jest.fn();

    localStorage.setItem("user", JSON.stringify({ email: "teste@test.com" }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Testa se ao entrar na rota o email é renderizado", async () => {
    await act(async () => {
      renderWithRouter(<Profile />, {
        initialEntries: ["/profile"],
      });
    });

    const email = screen.getByTestId("profile-email");
    expect(email).toBeInTheDocument();
  });

  it("Testa o botão de logout", async () => {
    let component;
    await act(async () => {
      component = renderWithRouter(<Profile />, {
        initialEntries: ["/profile"],
      });
    });
    const { history } = component;

    const buttonLogout = screen.getByTestId("profile-logout-btn");

    expect(buttonLogout).toBeInTheDocument();

    await act(async () => {
      buttonLogout.click();
    });

    expect(history.location.pathname).toBe("/");
  });

  it("Testa um email vazio", async () => {
    localStorage.clear();
    await act(async () => {
      renderWithRouter(<Profile />, {
        initialEntries: ["/profile"],
      });
    });

    const email = screen.getByTestId("profile-email");

    expect(email).toBeInTheDocument();
  });
});
