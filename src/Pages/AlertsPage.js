import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { CryptoState } from '../CryptoContext';
//import Carousel from '../Components/Banner/Carousel';

const useStyles = makeStyles(() => ({
// banner: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
// },
bannerContent: {
    height:1000,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
},
articleContent: {
    //height:1000,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    //alignItems: 'center',
    paddingLeft: 300,
},
tagline: {
    display: 'flex',
    //height: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
},

}))

const AlertsPage = () => {
    const classes = useStyles();
    const {currency, symbol, coins, fetchCoins} = CryptoState();


    
    console.log('alerts page coins', coins)
    console.log(coins.map(coin => {
        let list = []
        list.push(coin.id)
        return list
    }))




    useEffect(() => {
        
        setTimeout(function(){alert('ETH above $4,000USD')}, 3000)
    }, [])

    return (
        
        <div className={classes.banner}>
            &nbsp;
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: 'montserrat',
                            color: 'lightgrey',
                        }}
                        >
                            Manage Alerts
                    
                        </Typography>
                    
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                        }}
                        >
                                
                    
                        </Typography>


                        <div style={{display: 'flex', flexDirection: 'column', gap: 5,}}>
                        <form style={{
                            display: 'flex', 
                            flexDirection: 'column',
                            //justifyContent: 'flex-start', 
                            gap: 5, 
                            alignItems: 'center',
                            width: 400,
                            padding: 25,
                            paddingTop: 45,
                            
                            }}>
                        
                             <input type="text" name="name" 
                             style={{width: '90%',
                                //marginLeft: -35,
                                marginRight: 'auto',
                                height: 35,
                                }}
                                placeholder='  Coin Name'
                             />
                             <input type="text" name="name" 
                             style={{width: '90%',
                                //marginLeft: -35,
                                marginRight: 'auto',
                                height: 35,
                                }}
                                placeholder='  Above/Below'
                             />
                             <input type="text" name="name" 
                             style={{width: '90%',
                                //marginLeft: -35,
                                marginRight: 'auto',
                                height: 35,
                                }}
                                placeholder='  Price'
                             />
                         &nbsp;
                        <input type="submit" value="Add Alert" 
                        style={{
                            width: '90%',
                            padding: 0,
                            //backgroundColor: 'rgb(254, 165, 93)',
                            //color: white;
                            fontSize: 15,
                            fontWeight: 800,
                            marginRight: 'auto',
                            height: 35,
                            ///width: 340,
                        }}
                        
                        
                        />
                        </form>
                        </div>
                            
                        </div>
                        <Container className={classes.articleContent}>
                        
                       
                        <div style={{marginLeft: 90}}>
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                            textAlign: 'start',
                            fontWeight: 1000,
                            fontSize: 33,
                        }}
                        >
                            BTC (above) $70,000.00USD [x]   
                    
                        </Typography>
                        
                        
                        </div>


                        &nbsp;&nbsp;&nbsp;
                        <div style={{marginLeft: 90}}>
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                            textAlign: 'start',
                            fontWeight: 1000,
                            fontSize: 33,
                        }}
                        >
                            ETH (above) $4000.00USD [x]   
                    
                        </Typography>
                        
                        
                        </div>

                        &nbsp;&nbsp;&nbsp;
                        <div style={{marginLeft: 90}}>
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                            textAlign: 'start',
                            fontWeight: 1000,
                            fontSize: 33,
                        }}
                        >
                            ADA (Below) $1.50USD [x]  
                    
                        </Typography>
                        
                       
                        </div>


                        &nbsp;&nbsp;&nbsp;
                        <div style={{marginLeft: 90}}>
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                            textAlign: 'start',
                            fontWeight: 1000,
                            fontSize: 33,
                        }}
                        >
                            XRP (Below) $1.00USD [x]  
                    
                        </Typography>
                        
                       
                        </div>

                        </Container>
                {/* </div> */}
                {/* <Carousel /> */}
            </Container>
        </div>
    )
}

export default AlertsPage
