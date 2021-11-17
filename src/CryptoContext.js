import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot, setDoc } from '@firebase/firestore';


const Crypto = createContext();

const CryptoContext = ({ children }) => {

const [currency, setCurrency] = useState('usd');
const [symbol, setsymbol] = useState('$');
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [user, setUser] = useState(null);
const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
});

const [watchlist, setWatchlist] = useState([]);

const [priceAlert, setPriceAlert] = useState([{ //setting up price alerts state
    symbol: '',
    price: 0,
}]);


useEffect(() => {
if (user) {
   const coinRef = doc(db, 'watchlist', user.uid); 

   var unsubscribe = onSnapshot(coinRef, coin => {
    if (coin.exists()){
       //console.log('coin.data', coin.data().coins)
       setWatchlist(coin.data().coins); 
    } else {
        console.log('Watchlist Empty');
    }
   });
   return () => {
    unsubscribe();
    }

}
}, [user])


useEffect(() => {

onAuthStateChanged(auth, user => {
   if(user) setUser(user); 
   else setUser(null);
});
}, []);




const fetchCoins = async () => {
    setLoading(true);
    
    const { data } = await axios.get(CoinList(currency))
    
    setCoins(data);
    setLoading(false);
    
};


useEffect(() => {
  
    if (currency === 'usd' || currency === 'cad') setsymbol('$');
    else if (currency === 'eur') setsymbol('€')
    
}, [currency])


    return (
       <Crypto.Provider value={{
           currency, 
           symbol, 
           setCurrency, 
           coins, 
           loading, 
           fetchCoins, 
           alert, 
           setAlert, 
           user,
           watchlist,
           }}>
           {children}
       </Crypto.Provider>
       
    )
}


export default CryptoContext

export const CryptoState = () => {
   return useContext(Crypto)
}
