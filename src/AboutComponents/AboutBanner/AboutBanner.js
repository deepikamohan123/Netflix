import React,{useState,useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Youtube from 'react-youtube'
import {baseUrl, API_KEY,imageUrl} from '../../Constants/Constants'
import './AboutBanner.css'
import axios from '../../axios'
import {db} from "../../Firebase/config"
import {collection, getDocs, getDoc, setDoc, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

function AboutBanner() {
  const collectionRef = collection(db, "list")
  const [documentExists, setDocumentExists] = useState(false);
  const [movies, setMovies] = useState([])
    let {state} = useLocation();
 console.log(state)
 const [show, setShow] = useState()
 const [urlId, setUrlid] = useState()
 useEffect(() => {
  if (state.obj) {
    checkDocumentExists(state.obj.id)
  }
}, [state.obj])
const checkDocumentExists = (id) => {
const docRef = doc(db, "list", id.toString());
getDoc(docRef).then((doc) => {
  if (doc.exists()) {
    setDocumentExists(true);
  } else {
    setDocumentExists(false);
  }
});
};
 const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      
      autoplay: 1,
    },
  };
  const handleMovieClick = (id)=>{
    axios.get(`${baseUrl}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
        if(response.data.results.length !==0){
            setUrlid(response.data.results[0])
        } else {
            alert('No Trailor available')
        }
        
    })
    

  }

  const handleMyList=(id)=>{
    axios.get(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.length !==0){
        setMovies([...movies,response.data])
        // addDoc(collectionRef,response.data)
        // console.log(response.data);
        const docRef = doc(db, 'list', response.data.id.toString())
        getDoc(docRef).then((doc) => {
          if (!doc.exists()) {
            setDoc(docRef, response.data);
          } else {
            alert("Movie already exists in my list.");
          }
        });
        // console.log(response.data);
        
      } 
      else if(!response.data.poster_path.exists()){
        alert('Movie not found')
      }
       else {
        alert('No Movie available')
    }
    })
  }
  const handleRemoveList=(id)=>{
    const docRef = doc(db, 'list',id.toString())
    deleteDoc(docRef)
  }
  return (
    <div  className='banner' >
      <img className='bannerImage' src={`${state.obj ? imageUrl+state.obj.backdrop_path : ''}`} alt="Banner" />
       
        {/* {contents ? <div> */}
            <div className='div'>
        <div className='div2'>
        <img className="poster" src={`${state.obj ? imageUrl+state.obj.poster_path : ''}`} alt="Poster" />
      </div>
      <div className="content">
        <h1 className='title'>{state.obj ? state.obj.title ? state.obj.title : state.obj.name : ''}</h1>
        {/* <h1 className='title'>{movie.title}</h1>
        this movie.title wont work because it comes before useEffect so there will not be any values so use ternery operator to give a condition that only after the data came the the component will show data. */}
        <div className="buttons">
            <button onClick={()=>{
        setShow(!show)
        handleMovieClick(state.obj.id)
    }} className='button'>{!show ?"Play" : "Close" }</button>
              {documentExists ?
    <button onClick={()=>{
      handleRemoveList(state.obj.id)  
      setDocumentExists(false)
      }} className='butt'>Remove</button> : 
      <button onClick={()=>{
        handleMyList(state.obj.id)
        setDocumentExists(true)
        }} className='butt'>My List</button> }
        </div>
        <h1 className="description">
           {state.obj ? state.obj.overview :''}<br/>
           <hr style={{marginTop:10}}/>
           <h5 style={{marginTop:10}}>
           Release Date: {state.obj ? state.obj.release_date :''}<br/>
           Rating: {state.obj ? state.obj.vote_average*10 :''} % <br/>
          
       Vote Count: {state.obj ? state.obj.vote_count :''}</h5>
        </h1>
        </div>
     </div>
      <div className="fade"></div>
      { show ? <div className="youtube">
             <Youtube videoId={urlId && urlId.key} opts={opts} />
        </div> : ""}
      {/* </div> : ""} */}
      
      
    </div>
  )
}

export default AboutBanner
