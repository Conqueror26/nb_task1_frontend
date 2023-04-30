import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventPage from "./pages/Event";
import MainNaviagtion from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";
import React, { Component } from "react";

class App extends Component {
  state = {
    email: null,
    userId: null,
  };
  login = (email, userId) => {
    this.setState({ email: email, userId: userId });
  };

  logout = () => {
    this.setState({ email: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            email: this.state.email,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNaviagtion />
          <main className="main-content">
            <Routes>
              <Route path="/" element={null} />
              <Route
                path="/auth"
                element={
                  this.state.email ? <Navigate to="/events" /> : <AuthPage />
                }
              />

              <Route path="/events" element={<EventPage />} />
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
