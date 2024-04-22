import React from "react";
import Router from "react-router";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./RenderWithRouter";
import FavDoneRecipes from "../pages/FavDoneRecipes";
import { mealsMock } from "./mocks/meals";
import { favoriteRecipesMock } from "./mocks/favoriteRecipesMock";
import { doneRecipesMock } from "./mocks/doneRecipesMock";

describe("Testando o componente FavoriteDoneRecipes", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: mealsMock,
      }),
    });
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "52771" });

    jest.spyOn(localStorage, "getItem");
    localStorage.getItem = jest.fn();

    jest.spyOn(localStorage, "setItem");
    localStorage.setItem = jest.fn();

    localStorage.setItem(
      "favoriteRecipes",
      JSON.stringify(favoriteRecipesMock),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("Testando favorite Recipes", () => {
    it("Testa se ao entrar na rota o as receitas são renderizadas", async () => {
      await act(async () => {
        renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/favorite-recipes"],
        });
      });
      const recipeImage = screen.getByTestId("0-horizontal-image");
      const recipecategory = screen.getByTestId("0-horizontal-top-text");
      const recipeName = screen.getByTestId("0-horizontal-name");
      const recipeTag = screen.queryByTestId("0-0-horizontal-tag");

      expect(recipeImage).toBeInTheDocument();
      expect(recipecategory).toBeInTheDocument();
      expect(recipeName).toBeInTheDocument();
      expect(recipeTag).not.toBeInTheDocument();
    });

    it("Testa se ao clicar na imagem ou no nome é redirecionado para tela de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/favorite-recipes"],
        });
      });
      const { history } = component;
      const recipeImage = screen.getByTestId("0-horizontal-image");
      const recipeName = screen.getByTestId("0-horizontal-name");

      await act(async () => {
        recipeImage.click();
      });

      expect(history.location.pathname).toBe("/meals/53065");

      await act(async () => {
        recipeName.click();
      });

      expect(history.location.pathname).toBe("/meals/53065");
    });

    it("Testa se ao clicar no botão de favoritar a receita é removida dos favoritos", async () => {
      await act(async () => {
        renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/favorite-recipes"],
        });
      });

      const storage = JSON.parse(localStorage.getItem("favoriteRecipes"));
      const button = screen.getByTestId("0-horizontal-favorite-btn");

      await act(async () => {
        button.click();
      });

      const newStorage = JSON.parse(localStorage.getItem("favoriteRecipes"));
      expect(newStorage).not.toEqual(storage);
    });

    it("Testa os botões de filto", async () => {
      await act(async () => {
        renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/favorite-recipes"],
        });
      });

      let zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      let oneRecipeImage = screen.getByTestId("1-horizontal-image");
      let twoRecipeImage = screen.getByTestId("2-horizontal-image");
      let threeRecipeImage = screen.getByTestId("3-horizontal-image");
      let fourRecipeImage = screen.queryByTestId("4-horizontal-image");

      const allButton = screen.getByTestId("filter-by-all-btn");
      const mealButton = screen.getByTestId("filter-by-meal-btn");
      const drinkButton = screen.getByTestId("filter-by-drink-btn");

      await act(async () => {
        userEvent.click(mealButton);
      });

      zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      oneRecipeImage = screen.getByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");
      fourRecipeImage = screen.queryByTestId("4-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).toBeInTheDocument();
      expect(twoRecipeImage).toBeInTheDocument();
      expect(threeRecipeImage).not.toBeInTheDocument();

      await act(async () => {
        userEvent.click(drinkButton);
      });

      zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      oneRecipeImage = screen.queryByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");
      fourRecipeImage = screen.queryByTestId("4-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).toBeInTheDocument();
      expect(twoRecipeImage).not.toBeInTheDocument();
      expect(threeRecipeImage).not.toBeInTheDocument();

      await act(async () => {
        userEvent.click(allButton);
      });

      zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      oneRecipeImage = screen.queryByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).toBeInTheDocument();
      expect(twoRecipeImage).toBeInTheDocument();
      expect(threeRecipeImage).toBeInTheDocument();
    });
  });

  describe("Testa o done-recipes", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: mealsMock,
        }),
      });
      jest.spyOn(Router, "useParams").mockReturnValue({ id: "52771" });

      jest.spyOn(localStorage, "getItem");
      localStorage.getItem = jest.fn();

      jest.spyOn(localStorage, "setItem");
      localStorage.setItem = jest.fn();

      localStorage.setItem("doneRecipes", JSON.stringify(doneRecipesMock));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("Testa se ao entrar na rota o as receitas são renderizadas", async () => {
      await act(async () => {
        renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/done-recipes"],
        });
      });

      const recipeImage = screen.getByTestId("0-horizontal-image");
      const recipecategory = screen.getByTestId("0-horizontal-top-text");
      const recipeName = screen.getByTestId("0-horizontal-name");
      const recipeTag = screen.queryByTestId("0-0-horizontal-tag");
      const recipeDoneDate = screen.queryByTestId("0-horizontal-done-date");

      expect(recipeImage).toBeInTheDocument();
      expect(recipecategory).toBeInTheDocument();
      expect(recipeName).toBeInTheDocument();
      expect(recipeTag).not.toBeInTheDocument();
      expect(recipeDoneDate).toBeInTheDocument();
    });

    it("Testa se ao clicar na imagem ou no nome é redirecionado para tela de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/done-recipes"],
        });
      });
      const { history } = component;
      const recipeImage = screen.getByTestId("1-horizontal-image");
      const recipeName = screen.getByTestId("1-horizontal-name");

      await act(async () => {
        recipeImage.click();
      });

      expect(history.location.pathname).toBe("/drinks/17222");

      await act(async () => {
        recipeName.click();
      });

      expect(history.location.pathname).toBe("/drinks/17222");
    });

    it("Testa os botões de filto", async () => {
      await act(async () => {
        renderWithRouter(<FavDoneRecipes />, {
          initialEntries: ["/done-recipes"],
        });
      });

      let zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      let oneRecipeImage = screen.getByTestId("1-horizontal-image");
      let twoRecipeImage = screen.getByTestId("2-horizontal-image");
      let threeRecipeImage = screen.getByTestId("3-horizontal-image");

      const allButton = screen.getByTestId("filter-by-all-btn");
      const mealButton = screen.getByTestId("filter-by-meal-btn");
      const drinkButton = screen.getByTestId("filter-by-drink-btn");

      await act(async () => {
        userEvent.click(mealButton);
      });

      zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      oneRecipeImage = screen.getByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).toBeInTheDocument();
      expect(twoRecipeImage).toBeInTheDocument();
      expect(threeRecipeImage).not.toBeInTheDocument();

      await act(async () => {
        userEvent.click(drinkButton);
      });

      zeroRecipeImage = screen.queryByTestId("0-horizontal-image");
      oneRecipeImage = screen.queryByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).not.toBeInTheDocument();
      expect(twoRecipeImage).not.toBeInTheDocument();
      expect(threeRecipeImage).not.toBeInTheDocument();

      await act(async () => {
        userEvent.click(allButton);
      });

      zeroRecipeImage = screen.getByTestId("0-horizontal-image");
      oneRecipeImage = screen.queryByTestId("1-horizontal-image");
      twoRecipeImage = screen.queryByTestId("2-horizontal-image");
      threeRecipeImage = screen.queryByTestId("3-horizontal-image");

      expect(zeroRecipeImage).toBeInTheDocument();
      expect(oneRecipeImage).toBeInTheDocument();
      expect(twoRecipeImage).toBeInTheDocument();
      expect(threeRecipeImage).toBeInTheDocument();
    });
  });
});
