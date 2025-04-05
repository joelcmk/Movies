'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MovieBase } from '../../utils/types';

export default function SelectMovies({
  setPosition,
  // selectedProviders,
  selectedCategories,
  setSelectedMovies,
  selectedMovies,
}: {
  setPosition: (position: number) => void;
  // selectedProviders: { name: string; image: string; id: number }[];
  selectedCategories: { id: number; name: string }[];
  setSelectedMovies: (selectedMovies: MovieBase[]) => void;
  selectedMovies: MovieBase[];
}) {
  const key = process.env.NEXT_PUBLIC_TMDB_KEY;

  // const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=6&region=US&sort_by=popularity.desc&with_genres=${
  //   selectedCategories[0].id
  // }&with_watch_providers=${selectedProviders.map(
  //   (provider) => provider.id
  // )}&api_key=${key}`;

  const [data, setData] = useState<MovieBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const page = 1;

  // console.log(selectedMovies);

  // Providers don't matter here, just for the recommendations
  // const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&region=US&sort_by=popularity.desc&with_genres=${selectedCategories[0].id}&api_key=${key}`;

  useEffect(() => {
    const fetchDataLoop = async () => {
      const pageNumbers: Set<number> = new Set();
      // while (pageNumbers.size < 10) {
      //   const pageNumber = Math.floor(Math.random() * 10) + 1;
      //   pageNumbers.add(pageNumber);
      // }

      for (let i = 1; i <= 10; i++) {
        pageNumbers.add(i);
      }

      let newData: MovieBase[] = [];
      for (const pageNumber of pageNumbers) {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&region=US&sort_by=popularity.desc&with_genres=${selectedCategories[0].id}&api_key=${key}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          console.log(jsonData);
          newData = [...newData, ...jsonData.results];
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      }
      setData(newData);
      setLoading(false);
    };
    fetchDataLoop();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p>Error: {error}</p>
      </div>
    );
  }

  // console.log('data ' + data + ' data.results ' + data.results);
  // if (!data || !data.results) {
  //   return (
  //     <div className="h-screen flex items-center justify-center bg-background">
  //       <p>No data to display.</p>
  //     </div>
  //   );
  // }

  const deleteDuplicatedMovies = (movies: MovieBase[]) => {
    const uniqueMovieIds = new Set();
    const uniqueMovies = movies.filter((movie) => {
      if (!uniqueMovieIds.has(movie.id)) {
        uniqueMovieIds.add(movie.id);
        return true;
      }
      return false;
    });
    return uniqueMovies;
  };

  const cleanData = deleteDuplicatedMovies(data);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <div>
        <div
          style={{ margin: '0 auto' }}
          className="flex justify-between w-[370px] mb-4"
        >
          <span onClick={() => setPosition(2)}>
            <Image
              className=" cursor-pointer border border-primaryHover shadow rounded w-10 p-2"
              src="/back.png"
              alt="back button"
              width={20}
              height={20}
            />
          </span>
          <Image src="/logo_2.png" alt="logo" width={20} height={20} />
        </div>

        <div className="text-2xl font-extrabold text-center mb-4">
          {` Select 3-4 ${selectedCategories[0].name} films`}
        </div>
        <div
          style={{ margin: '0 auto' }}
          className="overflow-auto flex h-[500px] w-[90%] flex-wrap justify-center"
        >
          {cleanData.map((movie: MovieBase) => (
            <div
              onClick={() => {
                if (
                  selectedMovies.some(
                    (selectedMovie) => selectedMovie.id === movie.id
                  )
                ) {
                  setSelectedMovies(
                    selectedMovies.filter(
                      (selectedMovie) => selectedMovie.id !== movie.id
                    )
                  );
                  return;
                }
                setSelectedMovies([...selectedMovies, movie]);
              }}
              key={movie.id}
              className={`border border-secondary shadow rounded rounded-lg cursor-pointer w-40 h-60 m-2 hover:border-primary hover:border relative`} // Added relative positioning
            >
              <Image
                className="rounded rounded-lg absolute top-1 right-1"
                src={`/checkbox.png`}
                alt="checkbox"
                width={20}
                height={20}
                style={{
                  display: selectedMovies.some(
                    (selectedMovie) => selectedMovie.id === movie.id
                  )
                    ? 'block'
                    : 'none',
                }}
              />
              <Image
                style={{ objectFit: 'contain' }}
                className="rounded rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="back button"
                height={300}
                width={200}
              />
            </div>
          ))}
        </div>
        <div style={{ margin: '0 auto' }} className="mt-5 w-[370px]">
          <button
            onClick={() => setPosition(4)}
            type="button"
            className="w-full disabled:opacity-75 text-white bg-primary enabled:hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
            disabled={selectedMovies.length < 3}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
