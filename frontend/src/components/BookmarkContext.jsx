import { createContext, useContext, useReducer } from "react";

const bookMarkReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "REMOVE":
        return state.filter(
          (menuItem) => menuItem._id !== action.payload._id
        );
      default:
        return state;
    }
  };

const defaultValue = {
  bookmark: [],
  addMenuItem: () => {},
  removeMenuItem: () => {},
};

const BookmarkContext = createContext(defaultValue);

export const BookmarkContextProvider = ({ children }) => {
  const [bookmark, dispatch] = useReducer(bookMarkReducer, []);

  const addMenuItem = (menuItem) => {
    dispatch({ type: "ADD", payload: menuItem });
  };

  const removeMenuItem = (menuItem) => {
    dispatch({ type: "REMOVE", payload: menuItem });
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmark, addMenuItem, removeMenuItem }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);