import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Layout from './components/Layout';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

import { StoreProvider } from './utils/GlobalState';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop />
        <>
          <StoreProvider>
            <Routes>

              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                />
              </Route>
              <Route path="*" element={<Home />} />

            </Routes>
          </StoreProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
