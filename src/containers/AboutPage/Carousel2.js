import React from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  PREV,
  NEXT,
} from './CarouselComponents';
import css from './AboutPage.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
const initialState = { pos: 0, sliding: false, dir: NEXT };

const Carousel2 = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const numItems = React.Children.count(props.children);
  const slide = dir => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: 'stopSliding' });
    }, 50);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <div {...handlers}>
      <CarouselContainer dir={state.dir} sliding={state.sliding}>
        {React.Children.map(props.children, (child, index) => (
          <CarouselSlot key={index} order={getOrder({ index: index, pos: state.pos, numItems })}>
            {child}
          </CarouselSlot>
        ))}
      </CarouselContainer>

      <div className={css.SwipeButtonContainer}>
        <div
          className={state.pos === 0 ? css.SwipeButton_disabled : css.SwipeButton}
          onClick={() => slide(PREV)}
          float="left"
        >
          <ExpandMoreIcon
            className={css.arrows}
            style={{ fill: '#eb7472', transform: 'translate(-50%, -50%) rotate(90deg)' }}
          />
        </div>
        <div className={css.SwipeButton} onClick={() => slide(NEXT)} float="right">
          <ExpandMoreIcon
            className={css.arrows}
            style={{ fill: '#eb7472', transform: 'translate(-50%, -50%) rotate(270deg)' }}
          />
        </div>
      </div>
    </div>
  );
};

function reducer(state, { type, numItems }) {
  switch (type) {
    case 'reset':
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1,
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1,
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Carousel2;
