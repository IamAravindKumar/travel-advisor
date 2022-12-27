import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const MapContainer = styled("div")(({theme}) => ({
    height: '80vh', width: '100%', padding: '24px',
    [theme.breakpoints.up("sm")]: {
        height: '100%'
    },
}));

const StyledPaper = styled(Paper)(() => ({
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '120px'
}));

const MarkerContainer = styled("div")(() => ({
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 }
}));

export { MapContainer, StyledPaper, MarkerContainer };
