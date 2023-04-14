import { useDispatch } from "react-redux";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

import Wrapper from "../assets/wrappers/Job";
import { setEditJob, deleteJob } from "../features/jobs/jobSlice";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />

          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                dispatch(setEditJob());
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                dispatch(deleteJob(_id));
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
