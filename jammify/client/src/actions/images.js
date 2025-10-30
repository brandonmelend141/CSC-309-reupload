// A function to send a POST request with a new image
export const addImage = (image, profileId) => {
    // the URL for the request
    const url = `/api/profileImage/${profileId}`;

    // The data we are going to send in our request
    const imageData = new FormData();
    imageData.append('image',image)
    console.log(imageData)
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                console.log("success")
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("success")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const addShowCaseImage = (image, profileId) => {
    // the URL for the request
    const url = `/api/ShowCaseImage/${profileId}`;

    // The data we are going to send in our request
    const imageData = new FormData();
    imageData.append('image',image)
    console.log(imageData)
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                console.log("success")
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("success")
            }
        })
        .catch(error => {
            console.log(error);
        });
};