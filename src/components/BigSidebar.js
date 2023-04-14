import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";

function BigSidebar() {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <span>Mục lục</span>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
