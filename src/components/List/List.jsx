import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { StyledContainer, StyledFormControl, StyledLoader } from "./styles";

function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = places.map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <StyledContainer>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <StyledLoader>
          <CircularProgress size="5rem"/>
        </StyledLoader>
      ) : (
        <>
          <StyledFormControl>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </StyledFormControl>
          <Grid
            container
            spacing={3}
            sx={{ height: "calc(100% - 140px)", overflow: "auto" }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </StyledContainer>
  );
}

export default List;
