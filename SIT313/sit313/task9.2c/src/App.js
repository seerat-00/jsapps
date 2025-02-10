import React, { useEffect, useState } from 'react';
import Login from './login';
import SignUp from './signup';
import NavBAR from './navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './profile';
import { auth } from "./firebase.js";
import List from './Find';
import Radioexample from './Radio';
import "./App.css";
import SubscriptionForm from './PricingPlans';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QFszICTWRQuQJSBhLOB8JxxvtUqMXTU9BZaa1uSZOZ6Vvd7CklNkL0OIp4PoK3bFGv7rrJyXsm30pksCEESj8p600DuBXlN7I');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className='container'>
        <NavBAR user={user} />
        <div className='app'>
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/find' element={<List />} />
            <Route path='/radio' element={<Radioexample />} />
            <Route
              path='/plans'
              element={
                <Elements stripe={stripePromise}>
                  <div className='App'>
                    <h1>Subscription Plans</h1>
                    <SubscriptionForm />
                  </div>
                </Elements>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
