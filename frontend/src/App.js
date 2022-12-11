import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Studios from './pages/Studios';
import Login from './pages/Login';
import UserCard from './pages/Profile/components/UserCard';
import UserPayments from './pages/Profile/components/UserPayments';
import UserSubscription from './pages/Profile/components/UserSubscription';
import UserClasses from './pages/Profile/components/UserClasses';
import PlansEdit from './pages/Profile/components/UserSubscription/PlansEdit';
import APIContext, { useAPIContext } from './context';
import StudioInfo from './pages/Studios/StudioInfo';

function App() {
  return (
    <>
      <APIContext.Provider value={useAPIContext()}>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='studios' element={<Studios />} />
          <Route path='studios/:id' element={<StudioInfo />} />
          <Route path='plans' element={<Plans />} />
          <Route path='plans/edit' element={<PlansEdit />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/card' element={<UserCard />} />
          <Route path='profile/payments' element={<UserPayments />} />
          <Route path='profile/subscription' element={<UserSubscription />} />
          <Route path='profile/classes' element={<UserClasses />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </APIContext.Provider>
    </>
  );
}

export default App;
