import React from 'react'; 
import "./style.css"
import $ from "jquery"


class FilterBar extends React.Component {
    state = {  }
   
    // these functions add an animation to the filter buttons with options 
    show_options(e){
        e.preventDefault();
        // console.log(e.target.id)
        $("#"+e.target.id).next().slideToggle("linear")
        $("#" + e.target.id).toggleClass("active_button")
    }
    //function adds a class to toggalbe buttons 
    toggleOption(e){
        $("#" + e.target.id).toggleClass("active_button")
    }
    render() { 
        // the filter bar will connect to the server as we will be giving each profile tag and the bar will filter by those tags 
        // the actual tags might be subject to change in the next phase
        return (  
            <div id = "filter_bar">
                    <ul id = "filter_list">
                        {/* Genre will be a popup */}
                        <li>
                            <button id = 'genre_button' className="filter_bar_button" onClick = {this.show_options}>Genre</button>
                            <div className = "option_container">
                                <input type = "checkbox" className = "genre_check" value = "R&B"/> R&B
                                <input type = "checkbox" className = "genre_check" value = "Rock"/>Rock
                                <input type = "checkbox" className = "genre_check" value = "Pop"/>Pop
                                <input type = "checkbox" className = "genre_check" value = "Punk"/>Punk
                                <input type = "checkbox" className = "genre_check" value = "Rap"/>Rap
                                <input type = "checkbox" className = "genre_check" value = "Metal"/>Metal
                                <input type = "checkbox" className = "genre_check" value = "Indie"/>Indie
                            </div>
                           
                        </li> 
                        <li>
                            <button id = 'instrumentals_button' className="filter_bar_button" onClick = {this.show_options}>Instrumentals</button>
                            <div className = "option_container">
                                <input type = "checkbox" className = "instrumental_check" value = "drums"/>Drums
                                <input type = "checkbox" className = "instrumental_check" value = "guitar"/>Guitar
                                <input type = "checkbox" className = "instrumental_check" value = "bass"/>Bass
                                <input type = "checkbox" className = "instrumental_check" value = "violin"/>Violin
                                <input type = "checkbox" className = "instrumental_check" value = "piano"/>Piano
                                <input type = "checkbox" className = "instrumental_check" value = "saxophone"/>Saxophone
                                <input type = "checkbox" className = "instrumental_check" value = "clarinet"/>Clarinet
                            </div>
                            
                        </li>
                        <li>
                            <button id = "vocals_button" className="filter_bar_button" onClick = {this.toggleOption}>Vocals</button>
                            
                        </li>
                        <li>
                            <button id = "producer_button" className="filter_bar_button" onClick = {this.toggleOption}>Producer</button>
                            
                        </li>
                        <li>
                            <button id = 'gender_button' className="filter_bar_button" onClick = {this.show_options}>Gender</button>
                            <div className = "option_container">
                                <input type = "checkbox" className = "gender_check" value = "male"/>Male
                                <input type = "checkbox" className = "gender_check" value = "female"/>Female
                                
                            </div>
                            
                        </li>
                        <li>
                            <button id = "style_button" className="filter_bar_button" onClick = {this.toggleOption} >Style</button>    
                        </li>
                        <li>
                            <button id = 'lang_button' className="filter_bar_button" onClick = {this.show_options}>Language</button>
                            <div className = "option_container">
                                <input type = "checkbox" className = "lang_check" value = "english"/>English
                                <input type = "checkbox" className = "lang_check" value = "spanish"/>Spanish
                                <input type = "checkbox" className = "lang_check" value = "french"/>French
                            </div>
                            
                        </li> 
                        <li>
                            <button id = "vd_button" className="filter_bar_button" onClick = {this.toggleOption}>Video Director</button>
                        </li> 

                    </ul>
                </div>
        );
    }
}
 
export default FilterBar;