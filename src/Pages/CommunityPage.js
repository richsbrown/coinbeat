import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
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


const CommunityPage = () => {
    const classes = useStyles();


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
                            CoinBeat Community
                    
                        </Typography>
                    
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                        }}
                        >
                                
                    
                        </Typography>


                        <div style={{display: 'flex', flexDirection: 'row', gap: 5, }}>
                        <Button>Coin Talk</Button>
                        <Button>DD (Due Diligence)</Button>
                        <Button>Future Plays</Button>
                        <Button>Trading Resources</Button>
                        <Button>Life Changing Memes</Button>
                        </div>

                        </div>
                        <Container className={classes.articleContent}>
                        
                       
                        <div>
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
                            Bitcoin Predicted to hit $150,000USD    
                    
                        </Typography>
                        
                        <img 
                        src='https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/03/bitcoin_glasses.jpg' 
                        height='200'
                        width='500'
                        />
                        </div>


                        &nbsp;&nbsp;&nbsp;
                        <div >
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
                            NFTs Continue to Fuel Ethereum's Rise    
                    
                        </Typography>
                        
                        <img 
                        src='https://time.com/nextadvisor/wp-content/uploads/2021/10/Ethereum-just-reached-a-record-high-884x584.jpg' 
                        height='200'
                        width='500'
                        />
                        </div>

                        &nbsp;&nbsp;&nbsp;
                        <div >
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
                            Is Cardano the next Ethereum?  
                    
                        </Typography>
                        
                        <img 
                        src='https://miro.medium.com/max/1356/0*YiUjqhM-wLon5Nc_' 
                        height='200'
                        width='500'
                        />
                        </div>

                        </Container>
                {/* </div> */}
                {/* <Carousel /> */}
            </Container>
        </div>
    )
}

export default CommunityPage
