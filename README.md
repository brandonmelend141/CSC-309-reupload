# Jammify - Phase 2 Submission README

To locally run the application, first you must make sure to build the client first by running the line ‘npm run build’ in the client directory, as this will allow the browser to interpret the react code. Afterwards, simply return to the previous directory named ‘jammify’ and run the line ‘node server.js’ to start the local express server. However, the application is also hosted through Heroku and can be accessed with the following link: https://gentle-beach-21082.herokuapp.com/login

Third-party libraries used:
- React
- JQuery
- Mongoose
- connect-multiparty
- cloudinary

## Application Information & Instructions

### Basic information

Jammify is an application where music artists can make profiles for themselves, and find other artists to collaborate with!

To access Jammify, use this link: https://gentle-beach-21082.herokuapp.com/login


**Most of the sections below will describe the features available to a regular user. There is a section at the end which talks about admin-only functionality.**

### Login Page
- We have some existing users preloaded. You can try logging in with username `user` and password `user`. You can also try `user2` `user2`. 
- (Optional) you can also try logging in as these other users:
  - username: `johnram`, password `12345678`
  - username: `southguitars`, password `12345678`
  - username: `jenthedrummer`, password `12345678`
- We also have an admin user preloaded. You can try logging in with username `admin` and password `admin`.
- If you want to try signing up, you can click the sign up link on the page. This will take you to a page where you can enter some information about yourself, and sign up.

### Signup Page
-  This page is very similar to the login page, except you will need to fill out some fields to register as a user.
- Once you’ve filled out your information and submitted, you will be taken to the main page.
- **You may need to refresh once before your newly generated profile shows up.**
 
### Main Page
- Once you have logged in, you will be taken to this page.
- You will see cards about other users who have signed up for Jammify.

- If you click on any of these cards, a popup will appear with more detailed information about that person.
- If you’re interested in collaborating with them, you can see their contact information and get in touch!

- If you click on the profile icon in the top right, you will be taken to a page where you can edit your own profile information. More information about this is in the ‘MyProfile’ page section below.

- At any time, you can return to the main menu view by clicking the “Jammify” text in the top bar.

### “MyProfile” Page
- If you clicked on the profile icon in the top right, you will be taken to this page.
- Here you can see the details about your own profile.
- If you are a newly signed up user, some of these fields will be filled in by default, but you can change them!
- To change any of the fields in your profile, click the gear icon. A “save edits” button will appear, indicating you are currently in an editing state. Then click on any of the text in the profile fields, and you will see you will be able to edit them. You can even change your name, gender, age, etc
- When you’re done with your changes, click the “save edits” button. The database will be updated with your changes. (You can go back to the main page to confirm this).

- You can also change your profile photo and gallery display photo. Click on your profile photo or gallery display photo, you will be prompted to upload an image. Once uploaded, you should be able to refresh and see the changes.


### Admin Notes
- These notes are for if you logged in as admin.
- If you are an admin, you won’t be able to access the myprofile page because admin users do not have profiles.
- On the main page, you will see buttons below each card to delete a user.
- This will delete their profile and their account, so they cannot sign in.
- You are welcome to test it out, but **this action cannot be undone!**
- Feel free to create new users and then delete them with the admin action.
- After you delete a user, you will have to refresh the page to see the change.

## Routes overview

*Important Info:* Regular users have both a `user` and a `profile` document stored about them in the database. 

A “user” document contains the username and password someone logs in with. 

A “profile” document contains all the profile information such as contact information, personal details, skills, etc. 

Both the “user” and “profile” documents have a `profileId` field that links the two together. So if they represent the same person, they will have the same `profileId`. This `profileId` is automatically managed and assigned by our back end when a new user signs up, to make sure we can associate a user with a profile. This is not the same as the id assigned by mongoDB. We assign and manage profileIds ourselves in the back-end to have full control.

Admin users only have a `user` document. They do not have a `profile` document.


#### POST `/users/login`
- This route is used to log in a user
- Expected data in request:`{"username": <username>, "password", <password>}` 
- Returns `{"currentUser": <user's information>}`

#### GET `/users/logout`
- This route is used to log out a user
- Expected data in request: none
- Expects session cookie
- Returns nothing on success
- Returns error if failed

#### DELETE `/users/:id`
- This route is used to delete a user with that profileId (not mongo _id)
- Expected data in request: none (but user profile id should be specified in route)
- Returns deleted user on success

#### GET `/users/current-profileId`
- This route returns the profileId of the logged in user
- Requires the request to have a session cookie
- Expected data in request: none
- Returns `{"profileId": <profile id of logged in user>}`

#### GET `/users/is-admin`
- This route checks with the session to see if the currently logged in user is an admin
- Requires the request to have a session cookie
- Expected data in request: none
- Returns `{“username”: <admin username>, “profileId”: <admin’s user id>}`

#### POST `/api/users`
- This route creates a new user 
- Expected data in request: `{"username": <username>, "password": <password>}`
- Returns the data of the new user in JSON format (with a profileId assigned)


