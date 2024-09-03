import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, baseUrl, imageUrl}  from '../../Constants/Constants'
import {Link} from 'react-router-dom'

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
        {props.url ? movies.map((obj)=>{
            return (

                <div>
                <img onClick={()=>{
                    setstate(!state)
                    handleMovieClick(obj.id)
                }} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.poster_path}`} alt="Poster" />
                {obj ?  <Link className='link' to={`/about`} state={{obj}} style={{ textDecoration: 'none' ,cursor:'pointer'}}>{obj ? obj.title ? obj.title : obj.name : ""}</Link> : alert('Not Available')}
                  
                  
                   
                </div>

)}) : ''}

{/* {props.movies ? props.movies.map((obj)=>{
            return (

                <div>
                <img onClick={()=>{
                    setstate(!state)
                    handleMovieClick(obj.id)
                }} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.poster_path}`} alt="Poster" />
                {obj ?  <Link className='link' to={`/about`} state={{obj}} style={{ textDecoration: 'none' ,cursor:'pointer'}}>{obj ? obj.title ? obj.title : obj.name : ""}</Link> : alert('Not Available')}
                  
                  
                   
                </div>

)}) : ''} */}
           
        
        
      </div>
    </div>
  )
}

export default RowPost
