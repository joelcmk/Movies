'use client';
import { useState } from 'react';
import Landing from './landing';
import Provider from './provider';
import Categories from './categories';
import SelectMovies from './selectMovies';
import RecommendedMovies from './recommendedMovies';
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

  return (
    <div>
      {position === 0 && <Landing setPosition={setPosition} />}
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
        />
      )}
    </div>
  );
}
