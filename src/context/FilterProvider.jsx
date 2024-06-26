import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('All');

  const value = useMemo(
    () => ({
      recipes,
      setRecipes,
      filter,
      setFilter,
    }),
    [recipes, setRecipes, filter, setFilter],
  );

  return (
    <FilterContext.Provider value={ value }>{children}</FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
