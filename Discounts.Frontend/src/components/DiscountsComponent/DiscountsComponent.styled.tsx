import {styled} from "styled-components";


export const Container = styled.div`
  .date{
    font-size: 10px;
    color: gray;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  p{
    font-size: 11px;
  }
  
  .discount{
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 320px;
    white-space: nowrap;
    margin-bottom: 0;
  }
`;