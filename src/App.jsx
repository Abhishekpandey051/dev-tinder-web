import Login from "./auth/Login";
import Body from "./component/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./component/Feed";
import Profile from "./component/Profile";
import Connection from "./component/Connection";
import Request from "./component/Request";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
