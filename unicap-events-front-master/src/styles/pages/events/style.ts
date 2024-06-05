import styled from "styled-components";

export const Container = styled.div`
    margin: 20px 20px;
    background-color: white;
    border-radius: 10px;
`;

export const TitlePage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 500;
`;

export const TitleCreatores = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: 500;
`;

export const TitlePageId = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 18px;
`;

export const TitleId = styled.h1`
    margin: 0;
    font-size: 34px;
    font-weight: 500;
`;


export const ButtonWrapper = styled.div`
    margin-left: auto;
    
    @media screen and (max-width: 768px) {
        span {
            display: none;
        }
    }
`;

export const Main = styled.div`
      flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 88vh;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
`;

// export const MainHome = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 88vh;
//   margin-top: 10px;
//   border-radius: 10px;
//   background-color: white;
// `

// export const TitlePageHome = styled.h1`
//   font-size: 30px;
// `;

export const TitlePageHome = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #6A0014;
`;

export const MainHome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const DescriptionContainer = styled.div`
  max-width: 800px;
  text-align: center;
  margin-top: 2rem;
`;

export const ProjectDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1rem;
`;

export const WrapperImage = styled.div`
    padding: 10px 20px;
    img{
        width: 10rem;
    }
`
