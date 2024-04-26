import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';
import AlertCard from '../AlertCard';

export default function SearchBar() {
  const {
    searchText,
    setSearchText,
    filterType,
    setFilterType,
    searchRecipes,
    setAlertCall,
  } = useContext(SearchContext);
  const history = useHistory();

  const handleSearch = async () => {
    if (filterType === 'first-letter' && searchText.length !== 1) {
      setAlertCall({ error: 'Your search must have only 1 (one) character' });
      return;
    }
    const route = history.location.pathname;
    const res = await searchRecipes(route, filterType, searchText);
    if (!res) {
      setAlertCall({
        error: 'Sorry, we haven\'t found any recipes for these filters.',
      });
      return;
    }
    if (res && res.length === 1) {
      const id = res[0].idMeal || res[0].idDrink;
      history.push(`${route}/${id}`);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'option') {
      setFilterType(e.target.value);
      setSearchText('');
    }
    if (e.target.type === 'text') setSearchText(e.target.value);
  };
  return (
    <form
      className="d-flex flex-column align-items-center w-75 indigo-light-bg rounded-3"
      onSubmit={ (e) => e.preventDefault() }
    >
      <div className="d-flex flex-column align-items-center w-100 form-group">
        <div className="input-group">
          <input
            type="text"
            className="form-control w-25"
            data-testid="search-input"
            onChange={ (e) => handleChange(e) }
            value={ searchText }
          />
          <select
            className="form-select"
            name="option"
            onChange={ (e) => handleChange(e) }
          >
            <option value="name">name</option>
            <option value="ingredient">ingredient</option>
            <option value="first-letter">first letter</option>
          </select>
        </div>
      </div>
      <div className="mt-2 ms-1 me-1 fw-bold text-light" />
      <button
        type="button"
        className="fs-5 mikado-yellow-bg rounder rounded-3 mt-1 p-2 w-50 text-center mb-2
        point border-0"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
      <AlertCard />
    </form>
  );
}
