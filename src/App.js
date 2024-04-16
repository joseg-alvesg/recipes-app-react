import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <main
        className="h-100 w-100 justify-content-center
        align-items-center d-flex flex-column"
      >
        {/* <a href="https://www.flaticon.com/free-icons/recipe" title="recipe icons">Recipe icons created by Freepik - Flaticon</a> */}
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
