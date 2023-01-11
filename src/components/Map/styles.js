import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const MapContainer = styled("div")(({theme}) => ({
    height: '80vh', width: '100%', padding: '24px',
    [theme.breakpoints.up("sm")]: {
        height: '100%'
    },
}));

const StyledPaper = styled(Paper)(() => ({
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '120px', zIndex: 9, position: "relative" 
}));

export { MapContainer, StyledPaper };
