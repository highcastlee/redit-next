import { createContext, useContext, useReducer } from "react";

import { User } from "../types";

interface State {
  authenticated: boolean;
  user : User | undefined;
  loading: boolean;
}

interface Action {
  type: string;
  payload : any;
}

const initialState = {
  authenticated: false,
  user: undefined,
  loading : true,
}

const StateContext = createContext<State>(initialState)

const DispatchContext = createContext<any>(()=>{

})

export const ACTION = {
  LOGIN : "LOGIN",
  LOGOUT: "LOGOUT",
  STOP_LOADING: "STOP_LOADING"
}

const reducer = (state: State, {type, payload}: Action) => {
  switch(type){
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload
      }
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null
      }
    case "STOP_LOADING":
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error("Unknow")
  }
}

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState)
  const dispatch = (type:string, payload?:any) => {
    defaultDispatch({type, payload});
  }
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);