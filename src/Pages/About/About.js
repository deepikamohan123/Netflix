import React,{useState} from 'react'
import {db} from "../../Firebase/config"
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {API_KEY,baseUrl} from '../../Constants/Constants'
import NavBar from '../../Components/NavBar/NavBar';
import AboutBanner from '../../AboutComponents/AboutBanner/AboutBanner';
import {imageUrl} from '../../Constants/Constants'
import RowPost from '../../Components/RowPost/RowPost';
import {originals,actions,trending} from '../../Urls'
import './About.css'
import {useLocation} from 'react-router-dom'
import Reviews from '../../AboutComponents/AboutBanner/AboutReviews/Reviews';
import MyList from '../../Components/MyList/MyList';
function About(props) {
  const [movies, setMovies] = useState([])
  const collectionRef = collection(db, "list")
  getDocs(collectionRef).then(snapshot=>{   //.doc('') here we can specify id of the doc to get that doc. this is read
    const movies= snapshot.docs.map(obj=> obj.data())
    // console.log(movies);
    
    setMovies(movies)
    
  })
  let {state} = useLocation();
  // console.log(state.obj);
  
  return (
    <div className='about'  >
      <NavBar/>
      <AboutBanner/>
      { movies.length>0 ? <MyList title='My List' movies={[movies]} /> : ""}
      <RowPost title='Similar' url={`${state.obj ? baseUrl+`/movie/`+state.obj.id+`/recommendations?api_key=`+API_KEY+`&language=en-US&page=1` :''}`}/>  
      <Reviews/>
      {/* <RowPost title='Netflix Originals' isSmall url={originals}/>
      <RowPost title='Action' isSmall url={actions}/>  */}

    </div>
  )
}

export default About
