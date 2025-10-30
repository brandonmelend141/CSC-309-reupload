import "./../components/ProfileCards/style.css"
import $ from "jquery"

// hoverFunction not fully functioning but works most of the time 
//these functions handle the hovering of the profile cards 
export const handleHover =(e,hover)=>{
 
       if(hover === true && e.target.className === "profileCard"){
        
            $("#"+e.target.id).addClass("hoverCard") 
       }
};

export const handleUnHover = (e,hover)=> {

    if(hover === false){
     
        $(".profileCard").removeClass("hoverCard") 
    }
}