import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, baseUrl, imageUrl}  from '../../Constants/Constants'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlid] = useState([])
    const [state, setstate] = useState()
    useEffect(() => {
        axios.get(props.url).then((response)=>{
            setMovies(response.data.results)
        }).catch(err=>{
            // alert('Network error')
        })
    }, [props.url])
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
    <div className='rowpost'>
       {/* {urlId && <Youtube videoId={urlId.key} opts={opts}/>} */}
       { state ? <Youtube videoId={urlId ? urlId.key : alert('No Trailor available')} opts={opts} />: ""}
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>{
            return (
                <div>
                <img onClick={()=>{
                    setstate(!state)
                    handleMovieClick(obj.id)
                }} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="Poster" />
                <a href='https://www.themoviedb.org/tv/94997-house-of-the-dragon'>{obj ? obj.title ? obj.title : obj.name : ""}</a></div>

)})}
           
        
        
      </div>
    </div>
  )
}

export default RowPost
