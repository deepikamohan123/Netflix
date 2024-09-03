import React,{useEffect, useState} from 'react'
import './Banner.css'
import Youtube from 'react-youtube'
import {baseUrl, API_KEY,imageUrl} from '../../Constants/Constants'
import axios from '../../axios'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from "../../Firebase/config"
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, setDoc, deleteDoc} from 'firebase/firestore';
import RowPost from '../RowPost/RowPost'
import {originals,actions,trending} from '../../Urls'
import {Link} from 'react-router-dom'
import MyList from '../MyList/MyList'
// import {Slide} from 'react-slideshow-image'
// import 'react-slideshow-image/dist/styles.css'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'

function Banner() {
  // const collectionRef = collection(db, "list")
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()   //snippet used for auto import and other rectangle to get syntax.
  const [movie2, setMovie2] = useState()
  const [movie3, setMovie3] = useState()
  const [state, setstate] = useState()
  const [urlId, setUrlid] = useState()
const [documentExists, setDocumentExists] = useState(false);
  useEffect(() => {
    axios.get(`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{     //here we are not calling installed axios but the axios we wrote. backteck ` is usedto write named url inside link using $.
      console.log(response.data.results)
      setMovie(response.data.results[Math.floor(Math.random()*response.data.results.length)])
      setMovie2(response.data.results[Math.floor(Math.random()*response.data.results.length)+1])
      setMovie3(response.data.results[Math.floor(Math.random()*response.data.results.length)+2])
    })    
    
  }, [])       //useEffect work when the component is rendered.
  useEffect(() => {
    if (movie) {
      checkDocumentExists(movie.id)
    }
  }, [movie])
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
    // <Slide>
    //   <div className="each-slide-effect">
    <div style={{backgroundImage:`url()`}} className='banner' >
       <img className='bannerImg' src={`${movie ? imageUrl+movie.backdrop_path : ''}`} alt="Banner"/>
        {/* {contents ? <div> */}
       
            <div className='div'>
              <div className="content container-fluid">
        <h1 className='title'>{movie ? movie.title ? movie.title : movie.name : ''}</h1>
        {/* <h1 className='title'>{movie.title}</h1>
        this movie.title wont work because it comes before useEffect so there will not be any values so use ternery operator to give a condition that only after the data came the the component will show data. */}
        <div >
            <button onClick={()=>{
        setstate(!state)
        handleMovieClick(movie.id)
    }} className='butt'>{!state ?"Play" : "Close" }</button>
    {documentExists ?
    <button onClick={()=>{
      handleRemoveList(movie.id)  
      setDocumentExists(false)
      // setList([movie.id,...list])
      // addDoc(collectionRef,{
      //     id:movie.id})

      // console.log(list[0]);
      // console.log(list.length);
      }} className='butt'>Remove</button> : 
      <button onClick={()=>{
        handleMyList(movie.id)
        setDocumentExists(true)
        }} className='butt'>My List</button> }
            
        </div>
        <h1 className="description">
           {movie ? movie.overview :''}
        </h1>
      </div>
      
        </div>
        <div className="fades"></div>
        { state ? <div className="youtube">
             <Youtube videoId={urlId && urlId.key} opts={opts} />
        </div>: ""}
       {/* {movies ? <div className='rowpost'>
       {/* {urlId && <Youtube videoId={urlId.key} opts={opts}/>} */}
       {/* { state ? <Youtube videoId={urlId ? urlId.key : alert('No Trailor available')} opts={opts} />: ""} */}
      {/* <h2>My List</h2>
      <div className="posters">
        {movies.map((obj)=>{
            return (

                <div>
                <img onClick={()=>{
                    // setstate(!state)
                    // handleMovieClick(obj.id)
                }} className='poster' src={`${imageUrl+obj.poster_path}`} alt="Poster" />
                {obj ?  <Link className='link' to={`/about`} state={{obj}} style={{ textDecoration: 'none' ,cursor:'pointer'}}>{obj ? obj.title ? obj.title : obj.name : ""}</Link> : alert('Not Available')}
                  
                  
                   
                </div>

)}) }
           
        
        
      </div>
    </div> : ''} 
        
      
      {/* </div> : ""} */}
      {/* {list.length>0 ? <div className='' style={{}}><RowPost title='My List' url={trending} /> </div>: ""} */}  
    </div>
    // </div>
    
    // <div className="each-slide-effect">
    // <div style={{backgroundImage:`url()`}} className='banner' >
    //    <img className='bannerImg' src={`${movie2 ? imageUrl+movie2.backdrop_path : ''}`} alt="Banner"/>
    //     {/* {contents ? <div> */}
       
    //         <div className='div'>
    //           <div className="content container-fluid">
    //     <h1 className='title'>{movie2 ? movie2.title ? movie2.title : movie2.name : ''}</h1>
    //     <div >
    //         <button onClick={()=>{
    //     setstate(!state)
    //     handleMovieClick(movie2.id)
    // }} className='butt'>{!state ?"Play" : "Close" }</button>
    // {documentExists ?
    // <button onClick={()=>{
    //   handleRemoveList(movie2.id)  
    //   setDocumentExists(false)
    //   }} className='butt'>Remove</button> : 
    //   <button onClick={()=>{
    //     handleMyList(movie2.id)
    //     setDocumentExists(true)
    //     }} className='butt'>My List</button> }
            
    //     </div>
    //     <h1 className="description">
    //        {movie2 ? movie2.overview :''}
    //     </h1>
    //   </div>
    //     </div>
    //     <div className="fades"></div>
    //     { state ? <div className="youtube">
    //          <Youtube videoId={urlId && urlId.key} opts={opts} />
    //     </div>: ""}
    // </div>
    // </div>

    // <div className="each-slide-effect">
    // <div style={{backgroundImage:`url()`}} className='banner' >
    //    <img className='bannerImg' src={`${movie3 ? imageUrl+movie3.backdrop_path : ''}`} alt="Banner"/>
    //     {/* {contents ? <div> */}
       
    //         <div className='div'>
    //           <div className="content container-fluid">
    //     <h1 className='title'>{movie3 ? movie3.title ? movie3.title : movie3.name : ''}</h1>
    //     {/* <h1 className='title'>{movie.title}</h1>
    //     this movie.title wont work because it comes before useEffect so there will not be any values so use ternery operator to give a condition that only after the data came the the component will show data. */}
    //     <div >
    //         <button onClick={()=>{
    //     setstate(!state)
    //     handleMovieClick(movie3.id)
    // }} className='butt'>{!state ?"Play" : "Close" }</button>
    // {documentExists ?
    // <button onClick={()=>{
    //   handleRemoveList(movie3.id)  
    //   setDocumentExists(false)
    //   // setList([movie.id,...list])
    //   // addDoc(collectionRef,{
    //   //     id:movie.id})

    //   // console.log(list[0]);
    //   // console.log(list.length);
    //   }} className='butt'>Remove</button> : 
    //   <button onClick={()=>{
    //     handleMyList(movie3.id)
    //     setDocumentExists(true)
    //     }} className='butt'>My List</button> }
            
    //     </div>
    //     <h1 className="description">
    //        {movie3 ? movie3.overview :''}
    //     </h1>
    //   </div>
      
    //     </div>
    //     <div className="fades"></div>
    //     { state ? <div className="youtube">
    //          <Youtube videoId={urlId && urlId.key} opts={opts} />
    //     </div>: ""}
    // </div>
    // </div>
    // </Slide>

  )
}

export default Banner
