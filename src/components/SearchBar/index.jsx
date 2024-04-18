import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';

export default function SearchBar() {
  const {
    searchText,
    setSearchText,
    filterType,
    setFilterType,
    searchRecipes,
  } = useContext(SearchContext);
  const history = useHistory();

  const handleSearch = async () => {
    if (!searchText) return;
    if (filterType === 'first-letter' && searchText.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const route = history.location.pathname;
    const res = await searchRecipes(route, filterType, searchText);
    console.log(res);
    if (!res) {
      console.log('no data');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (res && res.length === 1) {
      const id = res[0].idMeal || data[0].idDrink;
      history.push(`${route}/${id}`);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'radio') setFilterType(e.target.value);
    if (e.target.type === 'text') setSearchText(e.target.value);
  };
  return (
    <form className="">
      <input
        type="text"
        className="form-control"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <label className="form-label">
        <input
          type="radio"
          name="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ (e) => handleChange(e) }
          checked={ filterType === 'ingredient' }
        />
        ingredient
      </label>

      <label className="form-label">
        <input
          type="radio"
          name="name"
          value="name"
          data-testid="name-search-radio"
          onChange={ (e) => handleChange(e) }
          checked={ filterType === 'name' }
        />
        name
      </label>
      <label className="form-label">
        <input
          type="radio"
          name="first-letter"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ (e) => handleChange(e) }
          checked={ filterType === 'first-letter' }
        />
        first letter
      </label>
      <button
        type="button"
        className="btn"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </form>
  );
}
