import styled from 'styled-components';

export const NEXT = 'NEXT';
export const PREV = 'PREV';

export const Item = styled.div`
 
  padding: 0px 0px 0px 100px;
 /*  background-image: ${props => `url(${props.img})`};
  background-size: cover; */
`;

export const CarouselContainer = styled.div`
  display: flex;
  margin-top: 25vh;
  transition: ${props => (props.sliding ? 'none' : 'transform 1s ease')};
  transform: ${props => {
    if (!props.sliding) return 'translateX(calc(-20% ))';
    if (props.dir === PREV) return 'translateX(calc(2 * (-20% )))';
    return 'translateX(0%)';
  }};
`;

export const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 10%;

  order: ${props => props.order};
`;
