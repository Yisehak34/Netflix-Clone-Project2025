import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

export default function Banner() {
  const [movie, setMovie] = useState({});

  // Fetch a random Netflix Original movie on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        // console.log(request);
        const movies = request.data.results;

        if (movies && movies.length > 0) {
          setMovie(movies[Math.floor(Math.random() * movies.length)]);
        } else {
          console.error("No movies found");
        }
      } catch (error) {
        console.error("Error fetching Netflix originals", error);
      }
    }

    fetchData();
  }, []);
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button play">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
