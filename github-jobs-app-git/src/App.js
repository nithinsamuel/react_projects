import React from "react";
// custom hook
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
function App() {
  const { jobs, loading, error } = useFetchJobs();

  return (
    // Container is used from react-bootstrap
    <Container>
      {/* if loading is true the loading message is displayed */}
      {loading && <h1>Loading...</h1>}
      {/* if error is false the error message is not displayed */}
      {error && <h1>Error. Try Refreshing...</h1>}
      {<h1>{jobs.length}</h1>}
    </Container>
  );
}
export default App;
