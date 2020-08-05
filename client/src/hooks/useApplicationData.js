import { useState, useEffect } from "react";

export default function useApplicationData() {
  //Hook to store the state and update it
  const [state, setState] = useState({
    user: {},
  });
  //Function to update the state of the user
  const setUser = (user) => setState({ ...state, user });

  useEffect(() => {
    const data = localStorage.getItem("userObj");
    if (data) {
      const user = JSON.parse(data);
      setState({ ...state, user });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("userObj", JSON.stringify(state.user));
  });

  return {
    state,
    setUser,
  };
}
