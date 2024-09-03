import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from "../../Firebase/config"
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import './MyList.css'
import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import axios from '../../axios'
import {API_KEY, baseUrl, imageUrl}  from '../../Constants/Constants'
import {Link} from 'react-router-dom'

function MyList(props) {
    const [urlId, setUrlid] = useState([])
    const [state, setstate] = useState()
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
    <div lazy='loading' className='rowpost'>
       { state ? <Youtube videoId={urlId ? urlId.key : alert('No Trailor available')} opts={opts} />: ""}
      <h2>{props.title}</h2>
      <div className="posters">
        {props.movies ? props.movies[0].map((obj)=>{
          //console.log(obj.poster_path);
            return (
                <div>         
                <img onClick={()=>{
                    setstate(!state)
                    handleMovieClick(obj.id)
                }} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.poster_path}`} alt="Poster" />
                {obj ?  <Link className='link' to={`/about`} state={{obj}} style={{ textDecoration: 'none' ,cursor:'pointer'}}> {obj ? obj.title ? obj.title : obj.name : ""}</Link> : alert('Not Available')}   
                </div>
            )}) : ""} 
            <div className="fades"></div>
      </div>
    </div>
  )
}

export default MyList
