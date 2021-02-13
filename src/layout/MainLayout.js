import InDepthLink from '../components/InDepthLink';
import { mainContainer, wrapper } from './MainLayout.module.scss';

const MainLayout = ({ children, date, linkPath, dayName, linkText }) => {
  return (
    <div className={mainContainer}>
      <div className={wrapper}>{children}</div>
      <InDepthLink date={date} path={linkPath} weekday={dayName}>{linkText}</InDepthLink>
    </div>
  );
};

export default MainLayout;
