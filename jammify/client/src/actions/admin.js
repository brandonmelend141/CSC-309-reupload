import { get } from "jquery";

export const checkIsAdmin = (componentState) => {
    const url = "/users/is-admin";

    fetch(url).then(res => {
        if (res.status === 200) {
            console.log("I think we have an admin logged in.")
            componentState.setState({isAdmin: true})
            return res.json();
        } else {
            componentState.setState({isAdmin: false})
            console.log("Not an admin!")
        }
        })
        .catch(error => {
            console.log(error)
        })
}


export const deleteUserAndProfile = (profileId) => {

    const deleteProfileUrl = `/api/profiles/${profileId}`

    const deleteProfileRequest = new Request(deleteProfileUrl, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(deleteProfileRequest).then( res => {
        if (res.status === 200) {
            console.log(`Profile ${profileId} deleted.`)
        } else {
            console.log(`Profile ${profileId} not deleted.`)
        }
    }).catch(error => {
            console.log("GOT AN ERROR DELETING PROFILE")
            console.log(error)
        });

    const deleteUserUrl = `/users/${profileId}`

    const deleteUserRequest = new Request(deleteUserUrl, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(deleteUserRequest).then( res => {
        if (res.status === 200) {
            console.log(`User ${profileId} deleted.`)
        } else {
            console.log(`User ${profileId} not deleted.`)
        }
    }).catch(error => {
            console.log("GOT AN ERROR DELETING PROFILE")
            console.log(error)
    })
}