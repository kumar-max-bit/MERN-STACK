const DisplayMyDetails = (props) => {
  return (
    <>
      <h3><u>My Details</u></h3>
      <h4> Name: {props.fulldetails?.[0]}</h4>
      <h4> Roll No: {props.fulldetails?.[1]}</h4>
      <h4> Department: {props.fulldetails?.[2]}</h4>
      <h4> College: {props.fulldetails?.[3]}</h4>
      
    </>
  );
};

export default DisplayMyDetails;
