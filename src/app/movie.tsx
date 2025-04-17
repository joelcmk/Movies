'use client';

import Image from 'next/image';
// import { useEffect, useState } from 'react';
import { MovieBase } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Movie({
  setPosition,
  // selectedProviders,
  selectedCategories,
  selectedRecommendedMovie,
}: // setSelectedMovies,

{
  setPosition: (position: number) => void;
  // selectedProviders: { name: string; image: string; id: number }[];
  selectedCategories: { id: number; name: string }[];
  // setSelectedMovies: (selectedMovies: unknown[]) => void;

  selectedRecommendedMovie: MovieBase[];
}) {
  console.log('selectedCategory', selectedCategories);

  function getDecimal(floatNum: number) {
    const whole = Math.floor(floatNum);
    const decimal = (floatNum - whole).toFixed(2);
    return parseFloat(decimal) * 100;
  }

  function getWhole(floatNum: number) {
    const whole = Math.floor(floatNum);

    return whole;
  }

  const rating = selectedRecommendedMovie[0].vote_average;

  const ratingDecimal = getDecimal(rating);
  const ratingWhole = getWhole(rating);

  console.log(ratingDecimal, 'ratingDecimal');

  console.log(ratingWhole, 'ratingWhole');

  const movie = selectedRecommendedMovie[0];

  return (
    <div className="h-full w-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          borderBottom: '5px solid rgb(236, 236, 236)',
        }}
        className="flex justify-between p-2 mb-4"
      >
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
      <div className="flex flex-wrap md:flex-nowrap w-[100%] md:max-w-[80%]">
        {/* Poster image */}
        <Image
          style={{ objectFit: 'contain' }}
          className="rounded rounded-lg m-3 w-[90%] md:w-[30%]"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Movie_poster"
          height={300}
          width={200}
        />
        <div className="m-3 md:w-60%">
          {/* Rating */}
          <div className="flex items-center">
            {Array.from({ length: 10 }).map((_, index) =>
              index < ratingWhole ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-primary"
                />
              ) : index == ratingWhole && ratingDecimal !== 0 ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="svg-inline--fa fa-star text-secondary"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#6629FE" />
                      <stop offset={`${ratingDecimal}%`} stopColor="#6629FE" />
                      <stop offset={`${ratingDecimal}%`} stopColor="#d1d5da" />
                      <stop offset="100%" stopColor="#d1d5da" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#gradient-${index})`}
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  ></path>
                </svg>
              ) : (
                <FontAwesomeIcon // Default case when neither condition is met
                  key={index}
                  icon={faStar}
                  className="text-secondary"
                />
              )
            )}
            <h3 className="text-lg font-bold ml-3">
              Rating {movie.vote_average.toFixed(2)}
            </h3>
          </div>

          <div className="mt-3">
            <h3 className="text-2xl font-bold text-primary">Description</h3>
            {movie.overview}
          </div>
          <div>{/* <h2>Where to watch</h2> */}</div>
        </div>
      </div>
    </div>
  );
}
