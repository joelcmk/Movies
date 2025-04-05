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

  // const [selectedCategories, setSelectedCategories] = useState<
  //   { id: number; name: string }[]
  // >([]);
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

  // console.log('selectedCategories', selectedCategories);

  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-screen bg-background">
      {/* {} */}
      <div>
        <div className="h-1/4 flex flex-col justify-evenly ">
          <span
            onClick={() => setPosition(1)}
            className="flex justify-between h-[30px]"
          >
            {/* <Image
              className=" cursor-pointer border border-primaryHover shadow rounded w-10 p-2"
              src="/back.png"
              alt="back button"
              width={20}
              height={20}
            /> */}
            <Image
              className="w-10 "
              src="/logo_2.png"
              alt="logo"
              width={20}
              height={20}
            />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-left">
              Select a Category
            </h1>
            <p
              style={{ margin: '0 auto' }}
              className="max-w-[380px] text-left text-gray-500 mt-2"
            >
              We&apos;ll take care of the rest!
            </p>
            <div className="relative p-0 m-0">
              <input
                className="border border-primary shadow rounded py-2 px-3 w-full mt-4 text-primary placeholder-primaryHover pl-8"
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
        <div className="w-[370px] h-3/4">
          <div className="overflow-auto h-[400px] mt-5 justify ">
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
                className={`flex items-center gap-2 mt-2 hover:bg-secondary h-10 rounded-lg cursor-pointer hover:border-primary hover:border ${
                  selectedCategories.includes(category) &&
                  'bg-secondary border-primary border'
                }`}
              >
                {/* <Image
                className="ml-5"
                src={provider.image}
                alt={provider.name}
                width={30}
                height={30}
              /> */}
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
          <div className="flex justify-center mt-5 max-w-[380px]">
            <button
              onClick={() => setPosition(3)}
              type="button"
              className="w-[95%] disabled:opacity-75 text-white bg-primary enabled:hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              disabled={selectedCategories.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
