import * as React from 'react';

import { Action, initialState, reducer, State } from './PlanReducer';
const { createContext, useContext, useReducer } = React;

const planStateCtx = createContext(initialState);
const planDispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const PlanProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <planDispatchCtx.Provider value={dispatch}>
      <planStateCtx.Provider value={state}>
        {children}
      </planStateCtx.Provider>
    </planDispatchCtx.Provider>
  );
};

export const usePlanDispatch = () => {
  return useContext(planDispatchCtx);
};

export const usePlanGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(planStateCtx);
  return state[property]; // only one depth selector for comparison
};