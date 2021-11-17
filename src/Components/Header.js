import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, Toolbar, Typography, ThemeProvider } from "@material-ui/core"
import React from "react";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";


const useStyles = makeStyles (() => ({
    title: {
        flex: 1, // spreads to the full width
        color: 'lightsalmon',
        backgroundColor: 'white',
        fontFamily: 'montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: 860,
        padding: 8,
        paddingLeft: 13,
    }
}))


const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency, user } = CryptoState();


    const darkTheme = createTheme({
        palette: {
            primary: {
            main: '#fff',
        },
        type: 'light',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static' >
          <Container>
            <Toolbar>
                <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>CoinBeat</Typography>
                <Select variant='outlined' 
                style={{
                    width: 100,
                    height: 40,
                    marginLeft: 15,
                    color: 'grey',
                    backgroundColor: 'white',
                }} 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={'usd'}>USD</MenuItem>
                    <MenuItem value={'cad'}>CAD</MenuItem>
                    <MenuItem value={'eur'}>EUR</MenuItem>
                </Select>
                <div style={{padding: 15}}>
               {user ? <UserSidebar/> : <AuthModal/>}
               </div>
            </Toolbar>
          </Container>
      </AppBar>
      </ThemeProvider>  
    )
}

export default Header
