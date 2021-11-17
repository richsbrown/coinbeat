import { makeStyles, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({

    carousel: {
        height: '50%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 20,
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'grey',
    },
}));


export function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const Carousel = () => {

    const [trending, setTrending] = useState([])
    const [loading, setLoading] = useState(false)

    const classes = useStyles();

    const { currency, symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
        setLoading(false)
    }

    
    useEffect(() => {
        fetchTrendingCoins();
       // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [currency]);

   
   
    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0

       return ( 
       <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
        key={coin.id}
        >
        <img 
        src={coin?.image}
        alt={coin.name}
        height='80'
        style={{marginBottom: 10}}
        />
        <span>
            {coin?.symbol}
            &nbsp;
            <span
            style={{
                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                fontWeight: 500,
            }}
            >
                {profit && '+'}
                {coin?.price_change_percentage_24h?.toFixed(2)}%    
            </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}

        </span>

        </Link>
       );
    });


    return (
        loading ? (

            <CircularProgress
            style={{color: 'lightsalmon'}}
            size={150}
            thickness={1}
            />

        ) :
        ( <div className={classes.carousel}>
           
           <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          
           <div className={classes.carousel}>{items.slice(0, 5)}</div>
           &nbsp;
           <div className={classes.carousel}>{items.slice(5, 10)}</div>
           </div>
        </div> )
    )
}

export default Carousel



