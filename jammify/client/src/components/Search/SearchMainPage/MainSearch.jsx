import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,useParams,
  Switch,
} from "react-router-dom";
class MainSearch extends Component {
    state = {  }
    
    render() { 
        return (
          /* Place holder*/
          <div className="MainSearch">
            <p>Main Search Page</p> <br />
            <Router>
              {navUser()}
              <Switch>
                <Route path="/:id" children={<Child />} />
              </Switch>
            </Router>
          </div>
        );
    }
  
}
 function Child() {
   // We can use the `useParams` hook here to access
   // the dynamic pieces of the URL.
   let { id } = useParams();

   return (
     <div>
       <h3>ID: {id}</h3>
     </div>
   );
 }

 function navUser() {
  return (
    <NavLink to="/">
      {/* <button>Go to the Personal Profile page</button> */}
      person a
    </NavLink>
  );
};

export default MainSearch;