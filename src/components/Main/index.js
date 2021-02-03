import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { main } from './Main.module.scss';
const CurrentForecast = lazy(() => import('./CurrentForecast'));
const ForecastInDepth = lazy(() => import('./ForecastInDepth'));

const Main = () => {
  return (
    <main className={main}>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route exact path='/' component={CurrentForecast} />
          <Route path='/forecast-in-depth/:index' component={ForecastInDepth} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;
