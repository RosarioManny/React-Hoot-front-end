import { useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService"; // import the authservice
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const handleAddHoot = async (hootFormData) => {
    console.log("hootFormData", hootFormData);
    navigate("/hoots");
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleDeleteHoot = async (hootId) => {
    console.log("hootId", hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== hootId));
    navigate("/hoots");
  };

  // src/components/HootForm/HootForm.jsx

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddHoot(formData);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route
                path="/hoots/new"
                element={<HootForm handleAddHoot={handleAddHoot} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route
            path="/hoots/:hootId"
            element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
          />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
