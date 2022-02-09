import React from 'react';
import "../components/css/search.css";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC<any> = ({ keyword, setKeyword }) => {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder="" />
      <div>{<FiSearch />}</div>
    </div>
  );
}

export default SearchBar