import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map, size } from "lodash";
//lo hacemos fuera del componente porque es algo que no va  varias,
// es una constante con datos
//infinite es que vuelva al principio
//El slider se va activar siempre y cuando no quepan todas las imagenes
const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  swipeToSlider: true,
};
export default function CarouselScreenshots(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
            onClick={() => openImage(screenshot.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
