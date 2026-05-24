const CarouselImage = (props) => {
  return (
    <div>
      <img src={props.text} style={{ height: "450px", width: "100%", objectFit: "cover" }} alt="Banner" />
    </div>
  )
}

export default CarouselImage;
