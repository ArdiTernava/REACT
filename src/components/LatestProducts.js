import React from 'react';
import slide from "../slide.png";
import {Link} from 'react-router-dom';

function LatestProducts({movies}) {
  return (
    <div className="bg-primary p-60">
    <div className="container-column">
        <h2 className="text-center">Latest products</h2>
        <div className="products">
          {movies && movies.map(movie => (
            <div className="product">
              <Link to={`/product/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
              </Link>
              <div className="details">
                <h3><Link to={`/product/${movie.id}`}>{movie.original_title}</Link></h3>
                <p>Popularity: {movie.popularity}</p>
                <Link to={`/product/${movie.id}`} className="details-btn">Details</Link>
              </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestProducts