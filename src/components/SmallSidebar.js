import { GrClose } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";

import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import { toggleSidebar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispacth = useDispatch();

  const toggle = () => {
    dispacth(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <GrClose />
          </button>
          <header>
            <span>Mục lục</span>
          </header>

          <NavLinks toggle={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
