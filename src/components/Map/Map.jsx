import React, { useCallback, useRef, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { OverlayView, Marker } from "@react-google-maps/api";
import { Typography, Rating } from "@mui/material";
import { MapContainer, StyledPaper } from "./styles";

const debounce = (cb, delay = 1000) => {
    let timeout
  
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
}

function Map({
  setBounds,
  coordinates,
  places,
  setChildClicked,
  jsApiLoaded,
  jsApiLoadError
}) {
  const mapInstanceRef = useRef(null);
  const [currentPlace, setCurrentPlace] = useState(null);

  const onLoadHandler = useCallback(function onLoad(mapInstance) {
    mapInstanceRef.current = mapInstance;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onBoundsChange = useCallback(debounce(() =>{
    if (mapInstanceRef.current) {
      const ne = mapInstanceRef.current.getBounds().getNorthEast();
      const sw = mapInstanceRef.current.getBounds().getSouthWest();
      const bounds = {
        ne: { lat: ne.lat(), lng: ne.lng() },
        sw: { lat: sw.lat(), lng: sw.lng() },
      };
      console.log("bounds", bounds);
      setBounds(bounds);
      setChildClicked(null);
    }
  }), []);

  return (
    <MapContainer>
      {jsApiLoaded && Object.keys(coordinates).length > 0 && (
        <GoogleMap
          center={coordinates}
          zoom={14}
          onBoundsChanged={onBoundsChange}
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          onLoad={onLoadHandler}
        >
          {places.length &&
            places.map((place, i) => (
              <Marker
                position={{
                  lat: Number(place.latitude),
                  lng: Number(place.longitude),
                }}
                onMouseOut={() => setCurrentPlace(null)}
                onMouseOver={() => setCurrentPlace({ id: i, place })}
                onClick={() => setChildClicked(currentPlace.id)}
                key={i}
              />
            ))}
          {currentPlace && (
            <OverlayView
              position={{
                lat: Number(currentPlace.place.latitude),
                lng: Number(currentPlace.place.longitude),
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <StyledPaper elevation={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {currentPlace.place.name}
                </Typography>
                <img
                  style={{ cursor: "pointer" }}
                  alt={currentPlace.place.name}
                  src={
                    currentPlace.place.photo
                      ? currentPlace.place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(currentPlace.place.rating)}
                  readOnly
                />
              </StyledPaper>
            </OverlayView>
          )}
        </GoogleMap>
      )}
      {jsApiLoadError && (<div>Map cannot be loaded right now, sorry.</div>)}
    </MapContainer>
  );
}

export default Map;
