import Image from 'next/image';
import { useState } from 'react';

export default function Categories({
  setPosition,
}: {
  setPosition: (position: number) => void;
}) {
  const categories = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'TV Movie',
    'War',
    'Western',
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className=" flex flex-col items-center min-h-screen bg-background">
      <span className="mt-5">
        <Image src="/back.png" alt="back button" width={20} height={20} />
      </span>
      <div>
        <div className="mb-5"></div>
        <h1 className="text-3xl font-extrabold text-center">
          Select a Category
        </h1>
        <p
          style={{ margin: '0 auto' }}
          className="max-w-[380px] text-center text-gray-500 mt-2"
        >
          Don’t worry! It happens. Please enter the email associated with your
          account.
        </p>
        <div className="relative p-0 m-0">
          <input
            className="border border-primary shadow rounded py-2 px-3 w-full mt-4 text-primary placeholder-primaryHover pl-8"
            type="text"
            placeholder="Seach"
          />
          <Image
            style={{ position: 'absolute', bottom: 10, left: 10 }}
            src="/search.png"
            alt="search icon"
            width={20}
            height={20}
          />
        </div>
        <div>
          {categories.map((category) => (
            <div
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(
                    selectedCategories.filter(
                      (selectedCategory) => selectedCategory !== category
                    )
                  );
                  return;
                }
                setSelectedCategories([...selectedCategories, category]);
              }}
              key={category}
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
              <span className="ml-5">{category}</span>
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
        <div className="flex justify-center mt-8 max-w-[380px]">
          <button
            onClick={() => setPosition(2)}
            type="button"
            className="w-[95%] text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
