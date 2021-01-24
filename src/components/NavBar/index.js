import NavList from "./NavList";

const NavBar = () => {
  return (
    <nav className="nav">
      <header className="nav__header">
        <h1 className="site-title">5-Day Forecast</h1>
        <h2 className="city-name">Raleigh, North Carolina</h2>
      </header>
      <NavList />
    </nav>
  );
};

export default NavBar;
