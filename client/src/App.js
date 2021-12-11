import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import CommunityPage from './Pages/CommunityPage';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert'
import AlertsPage from './Pages/AlertsPage';


function App() {

const useStyles = makeStyles(() => ({
  App: {
    backgroundImage: 'url(https://thumbs.dreamstime.com/b/vector-cryptocurrency-pattern-seamless-background-illustration-114473887.jpg)',
    backgroundColor: 'white',
    color: 'black',
    minHeight: '100vh'
  },
}));

const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path='/' element={<Homepage />} exact />
        <Route path='/coins/:id' element={<CoinPage />} />
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/alerts' element={<AlertsPage />} />
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
