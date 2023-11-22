import {styled} from "styled-components";

export const ContainerWrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 1.438rem;
  
  border: 0.15rem solid black;
  border-radius: 0.3rem;
  background-color: white;
`;

export const InsideWrapper = styled.div`
  margin: 1rem 1rem 0.2rem;
`;

export const InfoWrapper = styled.div`
    img{
      width: 25rem;
    }
`;

export const ShopDataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h1{
    font-weight: 700;
    font-size: 1.125rem;
  }
`;