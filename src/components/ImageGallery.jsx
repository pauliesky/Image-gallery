/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import wallpaper from "../assets/wallpaper.jpg";
import gallery_logo from "../assets/gallery.png";
import { MoonLoader } from "react-spinners";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";

const ImageGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "auto",
    left: "0px",
    top: "0px",
  };
  console.log(auth.listUser);
  // let navigate = useNavigate();
  useEffect(() => {
    function getMovies() {
      setLoading(true);
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
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }

    // function tokenCheck() {
    //   let authToken = sessionStorage.getItem("Auth Token");
    //   console.log(authToken);
    //   if (authToken) {
    //     navigate("/image-gallery");
    //   }

    //   if (!authToken) {
    //     navigate("/sign-in");
    //   }
    // }

    // tokenCheck();
    getMovies();
  }, []);

  console.log(data);

  const SortTableUser = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <img
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        // key={item.id}
        className=" h-[200px]  border-white border-8 shadow-lg shadow-slate-300 "
        alt="Image"
        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
      />
    );
  };
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setData((data) => {
      const oldIndex = data.findIndex((data) => data.id === active.id);
      const newIndex = data.findIndex((data) => data.id === over.id);
      return arrayMove(data, oldIndex, newIndex);
    });
  };

  return (
    <>
      <section>
        <nav className="absolute z-10 flex justify-around w-full top-10 items-center">
          <img className="h-16" alt="logo" src={gallery_logo} />
          <span className="text-cyan-900  font-bold text-4xl">
            ImageGallery
          </span>
        </nav>
        <hero className="relative">
          <img className="w-full h-[80vh] " alt="wallpaper" src={wallpaper} />
          <input
            type="search"
            placeholder="Search"
            className="rounded-lg outline-none  bg-white absolute z-10 w-1/2 top-1/2 left-1/4 p-5  "
          />
        </hero>
        <section className=" px-16 py-5  flex justify-center items-center">
          {loading && <MoonLoader cssOverride={override} color="#7E1F86" />}

          <article className="grid  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5 gap-5">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={data}
                strategy={verticalListSortingStrategy}
              >
                {data.map((item) => {
                  return (
                    <>
                      <SortTableUser key={item.id} item={item}></SortTableUser>
                    </>
                  );
                })}
              </SortableContext>
            </DndContext>
          </article>
        </section>
      </section>
    </>
  );
};

export default ImageGallery;
