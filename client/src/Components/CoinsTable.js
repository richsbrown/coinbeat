import React from 'react';
import { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, TextField, ThemeProvider, Typography, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';


const CoinsTable = () => {

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
    const navigate = useNavigate();

    
    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    
   
    
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'light',
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        ); 
    };


    const useStyles = makeStyles(() => ({

        row: {
            backgroundColor: 'white',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#FAFAFA',
            },
            
        },
        pagination: {
            '& .MuiPaginationItem-root': { //styling for MUI pagination
                color: 'black',
                backgroundColor: 'lightgrey',
            },
        },        

    }));

    const classes = useStyles();


    return (
        <ThemeProvider theme={darkTheme}>

            <Container style={{textAlign: 'start'}}>

               <Typography
               variant='h6'
               style={{margin: 18, color: 'black'}}
               >
                  {/* Listed by Market Cap  */}
               </Typography> 

                <TextField 
                label='Search ... (coins listed by market cap)' variant='outlined'
                style={{marginBottom: 20, width: '100%', backgroundColor: 'white'}}
                onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {
                        loading ?  (
                           <LinearProgress style={{backgroundColor: 'gold'}} />
                        ) : (

                            <Table>
                                    
                                    <TableHead style={{backgroundColor: '#F3F3F3'}}>
                                        <TableRow>
                                         {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (

                                             <TableCell
                                             style={{
                                                 color: 'black',
                                                 fontWeight: '700',
                                             }}
                                             key={head}
                                             align={head === 'Coin' ? '' : 'right'}
                                             >
                                                 {head}
                                             
                                             </TableCell>         
                                        ))}   
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10 ) // sets the pages 0-10, 20-30 etc.
                                        .map(row => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            
                                            return (
                                                <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                                >

                                            {/* IMAGE, SYMBOL, NAME */}
                                            <TableCell component='th' scope='row' style={{display: 'flex', gap: 15}}>
                                                  <img
                                                  src={row.image}
                                                  alt={row.name}
                                                  height='50'
                                                  style={{marginBottom: 10}}
                                                  />

                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <span style={{textTransform: 'uppercase', fontSize: 22, color: 'grey'}}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{color:'grey'}}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>  

                                            {/* PRICE */}
                                            <TableCell align='right' style={{color: 'grey'}}>
                                                {symbol}{' '}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>

                                            {/* 24h Change */}
                                            <TableCell align='right' style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500,}}>
                                                {profit && '+'}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>

                                            {/* Market Cap */}
                                            <TableCell align='right' style={{color: 'grey'}}>
                                                {symbol}{' '}
                                                {numberWithCommas(row.market_cap.toString())}
                                                {/* {numberWithCommas(row.market_cap.toString().slice(0, -6))}M */}
                                            </TableCell>    

                                        </TableRow>
                                    )
                                            
                                        })}
                                    </TableBody>


                            </Table>

                        )}
                </TableContainer>

                    <Pagination 
                    style={{
                        padding: 20,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    classes={{ul: classes.pagination}}
                    count={(handleSearch()?.length/10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                    />

            </Container>

        </ThemeProvider>
    )
}

export default CoinsTable

