import Poll from "./Poll";

const PollList = ({ ids }) => {
  return <div>{ids ? ids.map((id) => <Poll id={id} key={id} />) : null}</div>;
};

export default PollList;
