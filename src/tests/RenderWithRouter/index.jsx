import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchProvider from "../../context/SearchProvider";
import FilterProvider from "../../context/FilterProvider";

function withRouter(component, history) {
  return (
    <Router history={history}>
      <>
        <SearchProvider>
          <FilterProvider>
            <div>{component}</div>
          </FilterProvider>
        </SearchProvider>
      </>
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ["/"],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
