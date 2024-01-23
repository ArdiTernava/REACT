import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Header from "../components/Header"
import Footer from "../components/Footer"
import noimage from '../noimage.png'
import Home from './Home'


function Product() {
  const {id} = useParams();
  const [movie, setMovie] = useState();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qty,setQty]= useState(0);

  function handleQty(qty){
    setQty(qty)
  }
  
  
  const API_KEY = 'api_key=3e52e2f5350ae60de5e2fc58e818d2a0'
  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_URL =  `${BASE_URL}/movie/${id}?${API_KEY}`

  useEffect(() => {
    axios.get(API_URL)
    .then(resp => {
      setMovie(resp.data)
      setLoading(false)
    })
    .catch(e => console.log(e))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    
    let qty = Array.from(e.target.elements)[0].value

    if(qty >= 1) {
      let cart_items = localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'))

      if(cart_items.length > 0) {
        let found = false
        for(let i in cart_items) {
          if(cart_items[i].id == id) {
            found = true
            cart_items[i].qty = parseInt(cart_items[i].qty) + parseInt(qty)
          }
        }

        if(found) {
          localStorage.setItem('cart', JSON.stringify(cart_items))
        } else {
          localStorage.setItem('cart', JSON.stringify([...cart_items, {id: id, title: movie.title, qty: parseInt(qty)}]))
        }
      } else {
        const item = {
          id: movie.id,
          title: movie.title,
          qty: parseInt(qty)
        }

        localStorage.setItem('cart', JSON.stringify([item]))
      }

      setCartUpdated(true)
      Array.from(e.target.elements)[0].value = 0
    }
  }

  return <>
    <Header />
    <div className="view-product p-60">
      <div className="container-row">
        { loading ? 'Loading...' : movie && (
          <>
            <div className="product-image">
            {
              movie.poster_path === null ? <img src={noimage} alt={movie.original_title} /> : <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
            }
            </div>
            <div className="product-details">
                <h2>{movie.title}</h2>
                <p><i> 
                   {movie.overview}
                </i>
                
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>Release data</td>
                      <td>{movie.release_date}</td>
                    </tr>
                    <tr>
                      <td>Spoken languages</td>
                      <td>{movie.spoken_languages && movie.spoken_languages.map(lang => <span className="badge" key={lang.iso_639_1}>{lang.english_name}</span>)}</td>
                    </tr>
                    <tr>
                      <td>Date of publication</td>
                      <td>{movie.release_date}</td>
                    </tr>
                  </tbody>
                </table>
                <StarRating maxRating={5} messages={['Terible','Bad','Okay','Good','Amazing']} defaultRating={3}/>
                <br />
                <h4>Price: { (movie.id / 10000).toFixed(2) * qty} &euro;</h4>
               
                <form className="add-to-cart" onSubmit={handleSubmit}>
                  <input type="number" name="qty" value={qty }   onChange={(e)=>handleQty(parseInt(e.target.value))} min="0"/>
                  <input type="hidden" name="id" value={movie.id} />
                 
                  <button type="submit">Add to cart</button>
                </form>
                {cartUpdated ? <p>Product was added to cart</p> : ''}
            </div>
          </>
        ) }
      </div>
    </div>
    <Footer />
  </>
}

const containerStyle={
  display:"flex",
  alignItems:"center",
  gap:"16px"
  }
  const starContainerStyle={
  display:"flex"
  }


  function StarRating({maxRating = 5,
  color='#fcc419',
  size = 38,
  className = "",
  messages=[],
  defaultRating = 0
}){
    const [rating,setRating]=useState(defaultRating);
    const [tempRating,setTempRating] = useState(0);

    function handleRating(rating){
      setRating(rating)
    }
    const textStyle={
      lineHight:"1",
      margin:"0",
      color,
      fontSize :`${size / 1.5}px`
      };
    
    return(
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
        {Array.from({length:maxRating},(_,i)=>
         <Star
          key={i}
          onRate={()=>handleRating(i+1)}
          onHoverIn={()=>setTempRating(i+1)}
          onHoverOut={()=>setTempRating(0)}
          full={tempRating ? tempRating >= i+1 : rating >= i+1}
          color={color}
          size={size}
         />

          )
          }
          
        </div>
        <p style={textStyle}> { messages.length === maxRating
         ? messages[ tempRating ? tempRating -1 : rating -1] : tempRating || rating || ""}</p>
      </div>
    );
  }


function Star({onRate,onHoverIn,onHoverOut,full,color,size}){
const starStyle = {
  width:`${size}px`,
  height:`${size}px`,
  display:'block',
  cursor:'pointer'
}
  return(
            <span role="button" style={starStyle} onClick={onRate}
              onMouseEnter={onHoverIn}
             onMouseLeave={onHoverOut}>
           {full ?  <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
            >
            <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
            </svg>:<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
            </svg>
            }
            </span>

)
}
    


export default Product


