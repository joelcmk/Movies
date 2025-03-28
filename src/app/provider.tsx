import Image from 'next/image';
import { useState } from 'react';

export default function Provider({
  setPosition,
}: {
  setPosition: (position: number) => void;
}) {
  const providers = [
    { name: 'Netflix', image: '/netflix.png' },
    { name: 'Hulu', image: '/hulu.png' },
    { name: 'Amazon Prime', image: '/amazon.png' },
    { name: 'Disney', image: '/disney.png' },
    { name: 'Apple TV', image: '/apple.png' },
  ];

  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  return (
    <div className=" flex flex-col items-center min-h-screen bg-background">
      <div>
        <div className="mb-20"></div>
        <h1 className="text-3xl font-extrabold text-center">
          Select your providers
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
          {providers.map((provider) => (
            <div
              onClick={() => {
                if (selectedProviders.includes(provider.name)) {
                  setSelectedProviders(
                    selectedProviders.filter(
                      (selectedProvider) => selectedProvider !== provider.name
                    )
                  );
                  return;
                }
                setSelectedProviders([...selectedProviders, provider.name]);
              }}
              key={provider.name}
              className={`flex items-center gap-2 mt-2 hover:bg-secondary h-10 rounded-lg cursor-pointer hover:border-primary hover:border ${
                selectedProviders.includes(provider.name) &&
                'bg-secondary border-primary border'
              }`}
            >
              <Image
                className="ml-5"
                src={provider.image}
                alt={provider.name}
                width={30}
                height={30}
              />
              <span>{provider.name}</span>
              <div className="ml-auto mr-5">
                {selectedProviders.includes(provider.name) && (
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
            className="w-[95%] disabled:opacity-75 text-white bg-primary enabled:hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={selectedProviders.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
