import { act, screen } from "@testing-library/react";
import React from "react";
import RecipeDetails from "../pages/RecipeDetails";
import { mealsMock } from "./mocks/meals";
import { renderWithRouter } from "./RenderWithRouter";
import Router from "react-router";
import { doneRecipesMock } from "./mocks/doneRecipesMock";
import { inProgressMock, inProgressMock2 } from "./mocks/inProgressMock";
import userEvent from "@testing-library/user-event";
import { favoriteRecipesMock } from "./mocks/favoriteRecipesMock";
import { drinksMock } from "./mocks/drinksMock";

describe("Testa o RecipeDetails", () => {
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
      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const recipePhoto = screen.getByTestId("recipe-photo");
      const shareButton = screen.getByTestId("share-btn");
      const favoriteButton = screen.getByTestId("favorite-btn");
      const recipeTitle = screen.getByTestId("recipe-title");
      const recipeCategory = screen.getByTestId("recipe-category");

      expect(recipePhoto).toBeInTheDocument();
      expect(shareButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771",
      );
      expect(
        screen.getByTestId("0-ingredient-name-and-measure"),
      ).toBeInTheDocument();
    });

    it("Testa a receita concluida", async () => {
      localStorage.setItem("doneRecipes", JSON.stringify(doneRecipesMock));

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const startRecipeButton = screen.queryByTestId("start-recipe-btn");

      expect(startRecipeButton).not.toBeInTheDocument();
    });

    it("Testa a receita não concluida", async () => {
      localStorage.setItem("doneRecipes", JSON.stringify([]));

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const startRecipeButton = screen.getByTestId("start-recipe-btn");

      expect(startRecipeButton).toBeInTheDocument();
    });

    it("Testa receitas em progresso", async () => {
      localStorage.setItem("inProgressRecipes", JSON.stringify(inProgressMock));

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const startRecipeButton = screen.queryByTestId("start-recipe-btn");

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent("Continue Recipe");
    });

    it("Testa receitas em progresso sem a receita especificada", async () => {
      localStorage.setItem(
        "inProgressRecipes",
        JSON.stringify(inProgressMock2),
      );

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const startRecipeButton = screen.queryByTestId("start-recipe-btn");

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent("start recipe");
    });

    it("Testa o botão de favoritar", async () => {
      localStorage.setItem("favoriteRecipes", JSON.stringify([]));

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const favoriteButton = screen.getByTestId("favorite-btn");

      expect(favoriteButton).toBeInTheDocument();

      await act(async () => {
        userEvent.click(favoriteButton);
      });

      const storage = JSON.parse(localStorage.getItem("favoriteRecipes"));

      expect(storage).toHaveLength(1);

      await act(async () => {
        userEvent.click(favoriteButton);
      });
      expect(localStorage.getItem("favoriteRecipes")).toBe("[]");
    });

    it("Testa se ao iniciar e a receita existir o icone do botão ficara marcado", async () => {
      localStorage.setItem(
        "favoriteRecipes",
        JSON.stringify(favoriteRecipesMock),
      );

      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/meals/52771"],
        });
      });

      const favoriteButton = screen.getByTestId("favorite-btn");

      expect(favoriteButton).toBeInTheDocument();
      expect(favoriteButton).toHaveAttribute("src", "blackHeartIcon.svg");
    });
  });

  describe("Testa usando a rota /drinks", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: drinksMock,
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

    it("Testa favovoritar uma bebida", async () => {
      localStorage.setItem("favoriteRecipes", JSON.stringify([]));
      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/drinks/15997"],
        });
      });

      const favoriteButton = screen.getByTestId("favorite-btn");

      expect(favoriteButton).toBeInTheDocument();

      await act(async () => {
        userEvent.click(favoriteButton);
      });

      const storage = JSON.parse(localStorage.getItem("favoriteRecipes"));

      expect(storage).toHaveLength(1);

      await act(async () => {
        userEvent.click(favoriteButton);
      });

      expect(localStorage.getItem("favoriteRecipes")).toBe("[]");
    });

    it("Testa se não tiver categoria ao clicar no botão de favoritar", async () => {
      localStorage.setItem("favoriteRecipes", JSON.stringify([]));
      const newDrink = [{ ...drinksMock[0], strCategory: "" }];
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          drinks: newDrink,
        }),
      });
      await act(async () => {
        renderWithRouter(<RecipeDetails />, {
          initialEntries: ["/drinks/15997"],
        });
      });

      const favoriteButton = screen.getByTestId("favorite-btn");

      expect(favoriteButton).toBeInTheDocument();

      await act(async () => {
        userEvent.click(favoriteButton);
      });
    });
  });
});
