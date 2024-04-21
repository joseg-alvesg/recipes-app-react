import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SearchBar from "../components/SearchBar";
import { renderWithRouter } from "./RenderWithRouter";

describe("Testando o componente SearchBar", () => {
  describe("Testa usando a rota /meals", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({ meals: [] }),
      });
      jest.spyOn(global, "alert").mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa se ao fazer uma busca por nome um fetch é feito", async () => {
      renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });
      const input = screen.getByTestId("search-input");
      const ingredient = screen.getByTestId("ingredient-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "chicken");
        userEvent.click(ingredient);
        userEvent.click(button);
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken",
        ),
      );
    });

    it("Testa se ao fazer uma busca por primeira letra um fetch é feito", async () => {
      renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });

      const input = screen.getByTestId("search-input");
      const firstLetter = screen.getByTestId("first-letter-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "a");
        userEvent.click(firstLetter);
        userEvent.click(button);
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a",
        ),
      );
    });

    it("Testa se ao fazer uma busca por name um fetch é feito", async () => {
      renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });

      const input = screen.getByTestId("search-input");
      const name = screen.getByTestId("name-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "margarita");
        userEvent.click(name);
        userEvent.click(button);
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=margarita",
        ),
      );
    });

    it("Testa se ao passar mais de uma letra para first letter um global.alert é exibido", async () => {
      renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });

      const input = screen.getByTestId("search-input");
      const firstLetter = screen.getByTestId("first-letter-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "ab");
        userEvent.click(firstLetter);
        userEvent.click(button);
      });

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith(
        "Your search must have only 1 (one) character",
      );
    });

    it("Testa se o retorno de uma busca for vazio um alert é exibido", async () => {
      renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });

      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({ meals: null }),
      });
      const input = screen.getByTestId("search-input");
      const name = screen.getByTestId("name-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      await act(async () => {
        userEvent.type(input, "sopa de madeira");
        userEvent.click(name);
        userEvent.click(button);
      });

      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(
        "Sorry, we haven't found any recipes for these filters.",
      );
    });

    it("Testa se uma unica receita for encontrada é redirecionado para a página de detalhes", async () => {
      const { history } = renderWithRouter(<SearchBar />, {
        initialEntries: ["/meals"],
      });

      const input = screen.getByTestId("search-input");
      const firstLetter = screen.getByTestId("first-letter-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: [
            {
              idMeal: "52771",
              strMeal: "Spicy Arrabiata Penne",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
            },
          ],
        }),
      });

      jest.spyOn(history, "push");

      await act(async () => {
        userEvent.type(input, "a");
        userEvent.click(firstLetter);
        userEvent.click(button);
      });

      expect(global.alert).not.toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a",
        ),
      );

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe("/meals/52771");
    });
  });

  describe("Testa usando a rota /drinks", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({ drinks: [] }),
      });
      jest.spyOn(global, "alert").mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Testa se uma unica receita for encontrada é redirecionado para a página de detalhes", async () => {
      const { history } = renderWithRouter(<SearchBar />, {
        initialEntries: ["/drinks"],
      });

      const input = screen.getByTestId("search-input");
      const firstLetter = screen.getByTestId("first-letter-search-radio");
      const button = screen.getByTestId("exec-search-btn");

      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          meals: [
            {
              idDrink: "17222",
              strDrink: "A1",
              strDrinkThumb:
                "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
            },
          ],
        }),
      });

      jest.spyOn(history, "push");

      await act(async () => {
        userEvent.type(input, "a");
        userEvent.click(firstLetter);
        userEvent.click(button);
      });

      expect(global.alert).not.toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a",
        ),
      );

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe("/drinks/17222");
    });
  });
});
