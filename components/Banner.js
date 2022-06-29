import Image from 'next/image';
import { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movie';

function Banner({ netflixOriginals }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log(movie);

  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 pl-6'>
      <div className='absolute top-0 left-0 h-[95vh] -z-10 w-screen'>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <h1 className='text-2xl font-bold lg:text-7xl md:text-4xl'>
        {movie?.title || movie?.name}
      </h1>
      <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
        {movie?.overview}
      </p>
    </div>
  );
}

export default Banner;
