import Image from 'next/image';

export default function Lnading({
  setPosition,
}: {
  setPosition: (value: number) => void;
}) {
  return (
    <div className="justify-center flex flex-col items-center min-h-screen bg-background">
      <div>
        <div className="mb-20">
          <Image
            style={{ margin: '0 auto' }}
            src="/logo.png"
            alt="Movibi logo"
            width={300}
            height={38}
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center">
          Find your next movie
        </h1>
        <p
          style={{ margin: '0 auto' }}
          className="max-w-[380px] text-center text-gray-500 mt-2"
        >
          Now your finances are in one place and always under control
        </p>
        <div className="flex justify-center mt-8 max-w-[380px]">
          <button
            onClick={() => setPosition(2)}
            type="button"
            className="w-[95%] text-white bg-primary hover:bg-primaryHover focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none "
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
