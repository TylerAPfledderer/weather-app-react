import { Link } from 'react-router-dom';

const btnStyle = {
  background: 'rgba(0,0,0,0.5)',
  boxShadow: '0 5px 10px 0 rgba(255,255,255,0.3)',
  borderRadius: '31px',
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: `calc((44px - 1rem) / 2) 16px`,
  margin: '16px 16px 16px 0',
  alignSelf: 'flex-end'
};

const InDepthLink = ({ date, path, children, weekday }) => {
  return (
    <Link
      to={{ pathname: path, thisDate: date, weekDay: weekday }}
      style={btnStyle}
    >
      {children}
    </Link>
  );
};

export default InDepthLink;
