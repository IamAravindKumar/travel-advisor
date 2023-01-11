import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { getPlacesData } from "./api";

import "./App.css";

const librariesList = ["places"];
function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: librariesList
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.length > 0 ? places.filter((place) => Number(place.rating) >= rating) : [];
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        setPlaces(data ? data.filter((place) => place.name && place.num_reviews > 0) : []);
        setIsLoading(false);
      });
    }
  }, [coordinates, bounds, type]);

  return (
    <div className="App">
      <CssBaseline />
      <Header setCoordinates={setCoordinates} jsApiLoaded={isLoaded} />
      <Grid
        container
        spacing={3}
        style={{ width: "100%", height: "calc(100% - 44px)" }}
      >
        <Grid item xs={12} md={4} sx={{ height: "100%" }}>
          <List
            places={filteredPlaces}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces}
            setChildClicked={setChildClicked}
            jsApiLoaded={isLoaded}
            jsApiLoadError={loadError}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
