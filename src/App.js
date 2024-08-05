import React from 'react';
import './App.css';
import {originals,actions,trending} from './Urls'
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost title='Trending' url={trending}/>  
      <RowPost title='Netflix Originals' isSmall url={originals}/>
      <RowPost title='Action' isSmall url={actions}/>  
      {/* //isSmall is checked */}
      
    </div>
  );
}

export default App;
