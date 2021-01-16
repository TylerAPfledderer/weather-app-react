import Card from "./Card"

const FollowingDay = ({dayNum, monthDay, minTemp, maxTemp, src}) => {
    return (
        <Card classList={"ml-4"}>
            <h3>{dayNum}</h3>
            <span>{monthDay}</span>
            <div className="d-flex flex-column">
                <span>
                    {minTemp} &#176;F / {maxTemp} &#176;F
                </span>
                <img
                    src={src}
                    alt=""
                />
            </div>            
        </Card>
    );
}

export default FollowingDay;