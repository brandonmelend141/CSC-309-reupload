'use strict';
const log = console.log

const express = require("express")
// starting the express server
const app = express();
const path = require('path')

const { mongoose } = require("./db/mongoose")
mongoose.set('useFindAndModify', false);

const { Profile } = require('./models/profile_schema')
// const { Users } = require('./models/user_schema')

// not sure if I will need this, since we implement our own IDs
const { ObjectID } = require('mongodb')

// import the mongoose model
// const { Image } = require("./models/image");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'jammify',
    api_key: '877795719247781',
    api_secret: 'C02GjtbTUMWwbu8a1yDvtcv6gF8'
});


// bodyParser is middleware that we will use to parse the JSON from an HTTP request
// into a useable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())


/* I MAY LATER BREAK THESE UP INTO THEIR OWN FILES IN A ROUTES FOLDER */

// middleware to manage user session
const session = require('express-session');
const { User } = require("./models/user_schema");
const { pid } = require("process");
const { url } = require("inspector");
// const { profile } = require("console");
app.use(bodyParser.urlencoded({extended: true}))

function isMongoError(error) {
    return typeof error === 'object' && error != null && error.name === 'MongoNetworkError'
}

// some routes this to need to check if the connection is established
const mongoChecker = (req, res, next) => {
    console.log("mongoChecker: checking mongoose connection status...")
    if (mongoose.connection.readyState !=1) {
        console.log('mongoChecker: Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        console.log("mongoChecker: mongoose connection ok.")
        next()
    }
}

const authenticate = (req, res, next) => {
    console.log("authenticate: authenticating user...")
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                console.log(`authenticate: user ${req.session.user} not found.`) 
                return Promise.reject()
            } else {
                console.log(`authenticate: user ${req.session.user} found.`)
                req.user = user
                next()
            }
        }).catch((error) => { 
            console.log('authenticate: unknown issue trying to find user.')
            res.status(401).send("Unauthorized")
        })
    } else {
        console.log(`authenticate: ${req.session.user} is bad somehow.`)
        res.status(401).send("Unauthorized")
    }
}

/* SESSION HANDLING ROUTES */

// create a session and session cookie
app.use(
    session({
        secret: 'jammify is cool',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000,
            httpOnly: true
        }
    })
)

// POST to this route to login and create a session
app.post('/users/login', (req, res) => {
    console.log('Got POST request to /users/login')
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsernamePassword(username, password)
        .then(user => {
            console.log('App: login: user is valid and found.')
            console.log(`App: login: Saving user ${username} to session.`)
            // here we add the user's _id (property set by mongodb) to the session
            // later this will be checked to ensure we are still logged in.
            req.session.user = user._id
            req.session.username = user.username
            req.session.profileId = user.profileId
            console.log(`App: login: req.session looks like ${JSON.stringify(req.session)}`)
            res.send({ currentUser: user });
        }).catch(error => {
            console.log(`App: login: unable to login.`)
            res.status(400).send()
        });
});

// GET to this route to log out a user
app.get('/users/logout', (req, res) => {
    // destroy the session
    console.log('App: logout: trying to log out, destroying session.')
    req.session.destroy(error => {
        if (error) {
            console.log('App: logout: got error trying to destroy session.')
            res.status(500).send(error)
        } else {
            console.log('App: logout: session destroyed.')
            res.send()
        }
    });
});

app.delete('/users/:id', mongoChecker, async(req, res) => {
    
    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }

    const id = req.params.id
    console.log(`Got a DELETE request to remove profileid ${id}`)

    try {
        const profile = await User.findOneAndDelete({'profileId': id})
        if (!profile) {
            console.log(`Could not find user ${id} to delete.`)
            res.status(404).send('Resource not found')
        } else {
            console.log(`Removed profile id ${id}`)
            res.send(profile)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})



// GET to this route to check if a user is logged in on the session.
app.get('/users/check-session', (req, res) => {
    console.log(`App: check-session: req.session is ${JSON.stringify(req.session)}`)
    console.log(`App: check-session: checking if ${req.session.username} is logged in.`)
    if(req.session.user) {
        console.log(`App: check-session: ${req.session.username} is logged in.`)
        res.send({ currentUser: {
            username: req.session.username,
            profileId: req.session.profileId,
        } });
    } else {
        console.log(`App: check-session: user not logged in.`)
        res.status(401).send();
    }
});

app.get('/users/current-profileId', authenticate, (req, res) => {
    console.log(`App: current-profileId: req.session is ${JSON.stringify(req.session)}`)
    console.log(`App: current-profileId: checking if ${req.session.username} is logged in.`)
    if(req.session.user) {
        console.log(`Going to return the user's profileId: ${req.session.profileId}`)
        res.send({ profileId: req.session.profileId })
    } else {
        console.log(`App: current-profileId: user not logged in.`)
        res.status(401).send();
    }
});

app.get('/users/is-admin', authenticate, (req, res) => {
    console.log(`App: current-profileId: req.session is ${JSON.stringify(req.session)}`)
    console.log(`App: current-profileId: checking if ${req.session.username} is an admin.`)
    if(req.session.username === 'admin') {
        console.log(`${req.session.username} is an admin.`)
        res.send({username: req.session.username, profileId: req.session.profileId })
    } else {
        console.log(`App: current-profileId: ${req.session.username} not admin.`)
        res.status(401).send();
    }
});

/* USER API ROUTE */
// POST to this route to create a user
app.post('/api/users', mongoChecker, async (req, res) => {
    console.log(`App: /api/users/: creating new user ${req.body.username}`)
    log(req.body)

    // get users to figure out what profile Id we should assign
    let new_profile_id = 0;
    try {
        const current_profiles = await User.find()
        console.log(`Our current profiles: ${current_profiles}`)
        const profile_ids = current_profiles.map( p => p.profileId)
        console.log(`Here are our profile IDs: ${profile_ids}`)
        const highest_profile_id = profile_ids.reduce( (returnedVal, currVal) => {
            if(returnedVal > currVal) {
                return returnedVal
            } else {
                return currVal
            }}, 0)
        console.log(`Highest profile num: ${highest_profile_id}`)
        new_profile_id = highest_profile_id + 1
    } catch(error) {
        log(error)
        res.status(500).send("Internal server error")
    }
    
    console.log(`Going to assign new profile with profileId ${new_profile_id}`)

    // create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        profileId: new_profile_id
    })

    try {
        const newUser = await user.save()
        // Save session cookie
        req.session.user = user._id
        req.session.username = user.username
        req.session.profileId = user.profileId
        console.log(`App: /api/users/: new user ${req.body.username} created.`)
        res.send(newUser)
    } catch (error) {
        if(isMongoError(error)) {
            console.log('Got an error with mongoDB')
            res.status(500).send('Internal server error')
        } else {
            console.log(`Got an error trying to add user ${req.body.username}`)
            log(error)
            res.status(400).send('Bad request')
        }
    }
})

