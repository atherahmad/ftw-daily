import React from 'react';
import css from './Slider2.css';
import ReactDOM from 'react-dom';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Pencil from '../../assets/icons/pencil.png';

import Swipe from 'react-easy-swipe';

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
      subHeadline,
      subHeadlineNGO,
      linkName,
      linkNameNGO,
      linkExternal,
      link,
      index,
    } = this.props.slide;

    const current = this.props.current;
    let classNames = css.slide;

    const linkNameMaybe =
      linkName !== undefined ? (
        <span>
          {subHeadline}
          <FormattedMessage id="Slider2.firstPart" />{' '}
          <span className={css.linkName}>{linkName}</span>{' '}
          <FormattedMessage id="Slider2.secondPart" />
        </span>
      ) : null;

    const linkNameNGOMaybe =
      linkNameNGO !== undefined ? (
        <span>
          {subHeadlineNGO} <span className={css.linkName}>{linkNameNGO}</span>
        </span>
      ) : null;

    const linkExternalMaybe =
      linkExternal !== undefined ? <span className={css.linkName}>{linkExternal}</span> : null;

    // if (current === index) classNames += `${css.slide}${css.slide__current}`;
    if (current === index) classNames = `${css.slide} ${css.slide__current}`;
    else if (current - 1 === index) classNames += `${css.slide} ${css.slide__previous}`;
    else if (current + 1 === index) classNames += `${css.slide} ${css.slide__next}`;

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={css.slide__image__wrapper}>
          <div
            className={css.slideLink}
            onClick={function() {
              window.open(link, '_blank');
            }}
          >
            <img className={css.slide__image} alt={headline} src={src} onLoad={this.imageLoaded} />
            <div className={css.gradient}></div>
            <article className={css.slide__content}>
              <div className={css.quote}>”</div>

              <h1 className={css.slide__headline}>{headline}</h1>

              <p className={css.slide__subHeadline}>
                <div className={css.iconWrapper}>
                  <img src={Pencil} width="35px" style={{ marginRight: '10px' }}></img>
                </div>

                {linkNameMaybe}
                {linkNameNGOMaybe}

                {linkExternalMaybe}
              </p>
            </article>
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

      <ExpandMoreIcon className={css.arrows} style={{ fill: '#eb7472' }} />
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
        <div className={css.slider__controls}>
          <button className={css.btn} onClick={this.handlePreviousClick}>
            <ExpandMoreIcon
              className={css.arrows}
              style={{ fill: '#eb7472', transform: 'translateX( 45%) rotate(90deg)' }}
            />
          </button>

          <button className={css.btn} onClick={this.handleNextClick}>
            <ExpandMoreIcon
              className={css.arrows}
              style={{ fill: '#eb7472', transform: 'translateX( 45%) rotate(270deg)' }}
            />
          </button>
        </div>
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
      </div>
    );
  }
}

export default Slider;
