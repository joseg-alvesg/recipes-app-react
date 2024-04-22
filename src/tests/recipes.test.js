import React from "react";
import { renderWithRouter } from "./RenderWithRouter";
import Recipes from "../pages/Recipes";
import Header from "../components/Header";
import { act, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";
import { mealsMock } from "./mocks/meals";
import { drinksMock } from "./mocks/drinksMock";
import { categoryMock, drinkCategoryMock } from "./mocks/categoryMock";

describe("Testando o componente Recipes", () => {
  describe("Testa renderização do /meals", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: mealsMock,
        }),
      });
      jest.spyOn(global, "alert").mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa se ao entrar na rota /meals as comidas são renderizadas", async () => {
      await act(async () => {
        renderWithRouter(<Recipes />);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(screen.getByTestId("0-recipe-card")).toBeInTheDocument();
    });

    it("Testa se ao fazer uma busca por nome um fetch é feito", async () => {
      await act(async () => {
        renderWithRouter(
          <>
            <SearchBar />
            <Recipes />
          </>,
          {
            initialEntries: ["/meals"],
          },
        );
      });
      const input = screen.getByTestId("search-input");
      const ingredient = screen.getByTestId("ingredient-search-radio");
      const button = screen.getByTestId("exec-search-btn");
      await act(async () => {
        userEvent.type(input, "chicken");
        userEvent.click(ingredient);
        userEvent.click(button);
      });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken",
        ),
      );
    });

    it("Testa se ao clicar no elemento é redirecionado para pagina de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<Recipes />, {
          initialEntries: ["/meals"],
        });
      });

      const recipeCard = screen.getByTestId("0-card-img");

      await act(async () => {
        userEvent.click(recipeCard);
      });
      expect(component.history.location.pathname).toBe("/meals/52977");
    });

    it("Testa se ao pressionar enter é redirecionado para tela de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<Recipes />, {
          initialEntries: ["/meals"],
        });
      });
      const history = component.history;

      const recipeCard = screen.getByTestId("0-card-img");

      jest.spyOn(history, "push");

      await act(async () => {
        userEvent.type(recipeCard, "{enter}");
      });

      expect(history.push).toHaveBeenCalledTimes(2);
      expect(history.push).toHaveBeenCalledWith("/meals/52977");
      expect(history.location.pathname).toBe("/meals/52977");
    });

    it("Testa os botões de paginação", async () => {
      await act(async () => {
        renderWithRouter(<Recipes />);
      });

      const nextButton = screen.getByTestId("next");
      const prevButton = screen.getByTestId("previous");
      const getSecondPage = screen.getByTestId("2-pagination");

      await act(async () => {
        userEvent.click(nextButton);
      });

      expect(screen.getByTestId("0-recipe-card")).toBeInTheDocument();

      await act(async () => {
        userEvent.click(prevButton);
      });

      expect(screen.getByTestId("0-recipe-card")).toBeInTheDocument();

      await act(async () => {
        userEvent.click(getSecondPage);
      });

      expect(screen.getByTestId("0-recipe-card")).toBeInTheDocument();
    });

    it("Testa se os elementos de categoria são renderizados", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: categoryMock,
        }),
      });
      await act(async () => {
        renderWithRouter(
          <>
            <Header title="meals" />
          </>,
          {
            initialEntries: ["/meals"],
          },
        );
      });

      const category = screen.getByTestId("Beef-category-filter");

      expect(category).toBeInTheDocument();
    });

    it("Testa se ao clicar em uma categoria é feito um fetch", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: categoryMock,
        }),
      });
      await act(async () => {
        renderWithRouter(<Header title="meals" />, {
          initialEntries: ["/meals"],
        });
      });
      const category = screen.getByTestId("Beef-category-filter");
      const all = screen.getByTestId("All-category-filter");
      await act(async () => {
        userEvent.click(category);
      });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
      );

      await act(async () => {
        userEvent.click(category);
      });
      expect(fetch).toHaveBeenCalledTimes(3);

      await act(async () => {
        userEvent.click(all);
      });

      expect(fetch).toHaveBeenCalledTimes(4);
    });
  });

  describe("Testa renderização do /drinks", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          drinks: drinksMock,
        }),
      });
      jest.spyOn(global, "alert").mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa se ao entrar na rota /drinks as bebidas são renderizadas", async () => {
      await act(async () => {
        renderWithRouter(<Recipes />, {
          initialEntries: ["/drinks"],
        });
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("0-recipe-card")).toBeInTheDocument();
    });

    it("Testa se ao fazer uma busca por nome um fetch é feito", async () => {
      await act(async () => {
        renderWithRouter(
          <>
            <SearchBar />
            <Recipes />
          </>,
          {
            initialEntries: ["/drinks"],
          },
        );
      });
      const input = screen.getByTestId("search-input");
      const ingredient = screen.getByTestId("ingredient-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "margarita");
        userEvent.click(ingredient);
        userEvent.click(button);
      });

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=",
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=margarita",
        ),
      );
    });

    it("Testa se ao clicar no elemento é redirecionado para pagina de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<Recipes />, {
          initialEntries: ["/drinks"],
        });
      });
      const recipeCard = screen.getByTestId("0-card-img");
      const history = component.history;
      jest.spyOn(history, "push");
      await act(async () => {
        userEvent.click(recipeCard);
      });
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith("/drinks/17222");
      expect(component.history.location.pathname).toBe("/drinks/17222");
    });

    it("Testa se ao pressionar enter é redirecionado para tela de detalhes", async () => {
      let component;
      await act(async () => {
        component = renderWithRouter(<Recipes />, {
          initialEntries: ["/drinks"],
        });
      });
      const recipeCard = screen.getByTestId("0-card-img");
      const history = component.history;
      jest.spyOn(history, "push");
      await act(async () => {
        userEvent.type(recipeCard, "{enter}");
      });
      expect(history.push).toHaveBeenCalledTimes(2);
      expect(history.push).toHaveBeenCalledWith("/drinks/17222");
      expect(component.history.location.pathname).toBe("/drinks/17222");
    });

    it("Testa se ao clicar em uma categoria é feito um fetch", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: drinkCategoryMock,
        }),
      });
      await act(async () => {
        renderWithRouter(<Header title="meals" />, {
          initialEntries: ["/drinks"],
        });
      });
      const category = screen.getByTestId("Ordinary Drink-category-filter");
      const all = screen.getByTestId("All-category-filter");
      await act(async () => {
        userEvent.click(category);
      });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink",
      );

      await act(async () => {
        userEvent.click(category);
      });
      expect(fetch).toHaveBeenCalledTimes(3);

      await act(async () => {
        userEvent.click(all);
      });

      expect(fetch).toHaveBeenCalledTimes(4);
    });
  });
});
