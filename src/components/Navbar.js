import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";

import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
import { clearStore, toggleSidebar } from "../features/user/userSlice";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <AiFillHome />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            {user?.name}
            <MdArrowDropDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore());
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
