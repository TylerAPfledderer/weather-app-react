import { bg_blur } from "./Card.module.scss";

const Card = ({ children, classList }) => {
	return (
		<div
			className={`${classList} ${bg_blur} d-flex flex-column align-items-center rounded-lg shadow p-4 text-center col-2`}
		>
			{children}
		</div>
	);
};

export default Card;
