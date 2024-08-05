import React,{useEffect, useState} from 'react'
import './Banner.css'
import Youtube from 'react-youtube'
import {baseUrl, API_KEY,imageUrl} from '../../Constants/Constants'
import axios from '../../axios'

function Banner() {
  const [movie, setMovie] = useState()   //snippet used for auto import and other rectangle to get syntax.
  const [state, setstate] = useState()
  const [urlId, setUrlid] = useState()
//   const [contents, setContents] = useState()
  useEffect(() => {
    axios.get(`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{     //here we are not calling installed axios but the axios we wrote. backteck ` is usedto write named url inside link using $.
      console.log(response.data)
      setMovie(response.data.results[Math.floor(Math.random()*response.data.results.length)])

    })      
    
  }, [])       //useEffect work when the component is rendered.
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
  return (
    <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ''})`}} className='banner' >
       
        {/* {contents ? <div> */}
            <div className='div'><div className="content">
        <h1 className='title'>{movie ? movie.title ? movie.title : movie.name : ''}</h1>
        {/* <h1 className='title'>{movie.title}</h1>
        this movie.title wont work because it comes before useEffect so there will not be any values so use ternery operator to give a condition that only after the data came the the component will show data. */}
        <div className="buttons">
            <button onClick={()=>{
        setstate(!state)
        handleMovieClick(movie.id)
    }} className='button'>{!state ?"Play" : "Close" }</button>
            <button className='button'>My List</button>
        </div>
        <h1 className="description">
           {movie ? movie.overview :''}
        </h1>
      </div>
      <div className="youtube">
            { state ? <Youtube videoId={urlId && urlId.key} opts={opts} />: ""}
        </div></div>
      <div className="fade"></div>
      {/* </div> : ""} */}
      
      
    </div>
  )
}

export default Banner