app.get('/api/test', async (req, res) => {
    console.log("Received request to TEST route.")
    console.log(`Got contents ${JSON.stringify(req.body)}`)
    res.send('TEST OK')
})

app.post('/api/profiles', mongoChecker, async(req, res) => {
    console.log("Got a POST request to add a profile.")

    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }

    log(req.body)

    const profile = new Profile({
        profileId: req.body.profileId,
        profilePic: req.body.profilePic,
        personalInfo: req.body.personalInfo,
        works: req.body.works,
        offering: req.body.offering,
        lookingFor: req.body.lookingFor,
        genres: req.body.genres,
        collaborators: req.body.collaborators,
        workDone: req.body.workDone,
        contactInfo: req.body.contactInfo,
        gallery: req.body.gallery,
        tags: req.body.tags
    })

    try {
        const newProfile = await profile.save()
        res.send(newProfile)
    } catch(error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad request')
        }
    }
})

app.get('/api/profiles', mongoChecker, async(req, res) => {
    console.log("Got a GET request to get profile data")

    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }
    
    try {
        const profiles = await Profile.find()
        res.send(profiles)
    } catch(error) {
        log(error)
        res.status(500).send("Internal server error")
    }
})

app.get('/api/profiles/:id', mongoChecker, async(req, res) => {
    console.log("Got a GET request to get a specific profile data")

    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }

    try {
        const profile = await Profile.findOne({'profileId': req.params.id})
        if(!profile) {
            console.log(`Profile id ${req.params.id} not found.`)
            res.status(404).send('Resource not found')
        } else {
            res.send(profile)
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal server error")
    }
})   

app.put('/api/profiles/:id', mongoChecker, async(req, res) => {
    console.log("Got a PUT request to replace a profile's data.")

    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }

    try {
        const profile = await Profile.findOneAndReplace({'profileId': req.params.id}, req.body, {returnOriginal: false})
        if(!profile) {
            console.log('Profile we want to update/replace is not found.')
            res.status(404).send('Resource not found')
        } else {
            res.send(profile)
        }
    } catch(error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad request')
        }
    }
})   

app.delete('/api/profiles/:id', mongoChecker, async(req, res) => {
    
    if(mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection.')
        res.status(500).send('Internal server error')
        return
    }

    const id = req.params.id
    console.log(`Got a DELETE request to remove profileid ${id}`)

    try {
        const profile = await Profile.findOneAndDelete({'profileId': id})
        if (!profile) {
            console.log(`Could not find profile ${id} to delete.`)
            res.status(404).send('Resource not found')
        } else {
            console.log(`Removed profile id ${id}`)
            res.send(profile)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

/*** Image API Routes below ************************************/

// a POST route to *create* an image
app.post("/api/profileImage/:id", multipartMiddleware, async(req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    const profile =  await Profile.findOne({'profileId': req.params.id})
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            profile.profilePic = []
            // Create a new image using the Image mongoose model    
            profile.profilePic.push({
                image_id: result.public_id,
                image_url: result.url,
                created_at: new Date()
            })
         
            // var img = new Image({
            //     image_id: result.public_id, // image id on cloudinary server
            //     image_url: result.url, // image url on cloudinary server
            //     created_at: new Date(),
            // });

            // Save image to the database
            profile.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

app.post("/api/showCaseImage/:id", multipartMiddleware, async(req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    const profile =  await Profile.findOne({'profileId': req.params.id})
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            profile.gallery = []
            // Create a new image using the Image mongoose model    
            profile.gallery.push({
                image_id: result.public_id,
                image_url: result.url,
                created_at: new Date()
            })
         
            // var img = new Image({
            //     image_id: result.public_id, // image id on cloudinary server
            //     image_url: result.url, // image url on cloudinary server
            //     created_at: new Date(),
            // });

            // Save image to the database
            profile.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// app.get("/api/profileImages/:id", async(req, res) => {
//     profile
//     await Profile.findOne({'profileId': req.params.id}).then(
//         images => {
//             res.send({ images }); // can wrap in object if want to add more properties
//         },
//         error => {
//             res.status(500).send(error); // server error
//         }
//     );
//     Image.find().then(
        
//     );
// });


// a GET route to get all images
app.get("/api/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove an image by its id.
app.delete("/api/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});



app.use(express.static(path.join(__dirname, "/client/build")))

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
