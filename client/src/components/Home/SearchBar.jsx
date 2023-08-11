import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../ReduxToolKit/searchReducer";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValues] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValues(value);
    dispatch(setSearchValue(value)); // Make sure setSearchValue action returns a proper object
    // console.log("Search value:", value);
  };

  return (
    <TextField
      //   label="Search"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={searchValue}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
