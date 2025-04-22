import React from 'react';
import { XIcon } from 'lucide-react';
import { MovieBase } from '../../utils/types';

export function SelectedMoviesList({
  selectedMovies,
  setSelectedMovies,
}: {
  selectedMovies: MovieBase[];
  setSelectedMovies: (selectedMovies: MovieBase[]) => void;
}) {
  return (
    <div className="w-full ">
      <div className="flex overflow-x-auto scrollbar-hide mt-2 mb-2 pb-2">
        <div className="flex gap-2">
          {selectedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-1 bg-primaryHover text-white rounded-lg"
            >
              <span>{movie.title}</span>
              <button
                onClick={() =>
                  setSelectedMovies(
                    selectedMovies.filter(
                      (selectedMovie) => selectedMovie.id !== movie.id
                    )
                  )
                }
                className="flex items-center justify-center"
                aria-label={`Remove ${movie.title} filter`}
              >
                <XIcon size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
