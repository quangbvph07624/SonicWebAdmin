import { useState, useMemo } from "react";

const useAuthState = () => {
  // const initialState = {};

  const [state, setState] = useState();

  const actions = useMemo(() => getActions(setState), [setState]);

  return { state, actions };
};

const getActions = (setState) => ({
  setUser: (user) => {
    setState((state) => ({ ...state, user }));
  },
  setToken: (token) => {
    setState((state) => ({ ...state, token }));
  },
});

export default useAuthState;
