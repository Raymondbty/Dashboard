import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  weatherRequests: [],
};

const appReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_WEATHER_REQUEST':
        return {
          ...state,
          weatherRequests: [...state.weatherRequests, action.payload],
        };
      case 'DELETE_WEATHER_REQUEST':
        return {
          ...state,
          weatherRequests: state.weatherRequests.filter((_, index) => index !== action.payload.index),
        };
      case 'UPDATE_WEATHER_REQUEST':
        return {
          ...state,
          weatherRequests: state.weatherRequests.map((request, index) => (
            index === action.payload.index
              ? { ...request, city: action.payload.newCity, data: action.payload.newData }
              : request
          )),
        };
      default:
        return state;
    }
  };

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };