import { createContext, useReducer, useContext } from "react";
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return {
        ...state,
        users: payload,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);

export const useMessageDispatch = () => useContext(MessageDispatchContext);
