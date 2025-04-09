'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MovieBase } from '../../utils/types';

export default function RecommendedMovies({
  setPosition,
  // selectedProviders,
  selectedCategories,
  // setSelectedMovies,
  selectedMovies,
  setSelectedRecommendedMovie,
}: {
  setPosition: (position: number) => void;
  // selectedProviders: { name: string; image: string; id: number }[];
  selectedCategories: { id: number; name: string }[];
  // setSelectedMovies: (selectedMovies: unknown[]) => void;
  selectedMovies: unknown[];
  setSelectedRecommendedMovie: (movie: MovieBase[]) => void;
}) {
  const key = process.env.NEXT_PUBLIC_TMDB_KEY;

  const [data, setData] = useState<MovieBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const page = 1;

  console.log('selectedCategory', selectedCategories);

  // Providers don't matter here, just for the recommendations
  // const url = `https://api.themoviedb.org/3/movie/${selectedMovies}/recommendations?language=en-US&page=1`;

  console.log('selectedMovies length ', selectedMovies.length);

  useEffect(() => {
    const fetchDataLoop = async () => {
      const pageNumbers: Set<number> = new Set();
      while (pageNumbers.size < 10) {
        const pageNumber = Math.floor(Math.random() * 10) + 1;
        pageNumbers.add(pageNumber);
      }

      let newData: MovieBase[] = [];
      for (const selectedMovie of selectedMovies as MovieBase[]) {
        const url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/recommendations?language=en-US&page=1&region=US&sort_by=popularity.desc&with_genres=${selectedCategories[0].id}&api_key=${key}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
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

  const selectedMovieIds: Set<number> = new Set(
    (selectedMovies as MovieBase[]).map((movie) => movie.id)
  );

  const uniqueRecs = (data as MovieBase[]).filter(
    (movie, index) =>
      !selectedMovieIds.has(movie.id) &&
      (data as MovieBase[]).findIndex((m) => m.id === movie.id) === index
  );

  const genreId = selectedCategories[0].id;
  let filteredRecs = uniqueRecs;
  if (genreId) {
    filteredRecs = uniqueRecs.filter((movie) =>
      movie.genre_ids.includes(Number(genreId))
    );
  }

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

  return (
    <div className=" w-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <div>
        <div style={{ margin: '0 auto' }} className="flex justify-between mb-4">
          <span onClick={() => setPosition(4)}>
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

        <div
          className="text-2xl font-extrabold text-center mb-4"
          style={{
            width: '100%',
            borderBottom: '5px solid rgb(236, 236, 236)',
          }}
        >
          {` List of recommended films`}
        </div>
        <div
          style={{ margin: '0 auto' }}
          className="overflow-auto flex h-[70vh] w-[90%] flex-wrap justify-center"
        >
          {filteredRecs.map((movie: MovieBase) => (
            <div
              onClick={() => {
                setSelectedRecommendedMovie([movie]);
                setPosition(5);
              }}
              key={movie.id}
              className={`border border-secondary shadow rounded rounded-lg cursor-pointer w-40 h-60 m-2 hover:border-primary hover:border relative`} // Added relative positioning
            >
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
      </div>
    </div>
  );
}
