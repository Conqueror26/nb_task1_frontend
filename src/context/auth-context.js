import React from "react";

export default React.createContext({
  login: (email, userId) => {},
  logout: () => {},
});
