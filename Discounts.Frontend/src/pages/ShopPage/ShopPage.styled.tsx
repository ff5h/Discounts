import {styled} from "styled-components";

export const Wrapper = styled.div`
  margin: 0 3.125rem;
  position: relative;

`;

export const Container = styled.div`
  padding: 1rem 1rem;
  margin: 0.625rem 0;
  box-sizing: border-box;

  border: 0.15rem solid black;
  border-radius: 0.3rem;
  background-color: white;
  
  
  display: flex;
  
  img{
    width: 31.25rem;
  }
`;

export const ShopRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.125rem;  
  p{
    font-size: 2rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;

export const InfoWrapper = styled.div`
  margin: 0 3.125rem;
  width: 100%;
`;

export const ListWrapper = styled.ul`
  margin: 0;
  padding-left: 15px;
  li{
    cursor: pointer;
  }
`;

export const ProductWrapper = styled.div`
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
  margin: 0.5rem 0;
  font-size: 1.25rem;
  select{
    font-size: 1rem;
  }
`;