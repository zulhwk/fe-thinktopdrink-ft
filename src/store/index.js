import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default DataProvider;
