import { useState, createContext } from "react";

const FilterContext = createContext();
// eslint-disable-next-line
function FilterProvider({ children }) {
  const [sort, setSort] = useState("");
  const [fKey, setFKey] = useState("");
  const [navbar, setNavbar] = useState(false);

  const valueProvide = {
    sort,
    setSort,
    fKey,
    setFKey,
    navbar,
    setNavbar,
  };
  return <FilterContext.Provider value={valueProvide}>{children}</FilterContext.Provider>;
}

export { FilterContext, FilterProvider };
