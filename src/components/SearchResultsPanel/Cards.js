
import React from 'react';
import css from './SearchResultsPanel.css';
import { ListingCard } from '../../components';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardRenderSizes: [
        '(max-width: 767px) 100vw',
        `(max-width: 1023px) ${50}vw`,
        `(max-width: 1920px) ${62.5 / 2}vw`,
        `${62.5 / 3}vw`,
      ].join(', '),
      current: 0,
      length: props.array.length
    }
  }
  nextSlide = () => {
    this.setState(this.state.current === this.state.length - 1 ? { current: 0 }
      : { current: this.state.current + 1 });
  };
  prevSlide = () => {
    this.setState(this.state.current === 0 ? { current: this.state.length - 1 }
      : { current: this.state.current - 1 });
  };
  render() {
    return (
      <section className={css.cards_slider}>
        <div className={css.slider_btns}>
          <div className={css.slider__controls}>
            <button className={css.btn} onClick={this.prevSlide} >
              <ExpandMoreIcon
                className={css.arrows}
                style={{ transform: 'translateX( 45%) rotate(90deg)' }}
              />
            </button>
            <button className={css.btn} onClick={this.nextSlide} >
              <ExpandMoreIcon
                className={css.arrows}
                style={{ transform: 'translateX( 45%) rotate(270deg)' }}
              />
            </button>
          </div>
        </div>
        {
      this.props.array.map((slide, index) => {
        return (
          <div
            className={index === this.state.current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === this.state.current && (
              <ListingCard
                className={css.listingCard}
                key={slide.id.uuid}
                listing={slide}
                renderSizes={this.state.cardRenderSizes}
                setActiveListing={this.props.setActiveListing}
              />
            )}
          </div>
        );
      })
    }
      </section >
    )
  }

}

// class Cards extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cardRenderSizes: [
//         '(max-width: 767px) 100vw',
//         `(max-width: 1023px) ${50}vw`,
//         `(max-width: 1920px) ${62.5 / 2}vw`,
//         `${62.5 / 3}vw`,
//       ].join(', '),
//     };
//   }
//   render() {
//     // console.log(this.props);
//     const cardData = this.props.array;
//     return (
//       <section className={css.cardWrapper}>
//         {cardData.map((card, i) => {
//           return (
//             <div className={css.card} id="card" style={this.props.cardStyle} key={i}>
//               <ListingCard
//                 className={css.listingCard}
//                 key={card.id.uuid}
//                 listing={card}
//                 renderSizes={this.state.cardRenderSizes}
//                 setActiveListing={this.props.setActiveListing}
//               />
//             </div>
//           );
//         })}
//       </section>
//     );
//   }
// }

// export default class Display extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentCard: 0,
//       position: 0,
//       cardStyle: {
//         transform: 'translateX(0px)',
//       },
//       width: 0,
//     };
//   }

//   componentDidMount() {
//     let boxWidth = document.getElementById('card').clientWidth;
//     this.setState({ width: boxWidth });
//   }

//   // func: click the slider buttons
//   handleClick(type) {
//     // get the card's margin-right
//     let margin = window.getComputedStyle(document.getElementById('card')).marginRight;
//     margin = JSON.parse(margin.replace(/px/i, ''));

//     const cardWidth = this.state.width; // the card's width
//     const cardMargin = margin; // the card's margin
//     const cardNumber = this.props.array.length; // the number of cards
//     let currentCard = this.state.currentCard; // the index of the current card
//     let position = this.state.position; // the position of the cards

//     // if (current === index) classNames = `${css.slide} ${css.slide__current}`;
//     // else if (current - 1 === index) classNames += `${css.slide} ${css.slide__previous}`;
//     // else if (current + 1 === index) classNames += `${css.slide} ${css.slide__next}`;

//     // slide cards

//     if (type === 'next') {
//       if (currentCard < cardNumber - 1) {
//         currentCard++;
//         position -= cardWidth + cardMargin;
//       } else {
//         currentCard = 0;
//         position += (cardNumber - 1) * (cardWidth + cardMargin);
//       }
//     } else if (type === 'prev') {
//       if (currentCard > 0) {
//         currentCard--;
//         position += cardWidth + cardMargin;
//       } else {
//         currentCard = cardNumber - 1;
//         position -= (cardNumber - 1) * (cardWidth + cardMargin);
//       }
//     }

//     // if (type === 'next' && currentCard < cardNumber - 1) {
//     //   currentCard++;
//     //   position -= cardWidth + cardMargin;
//     // } else if (type === 'prev' && currentCard > 0) {
//     //   currentCard--;
//     //   position += cardWidth + cardMargin;
//     // }
//     this.setCard(currentCard, position);
//   }

//   setCard(currentCard, position) {
//     this.setState({
//       currentCard: currentCard,
//       position: position,
//       cardStyle: {
//         transform: `translateX(${position}px)`,
//       },
//     });
//   }

//   render() {
//     return (
//       <div className={css.cards_slider}>
//         <div className={css.slider_btns}>
//           <div className={css.slider__controls}>
//             <button className={css.btn} onClick={() => this.handleClick('prev')}>
//               <ExpandMoreIcon
//                 className={css.arrows}
//                 style={{ transform: 'translateX( 45%) rotate(90deg)' }}
//               />
//             </button>

//             <button className={css.btn} onClick={() => this.handleClick('next')}>
//               <ExpandMoreIcon
//                 className={css.arrows}
//                 style={{ transform: 'translateX( 45%) rotate(270deg)' }}
//               />
//             </button>
//           </div>

//           {/* <button className={css.slider_btn} onClick={() => this.handleClick('prev')}>
//             &lt;
//           </button>
//           <button className={css.slider_btn} onClick={() => this.handleClick('next')}>
//             &gt;
//           </button> */}
//         </div>
//         <Cards
//           cardStyle={this.state.cardStyle}
//           array={this.props.array}
//           setActiveListing={this.props.setActiveListing}
//         />
//       </div>
//     );
//   }
// }
