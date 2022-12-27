import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px'
}));


const StyledContainer = styled("div")(({ theme }) => ({
    padding: '25px',
    height: '100%',
    overflow: 'hidden'
}));

const StyledLoader = styled("div")(() => ({
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
}));

export { StyledContainer, StyledFormControl, StyledLoader };
