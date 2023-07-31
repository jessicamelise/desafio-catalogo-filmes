import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  
  const routeChange = () =>{ 
    const path = `/`; 
    navigate(path);
  };
  
  return (
    <>
      <Box 
        component="header" 
        display="flex" 
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Hello /Nome/</Typography>
        <Button variant="contained" onClick={routeChange}>Log out</Button>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiInputBase-colorPrimary': { background: 'white' },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="search movie..."
          value=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>    
  );
};
  
export default Header;