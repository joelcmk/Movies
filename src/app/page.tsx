'use client';
import { useState } from 'react';
import Landing from './landing';

export default function Home() {
  const [position, setPosition] = useState(0);
  return <div>{position === 0 && <Landing setPosition={setPosition} />}</div>;
}
