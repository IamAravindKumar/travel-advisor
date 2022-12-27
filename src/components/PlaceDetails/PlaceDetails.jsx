import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Rating,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

function PlaceDetails({ place, selected, refProp }) {
  if (selected){
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Card elevation={6}>
      <CardMedia
        sx={{ height: "350px" }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant={"subtitle1"}>
            Out of {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, index) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} alt={`award_${index}`} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        <Stack direction="row" spacing={1} my={1} sx={{ flexWrap: "wrap" }}>
          {place?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              sx={{ margin: "4px !important" }}
            />
          ))}
        </Stack>
        {place.address && (
          <Box display="flex" alignItems="center" my={2}>
            <LocationOnIcon />
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              marginLeft={"8px"}
            >
              {place.address}
            </Typography>
          </Box>
        )}
        {place.phone && (
          <Box display="flex" alignItems="center" my={2}>
            <PhoneIcon />
            <Typography
              variant="body2"
              color="textSecondary"
              marginLeft={"8px"}
            >
              {place.phone}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent={"flex-end"} width={"100%"}>
          <Button
            size="small"
            onClick={() => window.open(place.web_url, "_blank")}
            variant="outlined"
            startIcon={<TravelExploreIcon />}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            onClick={() => window.open(place.website, "_blank")}
            variant="contained"
            sx={{ marginLeft: "8px" }}
            startIcon={<PublicIcon />}
          >
            Website
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default PlaceDetails;
