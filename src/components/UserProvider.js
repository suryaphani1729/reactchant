import React, { Component, createContext } from "react";
import { auth, generateUserDocument, getUserCounts } from "../firebase";
export const UserContext = createContext({
  user: null,
  data: [],
  loading: true,
});

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: [],
      loading: true,
      updateData: this.updateData,
    };
  }

  updateData = (data) => {
    this.setState({ data });
  };
  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);

      const data = user === undefined ? [] : await getUserCounts(user.uid);
      this.setState({
        user,
        data,
        loading: false,
        updateData: this.updateData,
      });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
                {this.props.children}      
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
