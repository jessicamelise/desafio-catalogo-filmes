import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

interface HeaderProps {
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSearch: () => void;
  search: string;
};

const Header = (props: HeaderProps) => {
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
          value={props.search}
          onChange={props.handleChangeSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search onClick={props.handleClickSearch} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>    
  );
};
  
export default Header;