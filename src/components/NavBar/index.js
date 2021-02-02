import { lazy, Suspense } from 'react';
import Header from './Header';
const NavList = lazy(() => import('./NavList'));

const NavBar = () => {
  return (
    <nav className='nav'>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <NavList />
      </Suspense>
    </nav>
  );
};

export default NavBar;
