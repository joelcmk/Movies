import { Play } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center">
      <div className="flex items-center gap-2 mt-8">
        <Play size={32} className="text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">StreamSelect</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="relative w-[400px]"></div>
        <button className="mt-8 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          Search for movie
        </button>
        <Link href="/landing">
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            Find you what to watch next
          </button>
        </Link>
      </div>
    </main>
  );
}
