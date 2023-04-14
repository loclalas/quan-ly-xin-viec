import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Wrapper from "./../../assets/wrappers/DashboardFormPage";
import FormRow from "./../../components/FormRow";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const { name, email, lastName, location } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !location || !lastName) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    dispatch(updateUser(userData));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleOnSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading
              ? "Xin vui lòng chờ đợi trong giây lát..."
              : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
