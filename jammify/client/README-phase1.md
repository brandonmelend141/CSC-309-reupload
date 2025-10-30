# team32 - Jammify

Welcome to Jammify! Jammify is a platform allowing musicians to make profiles about themselves and look for collaborators.

To get started, please run `npm install` to install the relevant packages, then `npm start` and go to `localhost:3000`.

# Please note
- One of our members, Guanjie (Jacky) Wang has dropped the course shortly before the deadline. 
- So as a result a lot of the work has become a bit last-minute and messy, we've done our best to make up for it. 
- Please take this into consideration when marking this phase of the project.

# Functionality Instructions

## User Actions

## Login Page
- Please log in with the credentials `user`, `user`. You can also use `user2`, `user2`, and `user3`, `user3`.
- Logging in with different user credentials will show different information when you view your own profile.
- You will be directed to the main menu view. 

## Signup Page
- You can also signup by clicking the "Sign up" button on the login page.
- You will be directed to a page where you can enter credentials and sign up.

### Main Menu View
- Here you can browse through "cards" representing different users.
- Right now, we have 3 profiles, and the cards are the same 3 profiles over and over again (to make the page look populated)
- These profiles are and stored in a JSON file locally.

- On the left, there is a filter bar allowing you to select different things you are looking for.
- This feature is not functional yet since it will require server interaction, but you can still click the filter sidebar.

- At any time, you can return to the main menu view by clicking the "Jammify" text in the top bar.

### Profile Popup View
- Click on a card to view a popup of that user's profile. 
- You can see information about them, such as:
  - their skills 
  - what they are looking for in a collaboration
  - contact info
  - some of their pictures, previous works, etc

- You can also see profiles of other artists they've collaborated with in the past.
- You can click on these profiles and the profile view will switch to that profile.

- The profile popup also has a close button, and a button allowing you to 'favorite' them.
    - 'Favoriting' them will save their profiles in a favorites section so you can view them later.
    - (This feature requires server interaction so will be implemented in phase 2, but you can still click the button!)


## View your own profile
- In the top right corner, you can see a user profile icon. Click on it to go to your own profile.
- Logging in with different user credentials will show different information when you view your own profile.
- Also note: if you sign up with a new account, those account details will be reflected in the profile popup view.
- This feature and view was worked on by Jacky who is dropping the course so it is still a WIP, we will do our best to finish it by the time of phase 2!

- Here you can do a few more things:
    - You can view your favorited profiles by clicking on the 'favorites' tab.
    - There is also a feature to 'unfavorite' them, but this doesn't do anything yet and will be implemented in phase 2.
    
- You can edit your own profile by clicking the 'edit profile' button.
    - This will open up a dialog where you can enter new details about yourself.
    - You can click 'save' to save the new info, or 'save and quit' to save the new info and exit the dialog, or 'cancel' to cancel edits.
    - any changes you've made to your profile will be applied when you save and exit the dialog.
    - also, if you change your listed gender from 'male' to 'female', or anything else, your default profile picture will change.

- This feature does not currently have an impact on the rest of the application as it would require server interaction.

## Admin Actions
- Please note that our teammate who has dropped the course was also supposed to address some of the admin functionality for Phase 1, which is why a lot of it is not currently implemented.

- You can log in with the credentials `admin`, `admin`. When you view your own profile, you can see that you have an admin email address.
- Right now, the admin functionality is still similar to the user view.
- Eventually, a lot of the admin functionality will require server calls to work properly; they will be able to delete and edit regular users' profiles.
- Everything else that a regular user can do, an admin is still able to do.



# Third-party Libraries Used
- React
- Jquery