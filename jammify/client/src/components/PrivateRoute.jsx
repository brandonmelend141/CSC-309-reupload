import React from "react";
import { Route, Redirect } from "react-router-dom";

// export const PrivateRoute = ({ component: Component, user, ...rest }) => {
//   console.log(user);
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, user, app, ...rest } = this.props;
    
    console.log(user, app.currentUser)
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
