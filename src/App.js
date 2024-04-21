import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchProvider from './context/SearchProvider';
import FilterProvider from './context/FilterContext';

function App() {
  return (
    <SearchProvider>
      <FilterProvider>
        <BrowserRouter>
          <main
            className="h-100 w-100 justify-content-center
        align-items-center d-flex flex-column position-relative"
          >
            {/* <a href="https://www.flaticon.com/free-icons/recipe" title="recipe icons">Recipe icons created by Freepik - Flaticon</a> */}
            <Routes />
          </main>
        </BrowserRouter>
      </FilterProvider>
    </SearchProvider>
  );
}

export default App;
