import NavBar from './components/NavBar';
import Main from './components/Main';

import './css/weather-icons.min.css';
import './global_styles/base.scss';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <NavBar />
        <Main />
      </ErrorBoundary>
    </>
  );
}

export default App;
