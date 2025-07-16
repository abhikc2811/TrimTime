import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 

    await determineRole(userData.mobile);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user'); 
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      determineRole(parsedUser.mobile);
    }
  }, []);

   const determineRole = async (mobile) => {
    try {
      const [customersResponse, barbersResponse] = await Promise.all([
        fetch('http://localhost:3001/customers'),
        fetch('http://localhost:3001/barbers'),
      ]);
      const [customers, barbers] = await Promise.all([
        customersResponse.json(),
        barbersResponse.json(),
      ]);

      if (customers.some((customer) => customer.mobile === mobile)) {
        setRole('customer');
      } else if (barbers.some((barber) => barber.mobile === mobile)) {
        setRole('barber');
      } else {
        setRole(null);
        console.error('User role could not be determined.');
      }
    } catch (error) {
      console.error('Error determining user role:', error);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);