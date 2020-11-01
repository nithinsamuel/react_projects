// custom hook to get all the api data
export default function useFetchJobs(params, page) {
  return {
    jobs: [],
    loading: true,
    error: false,
  };
}
