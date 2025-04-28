'use client';
import { useState } from 'react';
// import Landing from './landing';
import Landing2 from './landing2';

import Provider from './provider';
import Categories from './categories';
import SelectMovies from './selectMovies';
import RecommendedMovies from './recommendedMovies';
import Movie from './movie';
import { MovieBase } from '../../utils/types';

export default function Home() {
  const [position, setPosition] = useState(0);
  const [selectedProviders, setSelectedProviders] = useState<
    { name: string; image: string; id: number }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedMovies, setSelectedMovies] = useState<MovieBase[]>([]);
  const [selectedRecommendedMovie, setSelectedRecommendedMovie] = useState<
    MovieBase[]
  >([]);

  console.log(selectedRecommendedMovie, ' recMovie page.tsx');
  return (
    <div>
      {/* {position === 0 && <Landing setPosition={setPosition} />} */}
      {position === 0 && <Landing2 setPosition={setPosition} />}

      {position === 1 && (
        <Provider
          setPosition={setPosition}
          selectedProviders={selectedProviders}
          setSelectedProviders={setSelectedProviders}
        />
      )}
      {position === 2 && (
        <Categories
          setPosition={setPosition}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      )}
      {position === 3 && (
        <SelectMovies
          setPosition={setPosition}
          // selectedMovies={selectedProviders}
          selectedCategories={selectedCategories}
          setSelectedMovies={setSelectedMovies}
          selectedMovies={selectedMovies}
        />
      )}
      {position === 4 && (
        <RecommendedMovies
          setPosition={setPosition}
          // selectedProviders={selectedProviders}
          selectedCategories={selectedCategories}
          selectedMovies={selectedMovies}
          setSelectedRecommendedMovie={setSelectedRecommendedMovie}
        />
      )}
      {position === 5 && (
        <Movie
          setPosition={setPosition}
          selectedCategories={selectedCategories}
          selectedRecommendedMovie={selectedRecommendedMovie}
        />
      )}
    </div>
  );
}
