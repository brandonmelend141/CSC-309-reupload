import React from 'react';
import "./style.css"
import default_pfp from './default_pfp.png'
import { Link } from "react-router-dom";

import {checkIsAdmin} from "../../../actions/admin.js";

import $ from "jquery"
import { logout } from '../../../actions/user';

class Header extends React.Component {
    state = {  }
    // this function is for the header colour change on scroll
    scroller = () => {
        if(window.scrollY >= 50) {
            $("#header").addClass("active");
        } else {
           $("#header").removeClass("active");
        }
    }
    
    componentDidMount() {
        checkIsAdmin(this)
        console.log(`HEADER BAR state's isAdmin is ${this.state.isAdmin}`)

    }


    render() { 
        const {app}=this.props;
        function logoutClick(){
            logout(app)
        }
        
        window.addEventListener('scroll', this.scroller)
        return (  
            <div id = "header">
                <Link to={"./main"} >
                    <h1 id = "jammify_logo">Jammify</h1>
                </Link>
                <button class="logout" onClick={logoutClick}>Logout</button>
                {this.state.isAdmin ? 

                null :

                <Link to={"./myProfile"}>
                    <img id = "pfp" src= {default_pfp}/>
                </Link>
                }
                
                
                
            </div>
        );
    }
}
 
export default Header