import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const CoinPage = () => {


    // grab id form req.params
   const { id } = useParams();


   // Local Props
   const [coin, setCoin] = useState();


   // App Level Props
   const {currency, symbol, user, watchlist, setAlert} = CryptoState();


   // fetch coin from API
   const fetchCoin = async () => {
       const { data } = await axios.get(SingleCoin(id));
       setCoin(data);
    };

    
    // onClick Navigate 
  const navigate = useNavigate();

    
    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    

    // CSS
    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
        },
        sidebar: {
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: '2px solid grey',
            backgroundColor: 'white',
            color: 'grey',
            paddingTop: 25,
        },
        heading: {
            fontWeight: 'bold',
            marginBottom: 20,
        },
        description: {
            width: '100%',
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: 'justify',
        },

        marketData: {
            alignSelf: 'start',
            padding: 25,
            paddingTop: 10,
            width: '100%',
        },
    }));



    // ADDING COINS TO WATCHLIST
    const inWatchList = watchlist.includes(coin?.id);

    const addToWatchlist = async () => {
        const coinRef = doc(db, 'watchlist', user.uid);

        try{
            await setDoc(coinRef, {
                coins:watchlist ? [...watchlist, coin?.id] : [coin?.id], 
            });
            setAlert({
                open: true,
                message: `${coin.name} Added to Watchlist!`,
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

    const removeFromWatchlist = async () => {
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


    const classes = useStyles();

    if (!coin) return <LinearProgress style={{backgroundColor: 'gold'}}/>

    return (
        // SIDEBAR
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                src={coin?.image.large}
                alt={coin?.name}
                height='200'
                style={{marginBottom: 20}}
                />
                <Typography variant='h3' className={classes.heading}>
                    {coin?.name} 
                </Typography>

                <Typography variant='subtitle1' className={classes.description}>
                {parse(`${coin?.description.en.split(". ")[0]}`)}
                </Typography>



                <div className={classes.marketData}>
                   
                   
                   {/* RANK */}
                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{fontFamily: 'Montserrat',}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>


                    {/* CURRENT PRICE */}
                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{fontFamily: 'Montserrat',}}>
                            {symbol}{' '}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>


                    {/* MARKET CAP */}
                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' className={classes.heading}>
                            Market Cap:{' '}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{fontFamily: 'Montserrat',}}>
                            {symbol}{' '}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                .toString()
                                .slice(0, -6)
                            )}M
                        </Typography>
                    </span>

                {user && (
                   <Button
                   style={{
                       border: '1px solid lightgrey',
                       width: '100%',
                       height: 40,
                       backgroundColor: inWatchList ? 'lightgrey' : 'white',
                       padding: 10,
                   }}
                   onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
                   >
                    { inWatchList ? 'Remove from Watchlist' : 'Add to Watchlist' }
                   </Button>                   
                )}

                &nbsp; &nbsp;

                {user && (
                   <Button
                   style={{
                       border: '1px solid lightgrey',
                       width: '100%',
                       height: 40,
                       backgroundColor: inWatchList ? 'lightgrey' : 'white',
                       padding: 10,
                   }}
                   onClick={() => navigate(`/alerts`)}
                   >
                    Set Alerts
                   </Button>                   
                )}

                </div>
            </div>


            

        {/* CHART & COIN INFO */}
            <CoinInfo coin={coin}/> 
               
        </div>
    )
}

export default CoinPage
