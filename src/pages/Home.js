import Header from '../components/Header'
import Slider from '../components/Slider'
import LatestProducts from '../components/LatestProducts'
import About from '../components/About'
import Footer from '../components/Footer'
import axios from 'axios'
import Tabbed from '../components/Tabed'
import {useState, useEffect} from 'react';


const content = [
  {
    summary: "What is IMDB?",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "Where can i watch?",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "How much does IMDB cost?",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];


function Home() {
  const [movies, setMovies] = useState([])

  const API_KEY = 'api_key=3e52e2f5350ae60de5e2fc58e818d2a0'
  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_URL =  `${BASE_URL}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`


  useEffect(() => {
    axios.get(API_URL)
    .then(resp => setMovies(resp.data.results.splice(0, 4)))
    .catch(e => console.log(e))
  }, [])
  

  return (
    <>
      <Header/>
      <Slider />
      <LatestProducts movies={movies} />
      <About />
      <Tabbed content={content} />
      <Footer />
    </>
  )
}




export default Home