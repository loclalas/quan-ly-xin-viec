import main from "../assets//images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            Ứng dụng <span> Quản lý</span> Công việc
          </h1>
          <p>
            Giúp bạn kiểm soát được những việc làm mà bạn hướng tới. Theo dõi,
            phân tích, lưu trữ thông tin.
          </p>
          <Link to="/register" className="btn btn-hero">
            Đăng nhập
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

// const Wrapper = styled.main`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }

//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//   }

//   h1 {
//     font-weight: 700;

//     span {
//       color: var(--primary-500);
//     }
//   }
//   p {
//     color: var(--grey-600);
//   }

//   .main-img {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: repeat(2, 1fr);
//       column-gap: 3rem;
//     }

//     .main-img {
//       display: block;
//     }
//   }
// `;

export default Landing;
