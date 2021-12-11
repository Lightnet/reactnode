import React,{ createContext, useState, useMemo, useContext } from "react";

export const AuthContext = createContext();

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a UserContext`)
  }
  return context;
}

export function AuthProvider(props){
  const [token, setToken] = useState('');
  const [userID, setUserID] = useState('');
  const [user, setUser] = useState('');
  const [session, setSession] = useState('');

  const value = useMemo(()=>({
    token, setToken,
    userID, setUserID,
    user, setUser,
    session, setSession,
  }),[
    token,
    userID,
    user,
    session
  ])

  return <AuthContext.Provider value={value} {...props} />
}