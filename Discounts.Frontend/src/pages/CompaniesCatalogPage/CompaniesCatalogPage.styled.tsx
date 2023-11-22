import {styled} from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const CarouselWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100px;
  z-index: 10;
  margin-bottom: 50px;
  div.react-multi-carousel-list.out{
    background-color: #435585;
    transition-duration: 0.2s;
  }
  div.react-multi-carousel-list.return{
    transition-duration: 0.2s;
  }
`;

export const SubWrapper = styled.div`
  margin: 0 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
    gap: 0.625rem;
`;

export const FilterWrapper = styled.div`
  
`;
