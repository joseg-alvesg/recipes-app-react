import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Footer from "../components/Footer";
import { renderWithRouter } from "./RenderWithRouter";

describe("Testando o componente Footer", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Testa se o footer é renderizado", () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId("footer");
    const drink = screen.getByTestId("drinks-bottom-btn");
    const meal = screen.getByTestId("meals-bottom-btn");

    expect(footer).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
  });

  it("Testa se ao clicar no botão de drinks a rota muda para /drinks", async () => {
    const { history } = renderWithRouter(<Footer />);
    jest.spyOn(history, "push");
    const drink = screen.getByTestId("drinks-bottom-btn");
    expect(drink).toBeInTheDocument();
    await act(async () => {
      drink.click();
    });
    expect(history.push).toHaveBeenCalledWith("/drinks");
  });

  it("Testa se ao clicar no botão de meals a rota muda para /meals", async () => {
    const { history } = renderWithRouter(<Footer />);
    jest.spyOn(history, "push");
    const meal = screen.getByTestId("meals-bottom-btn");
    expect(meal).toBeInTheDocument();
    await act(async () => {
      meal.click();
    });
    expect(history.push).toHaveBeenCalledWith("/meals");
  });
});
