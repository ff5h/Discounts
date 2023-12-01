import {styled} from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  border: 0.15rem solid #363062;
  border-radius: 0.5rem;
  margin: 0.625rem 0.300rem;
  background-color: white;
  
  .flex{
    display: flex;
    align-items: center;
  }
`;

export const PhotoWrapper = styled.div`
    img{
      width: 6.25rem;
    }
`;



export const InfoWrapper = styled.div`
    margin-left: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0.5rem;
  
  button{
    margin: 0 0.5rem;
  }
`;