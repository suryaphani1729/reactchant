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
  return user != null ? (
    <ProfilePage />
  ) : (
    <div className="App">
            
      <header className="App-header">
              
        <Router>
                
          <div>
                    
            <ul>
                        
              <li>
                            <Link to="/">ProfilePage</Link>          
              </li>
                        
              <li>
                            <Link to="/signin">SignIn</Link>          
              </li>
                        
              <li>
                            <Link to="/signup">SignUp</Link>          
              </li>
                        
              <li>
                            <Link to="/reset">Reset</Link>          
              </li>
                      
            </ul>
                    
            <hr />
                    
            {/*          A <Switch> looks through all its children <Route>          elements and renders the first one whose path          matches the current URL. Use a <Switch> any time          you have multiple routes, but you want only one          of them to render at a time        */}
                    
            <Switch>
                        
              <Route exact path="/">
                            
                <ProfilePage />
                          
              </Route>
                        
              <Route path="/signin">
                            
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
              
      </header>
          
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
