import { useSelector } from "react-redux";

function useLoading(actionTypes) {
  const loadingSelector = (state) => {
    if (Array.isArray(actionTypes))
      return actionTypes.some((action) => state.loading[action]);
    return state.loading[actionTypes];
  };
  const isLoading = useSelector(loadingSelector);
  return isLoading;
}

export default useLoading;
