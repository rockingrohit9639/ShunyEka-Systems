import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();

export const DataLayer = ({ inititalState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, inititalState)}>
        {children}
    </DataLayerContext.Provider>
);


export const useDataLayerValues = () => useContext(DataLayerContext);