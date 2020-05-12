import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "./components/UserProvider";
import ProfilePage from "./components/home/ProfilePage";
import SignInComponent from "./components/login/SignInComponent";
import SignUpComponent from "./components/login/SignUpComponent";
import PasswordResetComponent from "./components/login/PasswordResetComponent";
import "./App.css";
import UserProvider from "./components/UserProvider";
export const App = function () {
  const user = useContext(UserContext);
  if (user === null || user === undefined) {
    return <SignInComponent />;
  }
  return (
    <div className="App">
                   
      <Router>
              
        <div>
             
          <div>
               
            <span>
              <Link to="/" className="headerColor">
                ProfilePage
              </Link>
            </span>
            &nbsp;&nbsp;
            <span>
              <Link to="/signin" className="headerColor">
                SignIn
              </Link>
            </span>
            &nbsp;&nbsp;
            <span>
              <Link to="/signup" className="headerColor">
                SignUp
              </Link>
            </span>
            &nbsp;&nbsp;
            <span>
              <Link to="/reset" className="headerColor">
                Reset
              </Link>
            </span>
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
