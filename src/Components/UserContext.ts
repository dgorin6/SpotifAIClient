import React from "react";

export interface UserContext {
  authToken: string | null;
  setAuthToken: (newString: string | null) => void;
}

const defaultState: UserContext = {
    authToken: null,
    setAuthToken: () => {}
};

export default React.createContext(defaultState);