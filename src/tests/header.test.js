import React from "react";
import { renderWithRouter } from "./RenderWithRouter";
import Header from "../components/Header";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Testando o componente Header", () => {
  const headerMealsMock = {
    title: "meals",
    search: "searchIcon.svg",
    mealIcon: "mealIcon.svg",
    profileIcon: "profileIcon.svg",
  };

  const headerDrinksMock = {
    title: "drinks",
    search: "searchIcon.svg",
    mealIcon: "drinkIcon.svg",
    profileIcon: "profileIcon.svg",
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Testa se o header é renderizado no Meals", () => {
    renderWithRouter(<Header title="meals" />, { initialEntries: ["/meals"] });
    const title = screen.getByTestId("page-title");
    const search = screen.getByTestId("search-top-btn");
    const meal = screen.getByTestId("page-icon");
    const profile = screen.getByTestId("profile-top-btn");

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    expect(profile).toBeInTheDocument();

    expect(title).toHaveTextContent(headerMealsMock.title);
    expect(search).toHaveAttribute("src", headerMealsMock.search);
    expect(meal).toHaveAttribute("src", headerMealsMock.mealIcon);
    expect(profile).toHaveAttribute("src", headerMealsMock.profileIcon);
  });

  it("Testa se o header é renderizado no Drinks", () => {
    renderWithRouter(<Header title="drinks" />, {
      initialEntries: ["/drinks"],
    });
    const title = screen.getByTestId("page-title");
    const search = screen.getByTestId("search-top-btn");
    const drink = screen.getByTestId("page-icon");
    const profile = screen.getByTestId("profile-top-btn");

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
    expect(profile).toBeInTheDocument();

    expect(title).toHaveTextContent(headerDrinksMock.title);
    expect(search).toHaveAttribute("src", headerDrinksMock.search);
    expect(drink).toHaveAttribute("src", headerDrinksMock.mealIcon);
    expect(profile).toHaveAttribute("src", headerDrinksMock.profileIcon);
  });

  it("Testa se o header é renderizado no Profile", () => {
    renderWithRouter(<Header title="profile" />, {
      initialEntries: ["/profile"],
    });
    const title = screen.getByTestId("page-title");
    const search = screen.queryByTestId("search-top-btn");
    const meal = screen.queryByTestId("page-icon");
    const profile = screen.queryByTestId("profile-top-btn");

    expect(title).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    // expect(meal).not.toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(title).toHaveTextContent("profile");
  });

  it("Testa se o header é renderizado no done recipes", () => {
    renderWithRouter(<Header title="Done Recipes" />, {
      initialEntries: ["/done-recipes"],
    });
    const title = screen.getByTestId("page-title");
    const search = screen.queryByTestId("search-top-btn");
    const meal = screen.queryByTestId("page-icon");
    const profile = screen.queryByTestId("profile-top-btn");

    expect(title).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    // expect(meal).not.toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(title).toHaveTextContent("Done Recipes");
  });

  it("Testa se o header é renderizado no Favorite Recipes", () => {
    renderWithRouter(<Header title="Favorite Recipes" />, {
      initialEntries: ["/favorite-recipes"],
    });
    const title = screen.getByTestId("page-title");
    const search = screen.queryByTestId("search-top-btn");
    const meal = screen.queryByTestId("page-icon");
    const profile = screen.queryByTestId("profile-top-btn");

    expect(title).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    // expect(meal).not.toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(title).toHaveTextContent("Favorite Recipes");
  });

  it("Testa se ao clicar no botão de busca é são exibidos campos de busca", () => {
    renderWithRouter(<Header title="meals" />, {
      initialEntries: ["/meals"],
    });
    const search = screen.getByTestId("search-top-btn");

    expect(screen.queryByTestId("search-input")).not.toBeInTheDocument();
    userEvent.click(search);

    const input = screen.getByTestId("search-input");
    const ingredient = screen.getByTestId("ingredient-search-radio");
    const name = screen.getByTestId("name-search-radio");
    const firstLetter = screen.getByTestId("first-letter-search-radio");
    const searchButton = screen.getByTestId("exec-search-btn");

    expect(input).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("Testa se ao clicar no botão de perfil é redirecionado para a página de perfil", () => {
    const { history } = renderWithRouter(<Header title="meals" />, {
      initialEntries: ["/meals"],
    });
    const profile = screen.getByTestId("profile-top-btn");
    expect(history.location.pathname).toBe("/meals");
    userEvent.click(profile);
    expect(history.location.pathname).toBe("/profile");
  });
});
