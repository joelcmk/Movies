'use client';
import { use } from 'react';

export default function Test({ movies }: { movies: unknown }) {
  const allmovies = use(movies);

  console.log(allmovies);

  return (
    <ul>
      {/* {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))} */}
      kdld
    </ul>
  );
}
