import "./App.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../../../config/Redux/Reducers/indexReducer';



const storeRedux = createStore(Reducer, applyMiddleware(thunk))
// const storeRedux = createStore(Reducer)

function App() {
  return (
    <Provider store={storeRedux}>
    <Router>
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
