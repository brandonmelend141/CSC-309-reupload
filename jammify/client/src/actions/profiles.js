export const loadProfiles = (profileData) =>{
    const url = "/api/profiles";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json)
            profileData.setState({profileData: json})
           
            
        })
        .catch(error => {
            console.log(error);
        });
};



export const getUserProfileId = (profileData) =>{
    const url = "/users/current-profileId";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               
                return res.json();
            } else {
                alert("Could not get profileId");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json)
            profileData.setState({profileId: json})
           
            
        })
        .catch(error => {
            console.log(error);
        });
};

export const loadOneProfile = (profile,profileData) =>{
    const url = `/api/profiles/${profile}`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json)
            profileData.setState({profilePageInfo: json ,profilePic:json.profilePic[0], showCasePics:json.gallery[0],personalInfo:json.personalInfo, workInfo:json.works, contactInfo: json.contactInfo  })
           
            
        })
        .catch(error => {
            console.log(error);
        });
};
export const updateProfileData = (profile,profileData) => {
    // the URL for the request
    const url = `/api/profiles/${profile}`;

    // The data we are going to send in our request
    console.log(profileData.state.profilePageInfo)
    const newProfileData = profileData.state.profilePageInfo

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(newProfileData),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log("data updated")
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("data not updated")
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export const createProfile = (profile) => {
    // the URL for the request
    const url = `/api/profiles/`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(profile),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log("profile created")
            } else {
                console.log("profile not created")
            }
        })
        .catch(error => {
            console.log(error);
        });
}
