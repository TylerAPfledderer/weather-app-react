import { Link } from 'react-router-dom';

const btnStyle = {
  background: '#aaa',
  borderRadius: '31px',
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: `calc((44px - 1rem) / 2) 16px`,
  marginBottom: '16px',
  marginRight: '16px',
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
