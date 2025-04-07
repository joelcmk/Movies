'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function Categories({
  setPosition,
  selectedCategories,
  setSelectedCategories,
}: {
  setPosition: (position: number) => void;
  selectedCategories: Category[];
  setSelectedCategories: (selectedCategories: Category[]) => void;
}) {
  const categories = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  const [category, setCategory] = useState<string>('');
  const [filteredCategories, setFilteredCategories] =
    useState<{ id: number; name: string }[]>(categories);

  const handleShearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCategory(searchTerm);

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(filteredCategories);
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-background">
      <div
        className="w-full pb-2"
        style={{ width: '100%', borderBottom: '5px solid rgb(236, 236, 236)' }}
      >
        <div
          className="flex justify-between"
          style={{
            borderBottom: '2px solid rgb(236, 236, 236)',
          }}
        >
          <Image
            className=" m-2 h-8"
            src="/logo_2.png"
            alt="logo"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl max-w-[380px] font-extrabold text-left">
            Select a Category
          </h1>
          <p className="max-w-[380px] text-left text-gray-500">
            We&apos;ll take care of the rest!
          </p>
          <div className="relative min-w-[370px] p-0 m-0">
            <input
              className="border border-primary shadow rounded py-2 px-3 w-full mt-2 text-primary placeholder-primaryHover pl-8"
              type="text"
              placeholder="Seach"
              value={category}
              onChange={handleShearch}
            />
            <Image
              style={{ position: 'absolute', bottom: 10, left: 10 }}
              src="/search.png"
              alt="search icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: 'rgb(236, 236, 236)' }}
        className="w-full flex flex-col items-center "
      >
        <div
          className="overflow-auto w-[40%] justify h-[65vh] "
          style={{ backgroundColor: 'white' }}
        >
          {filteredCategories.map((category) => (
            <div
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(
                    selectedCategories.filter(
                      (selectedCategory) =>
                        selectedCategory.name !== category.name
                    )
                  );
                  return;
                }
                setSelectedCategories([category]);
              }}
              key={category.name}
              className={`flex items-center gap-5 mt-2 hover:bg-secondary  rounded-lg cursor-pointer hover:border-primary hover:border ${
                selectedCategories.includes(category) &&
                'bg-secondary border-primary border'
              }`}
            >
              <span className="ml-5">{category.name}</span>
              <div className="ml-auto mr-5">
                {selectedCategories.includes(category) && (
                  <Image
                    src="/checkbox.png"
                    alt="checkbox"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-full flex flex-col items-center"
          style={{
            width: '100%',
            borderTop: '5px solid rgb(236, 236, 236)',
            backgroundColor: 'white',
          }}
        >
          <button
            onClick={() => setPosition(3)}
            type="button"
            className="min-w-[370px] disabled:opacity-75 m-2 text-white bg-primary enabled:hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={selectedCategories.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
