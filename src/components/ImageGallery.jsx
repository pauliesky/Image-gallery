// import React from 'react'
// import axios from "axios";
import { useEffect, useState, useRef } from "react";

const ImageGallery = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    function getMovies() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGIyNzQ3MjdkZjljNDAwNjA1MTdlZDMyYzRiZjc3YyIsInN1YiI6IjY1MDBiMmUzMWJmMjY2MDBmZmI1YzgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PWLOOpqYULjaJobOhKk1NEveHjKXt3kNxbd4EbSskHw",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=74b274727df9c40060517ed32c4bf77c ",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          let result = response.results;
          console.log(result);
          setData(result);
        })
        .catch((err) => console.error(err));
    }
    getMovies();
  }, []);
  console.log(data);

  const dragItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  return (
    <>
      <section>
        <nav>
          <img />
          <search>Search</search>
        </nav>
        <section className=" p-5  flex justify-center items-center">
          <article className="grid  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-6 gap-5">
            {data &&
              data.map((item, index) => {
                return (
                  <>
                    <img
                      onDragStart={(e) => dragStart(e, index)}
                      draggable
                      key={item.id}
                      className=" border-white border-1 shadow-xl shadow-slate-500 "
                      alt="Image"
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    />
                  </>
                );
              })}
          </article>
        </section>
      </section>
    </>
  );
};

export default ImageGallery;
