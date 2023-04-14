import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "./../components/FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { name, email, password, isMember } = values;

  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preState) => {
      return { ...preState, [name]: value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isMember && !name)) {
      toast.error(`Bạn chưa điền thông tin đầy đủ`);
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues((preState) => {
      return { ...preState, isMember: !isMember };
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleOnSubmit}>
        <h3>{isMember ? "Đăng nhập" : "Đăng ký"}</h3>
        {!isMember && (
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "...Loading" : "Đăng nhập"}
        </button>

        <p>
          {isMember ? "Bạn chưa đăng ý?" : "Bạn đã có tài khoản?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {isMember ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
