import { BellIcon, SearchIcon, LogoutIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';
import BasicMenu from './BasicMenu';

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const { logout, isPending, error } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <header className={`${isScroll && 'bg-[#141414]'}`}>
      {/* left section */}
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='https://rb.gy/ulxxee'
          width={100}
          height={100}
          className='cursor-pointer object-contain'
        />
        <BasicMenu />

        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>New & Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>

      {/* right section */}
      <div className='flex items-center space-x-4 text-sm font-light'>
        <SearchIcon className='hidden sm:inline h-6 w-6 cursor-pointer' />
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6 cursor-pointer' />
        <Link href='/account'>
          <img
            // onClick={logout}
            src='https://rb.gy/g1pwyx'
            alt=''
            className='cursor-pointer rounded'
          />
        </Link>
        <LogoutIcon className='h-6 w-6 cursor-pointer' onClick={logout} />
      </div>
    </header>
  );
}

export default Header;
