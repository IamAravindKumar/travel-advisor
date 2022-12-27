import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Box } from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  TitleContent,
} from "./styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Header({ setCoordinates }) {
  const [autoComplete, setAutoComplete] = useState(null);
  const onLoadHandler = (autoCompleteRef) => setAutoComplete(autoCompleteRef);
  const onPlaceChangedHandler = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <TitleContent variant="h5">Travel Advisor</TitleContent>
        <Box display="flex" alignItems="center">
          <TitleContent variant="h6">Explore new places</TitleContent>
          <Autocomplete
            onLoad={onLoadHandler}
            onPlaceChanged={onPlaceChangedHandler}
          >
            <Search>
              <SearchIconWrapper>
                <SearchOutlinedIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..." />
            </Search>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
