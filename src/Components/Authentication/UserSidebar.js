import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// CSS
const useStyles = makeStyles({
 container: {
     width: 350,
     padding: 25,
     height: '100%',
     display: 'flex',
     flexDirection: 'column',
     fontFamily: 'monospace',
 },
 profile: {
     flex: 1,
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     gap: '20px',
     height: '92%',
 },
 picture: {
     width: 200,
     height: 200,
     cursor: 'pointer',
     backgroundColor: 'lightsalmon',
     objectFit: 'contain',
 },
 logout: {
     height: '8%',
     width: '100%',
     backgroundColor: 'grey',
     marginTop: 20,
     color: 'white',
 },
 watchlist: {
     flex: 1,
     width: '100%',
     backgroundColor: 'grey',
     borderRadius: 10,
     padding: 15,
     paddingTop: 10,
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     gap: 12,
     overflowY: 'scroll',
 },
 coin: {
   fontSize: 15,
   padding: 10,
   borderRadius: 5,
   color: 'black',
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: 'lightgrey',
 }, 
});


export default function UserSidebar() {
  
  // SET STATE
  const [state, setState] = useState({
    right: false,
  });

  
  // STATE IMPORTS
  const { user, setAlert, watchlist, coins, symbol, fetchCoins } = CryptoState();
  
  

  useEffect(() => {
  fetchCoins()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // Sets MUI useStyles
  const classes = useStyles();
  


  // onClick Navigate 
  const navigate = useNavigate();

  

  // OPEN & CLOSE DRAWER
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  //REMOVE COIN
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);

    try{
        await setDoc(coinRef, {
            coins: watchlist.filter((watch) => watch !== coin?.id)
        },
            { merge: 'true' }

            );
        setAlert({
            open: true,
            message: `${coin.name} Removed from Watchlist!`,
            type: 'success',
        });
    } catch (error) {
        setAlert({
            open: true,
            message: error.message,
            type: 'error',
        });
    }
};



  // LOGOUT
  const logOut = () => {
    signOut(auth);

    setAlert({
        open: true,
        type: 'success',
        message: 'Logout Successfull !'
    });

    toggleDrawer();
    }



  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar onClick={toggleDrawer(anchor, true)}
            style={{
                height: 38,
                width: 38,
                cursor: 'pointer',
                backgroundColor: 'lightsalmon'
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
            />

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            
            <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar 
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                    />
                    <span
                    style={{
                        width: '100%',
                        fontSize: 25,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        wordWrap: 'break-word',
                    }}
                    >

                    {user.displayName || user.email}

                    </span>

                    {/* Community Page */}

                    <div 
                    style={{cursor: 'pointer'}}
                    onClick={() => navigate(`/community`)}>CoinBeat Community </div>


                    <div className={classes.watchlist}>
                        <span style={{
                            fontSize: 15,
                            color: 'white',
                        }}>
                            Watchlist
                        </span>


                        { (watchlist.length > 0) ? 
                          // eslint-disable-next-line array-callback-return
                          coins.map(coin => {
                          
                          if (watchlist.includes(coin.id))
                          
                          return (

                            <div 
                            onClick={() => navigate(`/coins/${coin.id}`)} //makes each watch coin link to info page
                            className={classes.coin}
                            style={{cursor: 'pointer'}}
                            key={coin.name}
                            >

                              <span>{coin.name}</span>
                              
                              <span style={{display: 'flex', gap: 8}}>
                                {symbol}
                                {numberWithCommas(coin.current_price.toFixed(2))}
                                
                                <AiFillDelete
                                style={{cursor: 'poimter'}}
                                fontSize='16'
                                onClick={() => removeFromWatchlist(coin)}
                                />

                              </span>
                            </div>
        
                          )
                        }) : 'Add Coins to Your Watch List'}

                    </div>


                </div>

                <Button
                variant='contained'
                className={classes.logout}
                onClick={logOut}
                >
                    Log Out
                </Button>


            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}