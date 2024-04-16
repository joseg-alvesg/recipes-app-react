import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import SearchContext from "./SearchContext";

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);

  const value = useMemo(
    () => ({ searchBar, setSearchBar }),
    [searchBar, setSearchBar],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
