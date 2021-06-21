import React from 'react';
import css from './Slider.css';
import ReactDOM from 'react-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Swipe from 'react-easy-swipe';

import Pin_Icon from '../../assets/Pin_Icon.svg';

import { FormattedMessage } from '../../util/reactIntl';

// =========================
// Slide
// =========================

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    // const el = this.slide.current;
    // const r = el.getBoundingClientRect();
    // el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    // el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const {
      src,
      headline,
      location,
      index,
      link,
      showAllLink,
      itemsHeader,

      item1_link,
      item1_image,
      item1_header,
      item1_location,
      category1,
      item1_price,

      item2_link,
      item2_image,
      item2_header,
      item2_location,
      category2,
      item2_price,

      item3_link,
      item3_image,
      item3_header,
      item3_location,
      item3_price,
    } = this.props.slide;

    const current = this.props.current;
    let classNames = css.slide;

    // if (current === index) classNames += `${css.slide}${css.slide__current}`;
    if (current === index) classNames = `${css.slide} ${css.slide__current}`;
    else if (current - 1 === index) classNames += `${css.slide} ${css.slide__previous}`;
    else if (current + 1 === index) classNames += `${css.slide} ${css.slide__next}`;
    // else classNames += `${css.slide} ${css.slide__hidden}`;

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <h2 className={css.slide__items_headline_mobile}>{itemsHeader}</h2>

        <div className={css.slide__items}>
          <div>
            <h2 className={css.slide__items_headline}>{itemsHeader}</h2>

            <div className={css.slide__item}>
              <div
                className={css.slideLink}
                onClick={function() {
                  window.open(item1_link, '_blank');
                }}
              >
                <div className={css.slide__item_image_container}>
                  <img
                    className={css.slide__item_image}
                    alt={item1_header}
                    src={item1_image}
                    onLoad={this.imageLoaded}
                  />
                </div>
                <div className={css.slide__item_content}>
                  <p className={css.slide__item_name}>{item1_header}</p>
                  <p className={css.slide__item_location}>{item1_location}</p>
                  <img
                    className={css.category}
                    alt={category1}
                    src={category1}
                    onLoad={this.imageLoaded}
                  />
                  <p className={css.slide__item_price}>
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      <FormattedMessage id="Slider.from" />
                    </span>{' '}
                    {item1_price}
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      /<FormattedMessage id="Slider.night" />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className={css.slide__item}>
              <div
                className={css.slideLink}
                onClick={function() {
                  window.open(item2_link, '_blank');
                }}
              >
                <div className={css.slide__item_image_container}>
                  <img
                    className={css.slide__item_image}
                    alt={item2_header}
                    src={item2_image}
                    onLoad={this.imageLoaded}
                  />
                </div>
                <div className={css.slide__item_content}>
                  <p className={css.slide__item_name}>{item2_header}</p>
                  <p className={css.slide__item_location}>{item2_location}</p>
                  <img
                    className={css.category}
                    alt={category2}
                    src={category2}
                    onLoad={this.imageLoaded}
                  />
                  <p className={css.slide__item_price}>
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      <FormattedMessage id="Slider.from" />
                    </span>{' '}
                    {item2_price}
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      /<FormattedMessage id="Slider.night" />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className={`${css.slide__item} ${css.slide__item_last}`}>
              <div
                className={css.slideLink}
                onClick={function() {
                  window.open(item3_link, '_blank');
                }}
              >
                <div className={css.slide__item_image_container}>
                  <img
                    className={css.slide__item_image}
                    alt={item3_header}
                    src={item3_image}
                    onLoad={this.imageLoaded}
                  />
                </div>
                <div className={css.slide__item_content}>
                  <p className={css.slide__item_name}>{item3_header}</p>
                  <p className={css.slide__item_location}>{item3_location}</p>

                  <p className={css.slide__item_price}>
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      <FormattedMessage id="Slider.from" />
                    </span>{' '}
                    {item3_price}
                    <span style={{ fontWeight: 100, color: '#353535' }}>
                      /<FormattedMessage id="Slider.night" />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={css.slide__items_showAll}
              onClick={function() {
                window.open(showAllLink, '_blank');
              }}
            >
              <button className={css.slide__action}>
                <FormattedMessage id="Slider.showAll" />
              </button>
            </div>
          </div>
        </div>

        <div className={css.slide__image__wrapper}>
          <div
            className={css.slideLink}
            onClick={function() {
              window.open(link, '_blank');
            }}
          >
            <img className={css.slide__image} alt={headline} src={src} onLoad={this.imageLoaded} />
            <div className={css.slide__content}>
              <h2 className={css.slide__headline_header}>
                <FormattedMessage id="landing.story.header" />
              </h2>
              <h1 className={css.slide__headline}>{headline}</h1>

              <p className={css.slide__subHeadline}>
                <img src={Pin_Icon} width="30px" style={{ paddingRight: '10px' }}></img>
                <span className={css.location}>{location}</span>
              </p>
            </div>
            {/* <button className={css.slide__action}>{button}</button> */}
          </div>
        </div>
      </li>
    );
  }
}

// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return (
    // <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
    <button className={`${css.btn} btn--${type}`} title={title} onClick={handleClick}>
      {/* <svg className="icon" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg> */}

      <ExpandMoreIcon className={css.arrows} />
    </button>
  );
};

// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0, swipeTimeout: false };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.setState = this.setState.bind(this);

    this.onSwipeMove = this.onSwipeMove.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ? this.props.slides.length - 1 : previous,
    });
  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ? 0 : next,
    });
  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index,
      });
    }
  }

  onSwipeMove(position, event) {
    // console.log(`Moved ${position.x} pixels horizontally`, event);
    // console.log(`Moved ${position.y} pixels vertically`, event);
    if (this.state.swipeTimeout === false && position.x > 80) {
      this.setState({
        swipeTimeout: true,
      });
      this.handlePreviousClick();
      setTimeout(() => {
        this.setState({
          swipeTimeout: false,
        });
      }, 500);
    }

    if (this.state.swipeTimeout === false && position.x < -80) {
      this.setState({
        swipeTimeout: true,
      });
      this.handleNextClick();
      setTimeout(() => {
        this.setState({
          swipeTimeout: false,
        });
      }, 500);
    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      transform: `translateX(-${current * (100 / slides.length)}%)`,
    };

    return (
      <div className={css.slider} aria-labelledby={headingId}>
        <Swipe onSwipeMove={this.onSwipeMove}>
          <ul className={css.slider__wrapper} style={wrapperTransform}>
            {/* <h3 id={headingId} class="visuallyhidden">
            {heading}
          </h3> */}

            {slides.map(slide => {
              return (
                <Slide
                  key={slide.index}
                  slide={slide}
                  current={current}
                  handleSlideClick={this.handleSlideClick}
                />
              );
            })}
          </ul>
        </Swipe>

        <div className={css.slider__controls}>
          <button className={css.btn} onClick={this.handlePreviousClick}>
            <ExpandMoreIcon
              className={css.arrows}
              style={{ transform: 'translateX( 45%) rotate(90deg)' }}
            />
          </button>

          <button className={css.btn} onClick={this.handleNextClick}>
            <ExpandMoreIcon
              className={css.arrows}
              style={{ transform: 'translateX( 45%) rotate(270deg)' }}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Slider;
