import React,{useState} from 'react'
import {db} from "../../Firebase/config"
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {originals,actions,trending,romance,horror,documentaries,comedy} from '../../Urls'
import NavBar from '../../Components/NavBar/NavBar';
import Banner from '../../Components/Banner/Banner';
import RowPost from '../../Components/RowPost/RowPost';
import MyList from '../../Components/MyList/MyList';
// import Row from 'react-bootstrap/Row'

function Home() {
  const [movies, setMovies] = useState([])
  const collectionRef = collection(db, "list")
  getDocs(collectionRef).then(snapshot=>{   //.doc('') here we can specify id of the doc to get that doc. this is read
    const movies= snapshot.docs.map(obj=> obj.data())
    // console.log(movies);
    
    setMovies(movies)
    
  })
  
  return (
    <div>

        <NavBar/>
      <Banner/>
      { movies.length>0 ? <MyList title='My List' movies={[movies]} /> : ""}
      <RowPost title='Trending' url={trending}/>  
      <RowPost title='Netflix Originals' isSmall url={originals}/>
      <RowPost title='Action' isSmall url={actions}/> 
      <RowPost title='Romance' isSmall url={romance}/>
      <RowPost title='Horror' isSmall url={horror}/> 
      <RowPost title='Comedy' isSmall url={comedy}/>
      <RowPost title='Documentaries' isSmall url={documentaries}/>  
    </div>
  )
}

export default Home
