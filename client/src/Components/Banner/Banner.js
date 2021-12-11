import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({

bannerContent: {
    height:400,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 150,
    justifyContent: 'space-around',
    backgroundColor: 'white',
},
tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
},

}))


const Banner = () => {

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
                            CoinBeat
                    
                        </Typography>
                    
                        <Typography
                        variant='subtitle1'
                        style={{
                            color: 'grey',
                            textTransform: 'capitalize',
                        }}
                        >
                    
                            On Beat with the world's top Crypto Currencies
                    
                        </Typography>

                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner
