'use client';
import { useState } from 'react';
import Landing from './landing';
import Provider from './provider';
import Categories from './categories';

export default function Home() {
  const [position, setPosition] = useState(1);
  return (
    <div>
      {position === 0 && <Landing setPosition={setPosition} />}
      {position === 1 && <Provider setPosition={setPosition} />}
      {position === 2 && <Categories setPosition={setPosition} />}
    </div>
  );
}
