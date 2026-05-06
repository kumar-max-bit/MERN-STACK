import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImages';

function CarouselContainer() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <CarouselImage text="https://static.vecteezy.com/system/resources/thumbnails/054/970/775/small/tiny-shopping-cart-on-computer-keyboard-symbolizes-online-shopping-and-e-commerce-vibrant-background-adds-modern-touch-to-concept-photo.jpeg" />
        <Carousel.Caption>
          <h3>Mega Clearance Sale</h3>
          <p>Get up to 50% off on all items! Shop now before stock runs out.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <CarouselImage text="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4SOlGkXMzEaFAvqjSQM1Kq-vJFLYKl-Rvw&s" />
        <Carousel.Caption>
          <h3>New Arrivals</h3>
          <p>Discover the latest trends in fashion and electronics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="https://png.pngtree.com/thumb_back/fh260/background/20230618/pngtree-swiss-e-commerce-a-3d-rendered-shopping-experience-for-social-media-image_3639492.jpg" />
        <Carousel.Caption>
          <h3>Premium Quality</h3>
          <p>
            Experience the best products curated just for you.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselContainer;