import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../Utils/constants";
import { addPopularMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies= () =>{
    const dispatch=useDispatch();
    const popularMovies = useSelector((store)=> store.movies.popularMovies);

    const PopularMovie = async() =>{
        const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const json=await data.json();
        dispatch(addPopularMovies(json.results));
    }

    useEffect(()=>{
     !popularMovies && PopularMovie();
    },[])
}
export default usePopularMovies;