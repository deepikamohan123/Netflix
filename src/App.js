import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Routes,Link} from 'react-router-dom'
import {AppContext} from './AppContext'
import Home from './Pages/Home/Home';
import About from './Pages/About/About';



function App() {
  return (
   
    <div className="App">
         <Router> 
                   <Link to='/'></Link>
                   <AppContext.Provider >
                   <Routes>
                      <Route element={<Home/>} path='/'/> 
                      <Route element={<About/>} path='/about'/>
                      </Routes>
                      </AppContext.Provider>
                      </Router>
      
      {/* //isSmall is checked */}
      
    </div>

  );
}

export default App;
