import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Line } from 'react-chartjs-2'
import { chartDays } from '../config/data'
import SelectButton from './SelectButton';
import { useParams } from 'react-router-dom'

const CoinInfo = ({coin}) => {
const [historicalData, setHistoricalData] = useState();
const [days, setDays] = useState(1);
const {currency} = CryptoState();
const { id } = useParams();

const fetchHistoricalData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
};


useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency, days, id]);


const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        type: 'light',
    },
});


const useStyles = makeStyles((theme) => ({

    container: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 0,
            padding: 20,
            paddingTop: 0,

        },
    }

}));

const classes = useStyles();


    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicalData ? (
                        <CircularProgress
                        style={{color: 'lightsalmon'}}
                        size={250}
                        thickness={1}
                        />
                    ) : (
                    <>
                    <Line 
                    data={{
                        labels: historicalData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        
                            return days === 1 ? time : date.toLocaleDateString()
                        }),

                        datasets: [ {
                            data: historicalData.map((coin) => coin[1]),
                            label: days > 1 ? `Price ( Past ${days} Days) in ${currency}` 
                            : `Price ( Past 24hrs ) in ${currency}`,
                            borderColor: 'lightsalmon',
                        },],
                    }}
                    options={{
                        elements: {
                         point: {
                            radius: 1,
                            },
                        },
                    }}
                    
                    />
                    <div
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        justifyContent: 'space-around',
                        width: '100%',
                        color: 'black'
                    }}
                    >
                        {chartDays.map(day => (
                           <SelectButton
                           key={day.value}
                           onClick={() => setDays(day.value)}
                           selected={day.value === days}
                           >
                               {day.label}
                           </SelectButton>
                           
                        ))}

                    </div>
                    </>
                    )}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo
