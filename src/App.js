import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SearchProvider from "./context/SearchProvider";
import FilterProvider from "./context/FilterProvider";

function App() {
  return (
    <SearchProvider>
      <FilterProvider>
        <BrowserRouter>
          <div
            className="h-100 w-100 justify-content-center
        align-items-center d-flex flex-column position-relative"
          >
            <Routes />
          </div>
        </BrowserRouter>
      </FilterProvider>
    </SearchProvider>
  );
}

export default App;
