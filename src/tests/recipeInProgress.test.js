import { act, screen } from "@testing-library/react";
import React from "react";
import Router from "react-router";
import RecipeInProgress from "../pages/RecipeInProgress";
import { drinksMock } from "./mocks/drinksMock";
import { inProgressMock, inProgressMock2 } from "./mocks/inProgressMock";
import { mealsMock } from "./mocks/meals";
import { renderWithRouter } from "./RenderWithRouter";

describe("Testa o RecipeInProgress", () => {
  describe("Testa usando a rota /meals", () => {
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
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa se ao entrar na rota /meals a receita é renderizada", async () => {
      localStorage.setItem("inProgressRecipes", JSON.stringify(inProgressMock));
      await act(async () => {
        renderWithRouter(<RecipeInProgress />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const recipePhoto = screen.getByTestId("recipe-photo");
      const recipeTitle = screen.getByTestId("recipe-title");
      const recipeCategory = screen.getByTestId("recipe-category");
      const recipeInstructions = screen.getByTestId("instructions");
      const recipeIngredients = screen.getByTestId("0-ingredient-step");

      expect(recipePhoto).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeInstructions).toBeInTheDocument();
      expect(recipeIngredients).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771",
      );
    });
    it("Testa se ao entrar na rota /meals a receita é renderizada sem o item especificado", async () => {
      localStorage.setItem("inProgressRecipes", JSON.stringify([]));
      await act(async () => {
        renderWithRouter(<RecipeInProgress />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const recipePhoto = screen.getByTestId("recipe-photo");
      const recipeTitle = screen.getByTestId("recipe-title");
      const recipeCategory = screen.getByTestId("recipe-category");
      const recipeInstructions = screen.getByTestId("instructions");
      const recipeIngredients = screen.getByTestId("0-ingredient-step");

      expect(recipePhoto).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeInstructions).toBeInTheDocument();
      expect(recipeIngredients).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771",
      );
    });

    it("Testa se ao clicar no checkbox o item é riscado", async () => {
      await act(async () => {
        renderWithRouter(<RecipeInProgress />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const recipeIngredientsLabel = screen.getByTestId("0-ingredient-step");
      const recipeIngredientsInput =
        screen.getByTestId("0-ingredient-step").firstChild;

      await act(async () => {
        recipeIngredientsInput.click();
      });

      expect(recipeIngredientsLabel.style.textDecoration).toBe(
        "line-through solid rgb(0, 0, 0)",
      );
    });

    it("Testa o finish recipe button", async () => {
      localStorage.setItem(
        "inProgressRecipes",
        JSON.stringify(inProgressMock2),
      );
      let component;
      await act(async () => {
        component = renderWithRouter(<RecipeInProgress />, {
          initialEntries: ["/meals/52771/in-progress"],
        });
      });

      const { history } = component;
      jest.spyOn(history, "push");

      expect(localStorage.getItem("inProgressRecipes").length).toBe(754);

      const finishRecipeButton = screen.getByTestId("finish-recipe-btn");
      const recipeInputs = screen.getAllByRole("checkbox");

      await act(async () => {
        recipeInputs.forEach((input) => {
          input.click();
        });
      });
      expect(finishRecipeButton.disabled).toBe(false);

      await act(async () => {
        finishRecipeButton.click();
      });
      const storageLength = localStorage.getItem("inProgressRecipes").length;
      expect(storageLength).toBe(1098);
    });
  });

  describe("Testa usando a rota /drinks", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: drinksMock,
        }),
      });
      jest.spyOn(Router, "useParams").mockReturnValue({ id: "17222" });

      jest.spyOn(localStorage, "getItem");
      localStorage.getItem = jest.fn();

      jest.spyOn(localStorage, "setItem");
      localStorage.setItem = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa o finish recipe button", async () => {
      localStorage.setItem(
        "inProgressRecipes",
        JSON.stringify(inProgressMock2),
      );
      let component;
      await act(async () => {
        component = renderWithRouter(<RecipeInProgress />, {
          initialEntries: ["/meals/17222/in-progress"],
        });
      });

      const { history } = component;
      jest.spyOn(history, "push");

      expect(localStorage.getItem("inProgressRecipes").length).toBe(754);

      const finishRecipeButton = screen.getByTestId("finish-recipe-btn");
      const recipeInputs = screen.getAllByRole("checkbox");

      await act(async () => {
        recipeInputs.forEach((input) => {
          input.click();
        });
      });
      expect(finishRecipeButton.disabled).toBe(false);

      await act(async () => {
        finishRecipeButton.click();
      });
      const storageLength = localStorage.getItem("inProgressRecipes").length;
      expect(storageLength).toBe(878);
    });
  });
});
