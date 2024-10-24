import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useFetcher } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import HootForm from './components/HootForm/HootForm';
import * as hootService from '../src/services/hootService';
import * as authService from '../src/services/authService'; // import the authservice
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const [hoots, setHoots]= useState([]);

useEffect(() => {
  const fetchAllHoots = async () => {
    const hootsData = await hootService.index();
    setHoots(hootsData);
  };
  if (user) fetchAllHoots();
}, [user]);


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleDeleteHoot = async (hootId) => {
    console.log('hootId', hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== hootId));
    navigate('/hoots');
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    console.log('hootId:', hootId, 'hootFormData:', hootFormData);
    navigate(`/hoots/${hootId}`);
  };
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
              <Route path="/hoots/:hootId/edit" element={<HootForm />} />
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

         <Route path="hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />}/>
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;