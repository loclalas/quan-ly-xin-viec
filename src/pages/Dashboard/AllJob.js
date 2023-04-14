import Wrapper from "../../assets/wrappers/LandingPage";
import { JobsContainer, SearchContainer, Job } from "./../../components/index";

const AllJob = () => {
  return (
    <Wrapper>
      <SearchContainer />
      <JobsContainer />
    </Wrapper>
  );
};

export default AllJob;
