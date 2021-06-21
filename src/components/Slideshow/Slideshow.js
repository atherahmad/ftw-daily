import React from 'react';
import { Fade } from 'react-slideshow-image';
import image1 from '../../assets/landingPage/chumbeisland.jpg';
import image2 from '../../assets/landingPage/chumbeisland.jpg';
import image3 from '../../assets/Mana_light2.png';
import image4 from '../../assets/radoslav-bali.png';

import css from './Slideshow.css';

const fadeImages = [image1, image2, image3, image4];

const fadeProperties = {
  duration: 2500,
  transitionDuration: 1500,
  infinite: true,
  indicators: false,
  nav: false,
  arrows: false,
  // onChange: (oldIndex, newIndex) => {
  //   console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  // },
};

const Slideshow = () => {
  return (
    <div className={css.slide_container}>
      <Fade {...fadeProperties}>
        <div className={css.each_fade}>
          <div className={css.image_container}>
            <img src={fadeImages[0]} />
          </div>
        </div>
        <div className={css.each_fade}>
          <div className={css.image_container}>
            <img src={fadeImages[1]} />
          </div>
        </div>
        {/* <div className={css.each_fade}>
          <div className={css.image_container}>
            <img src={fadeImages[2]} />
          </div>
        </div>
        <div className={css.each_fade}>
          <div className={css.image_container}>
            <img src={fadeImages[3]} />
          </div>
        </div> */}
      </Fade>
    </div>
  );
};

export default Slideshow;
