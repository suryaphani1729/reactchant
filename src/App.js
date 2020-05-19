import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { UserContext } from "./components/UserProvider";
import ProfilePage from "./components/home/ProfilePage";
import SignInComponent from "./components/login/SignInComponent";
import SignUpComponent from "./components/login/SignUpComponent";
import PasswordResetComponent from "./components/login/PasswordResetComponent";
import Loading from "./components/utils/loading";
import MenuBasedOnLogin from "./components/menu";

import "./App.css";
import UserProvider from "./components/UserProvider";

export const App = function () {
  const data = useContext(UserContext);
  console.log("loading", data.loading, data);
  if (data.loading === true) return <Loading />;
  return (
    <div className="App">
                   
      <Router>
              
        <div>
             
          <div>
            {MenuBasedOnLogin(!(data.user === null || data.user === undefined))}
          </div>
                  
          <hr />
                  
          {/*          A <Switch> looks through all its children <Route>          elements and renders the first one whose path          matches the current URL. Use a <Switch> any time          you have multiple routes, but you want only one          of them to render at a time        */}
                  
          <Switch>
                      
            <Route exact path="/">
                          
              <ProfilePage />
                        
            </Route>
                      
            <Route exact path="/signin">
                          
              <SignInComponent />
                        
            </Route>
                      
            <Route path="/signup">
                          
              <SignUpComponent />
                        
            </Route>
                      
            <Route path="/reset">
                          
              <PasswordResetComponent />
                        
            </Route>
            {data.user === null || data.user === undefined ? (
              <Redirect to="/signin" />
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
                
        </div>
            
      </Router>
          
    </div>
  );
};
function MainApp() {
  return (
    <UserProvider>
            
      <App />
          
    </UserProvider>
  );
}
export default MainApp;
