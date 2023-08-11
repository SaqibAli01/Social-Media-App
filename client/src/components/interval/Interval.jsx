// Import required modules
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../ReduxToolKit/postSlice";

// Inside your component or function
export const Interval = () => {
  const dispatch = useDispatch();
  const intervalTime = 5000; // 5 seconds in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllPosts());
    }, intervalTime);

    // Clean up the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Rest of your component code
};
