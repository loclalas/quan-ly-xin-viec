import img from "../../assets/images/doashboard.svg";
import styled from "styled-components";

const HomeDashboard = () => {
  return (
    <Wrapper>
      <img src={img} className="img-dashboard"></img>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    display: block;
    margin: 10rem auto;
  }
`;

export default HomeDashboard;