#### POST `/api/profiles`
- This route creates a new profile in the database
- Expected data in request: JSON representing a profile (see profile schema below)  
```js
const imageSchema = mongoose.Schema({
    image_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    created_at: String
});


const profileSchema = new mongoose.Schema({
    profileId: Number,
    profilePic: [imageSchema],
    personalInfo: {
        description: String,
        name: String,
        gender: String,
        age: Number
    },
    works: {
        albums: [String],
        singles: [String]
    },
    offering: [String],
    lookingFor: [String],
    genres: [String],
    collaborators: [Number],
    workDone: Number,
    contactInfo: {
        phone: String,
        email: String
    },
    gallery: [imageSchema],
    tags: [String]
})
```
- Because the request data for this route is quite complicated, it would be difficult to test manually.
- Here's an example you could test manually with (use this JSON in the request body):
```json
{
  "works":{
    "albums":[
      "1989"
    ],
    "singles":[
      "Shake It Off"
    ]
  },
  "offering":[
    "Singer, Songwriter"
  ],
  "lookingFor":[
    "Producer, Agent"
  ],
  "genres":[
    "Rock, Pop"
  ],
  "collaborators":[
    3
  ],
  "tags":[
    "upcoming, artist, singer"
  ],
  "personalInfo":{
    "description":"I'm Taylor Swift. Nice to meet you!",
    "name":"Taylor Swift",
    "gender":"F",
    "age":30
  },
  "contactInfo":{
    "phone":"   987654321",
    "email":"   taylor@gmail.com"
  },
  "profileId":100,
  "profilePic":[
    {
      "image_id":"qerl3dlfxe83o7sfdjdx",
      "image_url":"http://res.cloudinary.com/jammify/image/upload/v1607657621/qerl3dlfxe83o7sfdjdx.jpg",
      "created_at":"Thu Dec 10 2020 22:33:42 GMT-0500 (Eastern Standard Time)"
    }
  ],
  "workDone":1,
  "gallery":[
    {
      "image_id":"jxu80doru9jldxwm7bvt",
      "image_url":"http://res.cloudinary.com/jammify/image/upload/v1607657631/jxu80doru9jldxwm7bvt.jpg",
      "created_at":"Thu Dec 10 2020 22:33:51 GMT-0500 (Eastern Standard Time)"
    }
  ]
}
```

#### GET `/api/profiles`
- This route gets all profiles in the database
- A profile is all the details about a person, whereas a user contains just their username, password and id.
- Expected data in request: none
- Returns all profiles in a JSON array

#### GET `/api/profiles/:id`
- This route gets the profile with the corresponding profileId (not mongo _id) 
- Expected data in request: none (but profileId should be specified in route)
- Returns JSON of the profile data with that matching ID

#### PUT `/api/profiles/:id`
- This route replaces a profile with the new information in the request
- The profileId stays the same (since we are just changing the data associated with a user)
- Expected data in request: JSON representing profile data, same as in the `POST /api/profiles` route
- Returns JSON of the updated profile
- You can try testing in postman with this JSON data (feel free to change some of the fields):
```json
{
  "works":{
    "albums":[
      "1989"
    ],
    "singles":[
      "Shake It Off"
    ]
  },
  "offering":[
    "Singer, Songwriter"
  ],
  "lookingFor":[
    "Producer, Agent"
  ],
  "genres":[
    "Rock, Pop"
  ],
  "collaborators":[
    3
  ],
  "tags":[
    "upcoming, artist, singer"
  ],
  "personalInfo":{
    "description":"I'm Taylor Swift. Nice to meet you!",
    "name":"Taylor Swift",
    "gender":"F",
    "age":30
  },
  "contactInfo":{
    "phone":"   987654321",
    "email":"   taylor@gmail.com"
  },
  "profileId":100,
  "profilePic":[
    {
      "image_id":"qerl3dlfxe83o7sfdjdx",
      "image_url":"http://res.cloudinary.com/jammify/image/upload/v1607657621/qerl3dlfxe83o7sfdjdx.jpg",
      "created_at":"Thu Dec 10 2020 22:33:42 GMT-0500 (Eastern Standard Time)"
    }
  ],
  "workDone":1,
  "gallery":[
    {
      "image_id":"jxu80doru9jldxwm7bvt",
      "image_url":"http://res.cloudinary.com/jammify/image/upload/v1607657631/jxu80doru9jldxwm7bvt.jpg",
      "created_at":"Thu Dec 10 2020 22:33:51 GMT-0500 (Eastern Standard Time)"
    }
  ]
}
```


#### DELETE `/api/profiles:id`
- This route deletes the profile associated with the specified profileId (not mongo _id)
- Expected data in request: none (but profileId should be specified in route)
- returns JSON of the deleted profile


#### POST `/api/profileImage/:id`
- This route creates a profile image for the specific user signed in 
- the expected data in the request is the profile_id param and the file path in the body 
- First a new image is made through the subdocument schema which generates an image_id, image_url and time of creation. This subdocument is saved as an array in the profile schema as the profilePic property- The image is then saved on the cloudinary server and returns a json body with the information of the image if success (200) or returns the error messages 

#### POST `/api/showCaseImage/:id`
- This route creates a showCase image used for the profile and profile card thumbnails for the specific user signed in 
- the expected data in the request is the profile_id param and the file path in the body 
- First a new image is made through the subdocument schema which generates an image_id, image_url and time of creation. This subdocument is saved as an array in the profile schema as the gallery property. 
- The image is then saved on the cloudinary server and returns a json body with the information of the image if success (200) or returns the error messages 

