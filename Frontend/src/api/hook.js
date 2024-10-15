import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;
