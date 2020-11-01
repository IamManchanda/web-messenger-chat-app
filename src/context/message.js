import { createContext, useReducer, useContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, { type, payload }) => {
  let usersCopy;
  let usersIndex;
  const { username, message, messages } = payload;

  switch (type) {
    case "SET_USERS":
      return {
        ...state,
        users: payload,
      };
    case "SET_USER_MESSAGES":
      usersCopy = [...state.users];
      usersIndex = usersCopy.findIndex((u) => u.username === username);
      usersCopy[usersIndex] = {
        ...usersCopy[usersIndex],
        messages,
      };

      return {
        ...state,
        users: usersCopy,
      };
    case "SET_SELECTED_USER":
      usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === payload,
      }));

      return {
        ...state,
        users: usersCopy,
      };
    case "ADD_MESSAGE":
      usersCopy = [...state.users];

      usersIndex = usersCopy.findIndex((u) => u.username === username);

      let newUser = {
        ...usersCopy[usersIndex],
        messages: usersCopy[usersIndex].messages
          ? [message, ...usersCopy[usersIndex].messages]
          : null,
        latestMessage: message,
      };

      usersCopy[usersIndex] = newUser;

      return {
        ...state,
        users: usersCopy,
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
