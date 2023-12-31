import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo/Logo";
import { FormLogin } from "../models/home";

const Home = (): React.ReactElement => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:800px)');
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: '',
  });
  const boxAttr = {
    root: {
      matches: {
        alignItems: 'center',
      },
      notMatches: {
        flexDirection: 'column',
      },
    },
    img: {
      matches: {
        width: '60%'
      },
      notMatches: {
        height: '50%',
        display: 'flex',
      },
    },
    form: {
      matches: {
        width: '40%',
      },
      notMatches: {
        height: '50%',
      },
    },
  };

  const routeChange = (): void => { 
    let path = `films`; 
    navigate(path);
  };

  const handleChangeFormLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;

    setFormLogin({
      ...formLogin,
      [e.target.name]: value,
    });
  };
  
  return (
    <Box 
      display="flex"
      width="100%"
      height="100%"
      textAlign="center"
      sx={matches ? boxAttr.root.matches : boxAttr.root.notMatches}
    >
      <Box alignSelf="center" sx={matches ? boxAttr.img.matches : boxAttr.img.notMatches}>
        <Logo />
      </Box>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap="10px"
        sx={{
          '& .MuiInputBase-colorPrimary': { background: 'white' },
          ...matches ? boxAttr.form.matches : boxAttr.form.notMatches,
        }}
        >
        <TextField
          variant="outlined"
          name="email"
          size="small"
          placeholder="email"
          onChange={handleChangeFormLogin}
          value={formLogin.email}
        />
        <TextField 
          variant="outlined"
          name="password"
          size="small"
          placeholder="password"
          onChange={handleChangeFormLogin}
          value={formLogin.password}
        />
        <Button 
          variant="contained" 
          size="small"
          color="primary"
          onClick={routeChange}
          disabled={!formLogin.email || !formLogin.password}
        >
          Log in
        </Button>
      </Box>
    </Box>    
  );
};
  
export default Home;