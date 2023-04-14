import { ImStatsBars } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const links = [
  { id: 1, text: "Home", path: "/", icon: <ImStatsBars /> },
  { id: 2, text: "add job", path: "add-job", icon: <FaWpforms /> },
  { id: 3, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "profile", path: "profile", icon: <CgProfile /> },
];

export default links;
