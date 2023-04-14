import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

import FormRow from "./../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRowSelect from "../../components/FormRowSelect";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/jobs/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    isEditing,
    status,
    statusOptions,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
