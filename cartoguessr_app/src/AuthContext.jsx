import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const predefinedUsers = [
  { username: 'paco02', password: '1', email: "paco02@gmail.com", scores: { normal: 10, crono: 5, flags: 5, capitals: 2 } },
  { username: 'juan04', password: '2', email: "juan04@gmail.com", scores: { normal: 20, crono: 2, flags: 10, capitals: 4 } },
  { username: 'cr7_33', password: '3', email: "cr7_33@gmail.com",scores: { normal: 30, crono: 0, flags: 15, capitals: 6 } },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(predefinedUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username, password, email) => {
    let isValid = true;
    let cont = 0;
    while(cont < users.length && isValid){
      if (username === users[cont].username) {
        isValid = false;
      }
      cont++;
    }
      
    if (!isValid) {
      return false;
    } else {
      const newUser = { username, password, email, scores: { normal: 0, crono: 0, flags: 0, capitals: 0 } };
      setUsers([...users, newUser]);
      return true;
    }
  };

  const updateUserScores = (username, game, score) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username !== username) return user;
  
        const newScore =
          game === 'crono'
            ? Math.max(score, user.scores[game] || 0)
            : (user.scores[game] || 0) + score;
  
        return {
          ...user,
          scores: {
            ...user.scores,
            [game]: newScore,
          },
        };
      })
    );
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, updateUserScores, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
