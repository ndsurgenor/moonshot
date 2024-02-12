# moonshot

Moonshot (stylised in lowercase as 'moonshot') is an web application built for the sharing and discussion around amateur astrological phtography. 

This site has been designed to allow imagined users and visitors the ability to view photos uploaded by registered users of the site; registered users will also be able to create a personal profile and upvote/comment on other users posts.

[LIVE LINK to Application](https://moonshot-13d14b7a6fbd.herokuapp.com/)<br>
[LIVE LINK to API](https://moonshot-api-ff76437bf02f.herokuapp.com/)<br>
_Note: to open links in a new tab, hold CTRL + Click_

![Overview](static/images/readme/overview.png)

## Table Of Contents - !!! TO BE UPDATED !!!
- [Introduction](#moonshot)
- [Strategy](#strategy)
  - [Milestone 1 - API & Admin Functionality](#milestone-1---api--admin-functionality)
  - [Milestone 2 - Frontend Navigation](#milestone-2---frontend-navigation)
  - [Milestone 3 - User Access](#milestone-3---user-access)
  - [Milestone 4 - Photo Uploads](#milestone-4---photo-uploads)
  - [Milestone 5 - Home & Profile Pages](#milestone-5---home--profile-pages)
  - [Milestone 6 - Community Interaction](#milestone-6---community-interaction)
- [Scope](#scope)
- [Structure](#structure)
- [Skeleton](#skeleton)
  - [Wireframe Models](#wireframe-models)
- [Surface](#surface)
  - [Design & Typography](#design--typography)
  - [Features Implemented](#features-implemented)
  - [Features To Be Implemented](#features-to-be-implemented)
  - [Technology & Resources](#technology--resources)
- [Testing](#testing)
- [Deployment](#deployment)
  - [Heroku Deployment](#heroku-deployment)
  - [Forking The Repository](#forking-the-respository)
  - [Cloning The Repository](#cloning-the-respository)
- [Credits & Acknowledgements](#credits--acknowledgements)

## UX Design

The site is aimed at helping users to easily upload their personal photos of the nightsky alongside inrelevant info such as what the photo shows, where/when it was taken, and what equipment was used. It also aims to give users the ability to view, upvote, and comment on the photos uploaded by other users of the site.

## Strategy

### Milestones & User Stories
This project was developed with 6 milestones (epics) in mind. From each of these milestones a number of dev goals and user stories were created, each one given a prioritisation using the MoSCoW method. The detail of these milestones, goals and stories implemented in the final project is outlined below; further detail regarding sprints, MoSCoW designation and acceptance criteria (covered under Structure) are included on the [GitHub Projects Kanban Board](https://github.com/users/ndsurgenor/projects/9) created for the project.

![Kanban](static/images/readme/kanban.png)

#### Milestone 1 - API & Admin Functionality
- 1.1 - Dev Goal: set up Django REST and its supporting libraries via the IDE in order for API development to begin
- 1.2 - User Story: as a Site Admin I want to be able to create and edit User Profiles so I can control user permissions on the frontend
- 1.3 - User Story: as a Site Admin I want to be able to review and edit Equipment Profiles for users so I can details on the frontend
- 1.4 - User Story: as a Site Admin I want to be able to review and edit Photo uploads so I can allow and control images on the frontend
- 1.5 - User Story: as a Site Admin I want to be able to review and edit Comments for so I can allow and control comments on the frontend
- 1.6 - User Story: as a Site Admin I want to be able to review and edit Star ratings (photo ratings) by users so I can allow and control star ratings on the frontend
- 1.7 - User Story: as a Site Admin I want to have access to search and filtering tools on the backend so I can find and edit particular data more easily
- 1.8 - Dev Goal: create an early API deployment to Heroku to ensure all is working from the very start and allow continuous testing throughout production


#### Milestone 2 - Frontend Navigation
- 2.1 - Dev Goal: set up ReactJS and its supporting libraries via the IDE and create an early  deployment to Heroku in for frontend development to begin and to ensure all is working from the very start
- 2.2 - User Story: as a Site Visitor/User I want access to navigation links at the top of every page so I can easily move between different areas of the site
- 2.3 - User Story: as a Site Visitor I want to easily access a sign up page so I can become a registered user and upload my own content/directly particpate with other users of the site
- 2.4 - User Story: as a Site User I want to easily access a sign in page so I can use the full functionality of the site

#### Milestone 3 - User Access
- 3.1 - User Story: as a Site User I want view additional navigational links so that I can access those areas of the site only available to registered users
- 3.2 - User Story: as a Site User I want to remain logged in to the site until I choose otherwise so that my experience is not interuppted by having to continously re-enter my username and password
- 3.3 - User Story: as a Site Visitor/User I want have a clear indication as to whether or not I am logged in/logged out so I can easily discern if I need to sign up/sign in before accessing certain pages
- 3.4 - User Story: as a Site User I want to be able to sign out from my account so that I know my account cannot be accessed by unauthorised persons

#### Milestone 4 - Photo Uploads
- 4.1 - User Story: as a Site User I want to be able to upload my own astrological photos to the site so that they are saved to my account and can be shared with others
- 4.2 - User Story: as a Site User I want to include specific details such as keywords, date, time, location etc. with my uploaded photos so that those details can be dispalyed alongside the photo for the benefit of other users
- 4.3 - User Story: as a Site User I want to be able to update the details of any photo I have added so that I can correct mistakes or add new information if required
- 4.4 - User Story: as a Site User I want to be able to delete any photo I have added so that I can remove my photos from the site if I so desire
- 4.5 - Dev Goal: write defensive code to prevent anyone from accessing the ability to update/delete posts which were not specifically uploaded by them

#### Milestone 5 - Home & Profile Pages
- 5.1 - User Story: as a Site Visitor/User I want to view all user posts from the home page so I can see the latest content when first accessing the site
- 5.2 - User Story: as a Site User I want to be able to continously scroll through posts so that I don't have to navigate between and reload multiple pages
- 5.3 - User Story: as a Site User I want to be able to search for posts using tags/keywords so I can view content specifically related to those tags/keywords and specific users
- 5.4 - User Story: as a Site User I want to be able to select an individual post from the feed so I can view details, comments, and upvotes directly associated with that photo
- 5.5 - User Story: as a Site User I want to be able to access a personalised profile page so that I can add an avatar and personal bio

#### Milestone 6 - Community Interaction
- 6.1 User Story: as a Site User I want to be able to upvote other users posts so that I can show my appreciation for their photography
- 6.2 User Story: as a Site User I want to be able to comment on other users posts so that I can ask questions and/or start a discussion about the photo
- 6.3 - User Story: as a Site User I want to view a feed of those posts I've upvoted so I have easy access to those posts I've shown a particular interest in
- 6.4 - User Story: as a Site User I want to view a feed of those posts I've commented on so I have easy access to posts where I am involved in a discussion thread

## Scope

Using these milestones, goals, and stories to guide my thinking, the following was planned as the Scope of the project:

- Responsive Design:
  - Resizing on all devices from 360px upwards
  - Toggle menu for navbar links at smaller sizes
- Home page displaying the latest uploads and links appropriate to logged-out/in status:
  - Home (available to all users)
  - Sign Up  (logged-out)
  - Sign In  (logged-out)
  - 'MySky' (logged-in; _see below_)
- Links and features only available to logged-in users of the site:
  - Infite scroll of feed on home page
  - Ability to search for photos using tags/keywords
  - 'MySky' options showing the users' own photos/only photos they have upvoted
  - Ability to upvote/comment on other users' photos 
- Stylised error pages which help guie users back to appropriate areas of the site

## Structure

With Strategy and Scope now in place, focus shifted to setting acceptance criteria for each of the above, thereby informing exactly what features to include as part of the project. These acceptance criteria were added to each Dev Goal and User Story on the aforementioned Kanban board to act as an insurance that task would be completed to the fullest extent needed.

### Features
Hovering over a reference (Ref) number below will display a description of that Dev Goal/User Story while clicking the link will return you to the relevant Milestone section of this document.

**Milestone**|**Ref**|**Type**|**Acceptance Criteria/Features**
:-----:|:-----:|:-----:|-----
API|[1.1](#milestone-1---api--frontend-setup "Set up Django REST and its supporting libraries via the IDE in order for API development to begin")|Dev Goal|<ul><li>Set up GitPod workspace</li><li>Install LTS version of Django</li><li>Start project 'moonshot_api'</li><li>Install Cloudinary and Pillow modules</li><li>Set up env.py</li></ul>
API|[1.2](#milestone-1---api--frontend-setup "As a Site Admin I want to be able to create and edit User Profiles so I can control user permissions on the frontend")|User Story|<ul><li>Create UserProfile model</li><li>Create UserProfile serializer</li><li>Create UserProfile GET and PUT functionality</li><li>Implement permissions for editing</li></ul>
API|[1.3](#milestone-1---api--frontend-setup "As a Site Admin I want to be able to review and edit Equipment Profiles for users so I can allow and control details on the frontend")|User Story|<ul><li>Create EquipmentProfile model</li><li>Create EquipmentProfile serializer</li><li>Create EquipmentProfile GET, POST, PUT and DELETE functionality</li></ul>
API|[1.4](#milestone-1---api--frontend-setup "As a Site Admin I want to be able to review and edit Photo uploads so I can allow and control images on the frontend")|User Story|<ul><li>Create Photo model</li><li>Create Photo serializer</li><li>Create Photo GET, POST, PUT and DELETE functionality</li></ul>
API|[1.5](#milestone-1---api--frontend-setup "As a Site Admin I want to be able to review and edit Comments for so I can allow and control comments on the frontend")|User Story|<ul><li>Create Comment model</li><li>Create Comment serializer</li><li>Create Comment GET, POST, PUT and DELETE functionality</li><li>Implement permissions for editing</li></ul>
API|[1.6](#milestone-1---api--frontend-setup "As a Site Admin I want to be able to review and edit Star ratings (photo ratings) by users so I can allow and control star ratings on the frontend")|User Story|<ul><li>Create Star model</li><li>Create Star serializer</li><li>Create Star GET, POST, PUT and DELETE functionality</li><li>Implement permissions for editing</li></ul>
API|[1.7](#milestone-1---api--frontend-setup "As a Site Admin I want to have access to search and filtering tools on the backend so I can find and edit particular data more easily")|User Story|<ul><li>Install django-filter module</li><li>Add search and filter features to User Profiles</li><li>Add search and filter features to Photos</li><li>Add search and filter features to Comments</li></ul>
API|[1.8](#milestone-1---api--frontend-setup "Create an early API deployment to Heroku to ensure all is working from the very start and allow continuous testing throughout production")|Dev Goal|<ul><li>Create app on Heroku</li><li>Set up ElephantSQL</li><li>Set up the env.py file</li><li>Update the settings.py file</li><li>Set config vars and deploy app</li></ul>
Navigation|[2.1](#milestone-2---site-navigation "set up ReactJS and its supporting libraries via the IDE and create an early deployment to Heroku in for frontend development to begin and to ensure all is working from the very start")|Dev Goal|<ul><li>Setup a new repository</li><li>Install modules with npm</li></ul>
Navigation|[2.2](#milestone-2---site-navigation "As a Site Visitor/User I want access to navigation links at the top of every page so I can easily move between different areas of the site")|User Story|<ul><li>Site name and logo</li><li>A top-fixed navbar</li><li>Link to Home page</li><li>Link to Sign Up page</li><li>Link to Sign In page</li></ul>
Navigation|[2.3](#milestone-2---site-navigation "As a Site Visitor I want to easily access a sign up page so I can become a registered user and upload my own content/directly particpate with other users of the site")|User Story|<ul><li>Sign-up form requiring username and password</li><li>Code written to catch form errors</li></ul>
Navigation|[2.4](#milestone-2---site-navigation "As a Site User I want to easily access a sign in page so I can use the full functionality of the site")|User Story|<ul><li>Sign-in form requiring username and password</li><li>Code written to catch form errors</li></ul>
Access |[3.1](#milestone-3---user-access "As a Site User I want view additional navigational links so that I can access those areas of the site only available to registered users")|User Story|<ul><li>Text showing 'Logged in as {username}' in the navbar</li><li>Personilised avatar displayed in the navbar</li></ul>
Access |[3.2](#milestone-3---user-access "As a Site User I want to remain logged in to the site until I choose otherwise so that my experience is not interuppted by having to continously re-enter my username and password")|User Story|<ul><li>Token granting permission for user to remain logged in</li></ul>
Access |[3.3](#milestone-3---user-access "As a Site Visitor/User I want have a clear indication as to whether or not I am logged in/logged out so I can easily discern if I need to sign up/sign in before accessing certain pages")|User Story|<ul><li>Link to personal profile page</li><li>Link to personalised feed of upvoted posts</li></ul>
Access |[3.4](#milestone-3---user-access "As a Site User I want to be able to sign out from my account so that I know my account cannot be accessed by unauthorised persons")|Dev Goal|<ul><li>A 403 Error page which provides a link back to a valid area of the site</li><li>A 404 Error page which provides a link back to a valid area of the site</li><li>A 500 Error page which provides a link back to a valid area of the site</li></ul>
Photos|[4.1](#milestone-4---photo-uploads "As a Site User I want to be able to upload my own astrological photos to the site so that they are saved to my account and can be shared with others")|User Story|<ul><li>Form to upload a photograph</li><li>Code written to prevent the uploading of non-image files</li><li>Code written to prevent the uploading of images which are too large</li></ul>
Photos|[4.2](#milestone-4---photo-uploads "As a Site User I want to include specific details such as keywords, date, time, location etc. with my uploaded photos so that those details can be displayed alongside the photo for the benefit of other users")|User Story|<ul><li>Form which allows for entering of specific details alongside a photo upload</li></ul>
Photos|[4.3](#milestone-4---photo-uploads "As a Site User I want to be able to update the details of any photo I have added so that I can correct mistakes or add new information if required")|User Story|<ul><li>Button alllowing for updating of photo belonging to signed-in user</li><li>Form which allows for the updating of specific details alongside a particular photo upload</li></ul>
Photos|[4.4](#milestone-4---photo-uploads "As a Site User I want to be able to delete any photo I have added so that I can remove my photos from the site if I so desire")|User Story|<ul><li>Button alllowing for deletion of photo belonging to signed-in user</li><li>Confirmation from user before photo and details are deleted</li></ul>
Photos|[4.5](#milestone-4---photo-uploads "Write defensive code to prevent anyone from accessing the ability to update/delete posts which were not specifically uploaded by them")|Dev Goal|<ul><li>A 403 Error page which provides a link back to a valid area of the site</li><li>A 404 Error page which provides a link back to a valid area of the site</li><li>A 500 Error page which provides a link back to a valid area of the site</li></ul>
Pages|[5.1](#milestone-5---home--profile-pages "As a Site Visitor/User I want to view all user posts from the home page so I can see the latest content when first accessing the site")|User Story|<ul><li>Photos displayed as the main content of the landing page</li><li>Posts sorted by 'newest first'</li></ul>
Pages|[5.2](#milestone-5---home--profile-pages "As a Site User I want to be able to continously scroll through posts so that I don't have to navigate between and reload multiple pages")|User Story|<ul><li>Infinte scrolling of photo feed</li></ul>
Pages|[5.3](#milestone-5---home--profile-pages "As a Site User I want to be able to search for posts using tags/keywords so I can view content specifically related to those tags/keywords and specific users")|User Story|<ul><li>Search feature at top of feed</li><li>Content auto-filtered as search field receives input</li><li>Dropdown list to select specific tags</li></ul>
Pages|[5.4](#milestone-5---home--profile-pages "As a Site User I want to be able to select an individual post from the feed so I can view details, comments, and upvotes directly associated with that photo")|User Story|<ul><li>Link assigned to each post which opens a more detailed view</li><li>Display of comments below the specific photo</li></ul>
Pages|[5.5](#milestone-5---home--profile-pages "As a Site User I want to be able to access a personalised profile page so that I can add an avatar and personal bio")|User Story|<ul><li>ABility to update avataer/profile photo</li><li>Ability to enter personal details</li></ul>
Interaction|[6.1](#milestone-6---community-interaction "As a Site User I want to be able to upvote other users posts so that I can show my appreciation for their photography")|User Story|<ul><li>An upvote button associated with every post</li><li>Ability for non-owners to toggle upvote of photo</li><li>Code written to prevent a user from upvoting their own photo</li></ul>
Interaction|[6.2](#milestone-6---community-interaction "As a Site User I want to be able to comment on other users posts so that I can ask questions and/or start a discussion about the photo")|User Story|<ul><li>Comment form below each photo</li></ul>
Interaction|[6.3](#milestone-6---community-interaction "As a Site User I want to view a feed of those posts I've upvoted so I have easy access to those posts I've shown a particular interest in")|User Story|<ul><li>Link in navbar to personalised feed of upvoted posts</li></ul>
Interaction|[6.4](#milestone-6---community-interaction "As a Site User I want to view a feed of those posts I've commented on so I have easy access to posts where I am involved in a discussion thread")|User Story|<ul><li>Link in navbar to personalised feed of commented-on posts</li></ul>

## Skeleton

### Wireframe Models
Now that specific features had been decided upon, a wireframing tool was used to give guidance as to how these features would look in practice. All of the site-design models which follow can be viewed on one page [using the following link](https://cacoo.com/diagrams/0fnnxvmLc5f5SWHK/D61AD)

### Logged-Out Pages
- Home (logged-out)
- Sign Up
- Sign In

![Home-Intial](TO BE ADDED)
![Sign-Up](TO BE ADDED)
![Sign-In](TO BE ADDED)

### Logged-In Pages
- Home (logged-out)
- Profile
- Upload
- Photo Details

![Home-User](TO BE ADDED)
![Profile](TO BE ADDED)
![Upload](TO BE ADDED)
![Photo-Details](TO BE ADDED)


### Database Model
!!! MOVE THIS TO API README !!!

The [database model](TO BE ADDED) was designed on the basis of django-allauth handling data for authorised users, while the booking model would be coded by myself. The diagram below shows the relationship of various tables within the project, but central to this is the relationship between the 'auth_user' and 'booking_sys_booking' tables; specifically, a one-to-many by connection of the user_id and contact_id fields i.e. a single user can create many bookings, but each booking can only belong to one user.

![Database](TO BE ADDED)

## Surface  !!! TO BE UPDATED !!!
With wireframe and database models in place, actual features of the site could now be coded using HTML, Bootstrap for ReactJS, CSS, and JavaScript, all according to the criteria listed above.

### Design & Typography  !!! TO BE UPDATED !!!
  - [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) was chosen as the font for h1 and h2 elements throughout the site to give a refined 'serif' look to major headings
  - All other text on the site is styled using [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) to provide a minimalist contrast to the headings and be clearly legible for larger portions of text
  - The main colours selected for the site were chosen as a variation on a monochromatic scheme thus creating a refined, modern look to reflect the style of the restaurant. Specifically these colours and their hexadecimal codes are:
    - Eerie Black #1B1B1B
    - Dark Slate Grey #2F4F4F
    - Dim Grey #696969
    - Gainsboro #DCDCDC
    - Ghost White #F8F8FF
  - This palette was used to create the dark and light themes for the two distinct sections of the site i.e. the main/info section (darker theme) and the authorised-access only section for bookings (lighter theme). In each section the footer has a background colour of dark slate grey to provide continuity across the site   
  - The background image and landing page image were selected from the [Pexels](https://www.pexels.com/) library ([specific credit below](#credits--acknowledgements)) and chosen to reflect elements of the colour scheme
  - The site logo was chosen as an abstract representation of a steamer basket, a cooking device used in Asian cuisine, as well as somewhat imitating the light fixtures shown in the background image used throughout the site. This logo is also used as the favicon for the site. 

  ![Design](static/images/readme/design-board.png)

### Features Implemented !!! TO BE UPDATED !!!

Each of the following implementations was added in response to the acceptance criteria above, specific details of which are provided below each feature heading for easy reference.

#### Navbar & Toggler
> &bull; A navbar providing clear links to menu and location info  
&bull; A highlighted link to the booking area page in the navbar

![Navbar](static/images/readme/features-navbar.png)

- Links alter depending on which section of the site the user is accessing
- Links provided to each page of the site for easy navigation
- Navbar remains fixed to top of screen for constant access to links, even when scrolling
- Navbar toggler appears at screen sizes of 746px or less to preserve well-formatted layout
- Booking link given button formatting to stand out to users

#### Footer
> &bull; A footer providing summarised info and social links

![Footer](static/images/readme/features-footer.png)

- Footer remains fixed to bottom of screen for constant display of info and social links
- Footer resizes and hides certain details at different screen sizes to preserve well-formatted layout

#### Home Page
> &bull; A home page displaying opening times of the restaurant  
&bull; A home page also displaying a quick link to the booking area of the site  
&bull; Elements that display/resize/scroll when viewed on different sized devices

![Home](static/images/readme/features-home.png)

- The 'Open' image provides a clear welcome to users of the site
- The restaurant ethos, opening times and phone number are clearly displayed alongside this
- An additional 'Book Now' button is provided to guide users who may have arrived at the site for that single purpose
- Image and ethos hidden on smaller screens to preserve well-formatted layout and keep opening times clearly displayed
- Additional 'Menu' button appears on smaller screens for easier navigation to menu page 

#### Menu Page
> &bull; A static page showing the food and prices within the restaurant  
&bull; Elements that display/resize/scroll when viewed on different sized devices

![Menu](static/images/readme/features-menu.png)

- Food and prices clearly laid out under different headings
- Layout switches from two to one-column design at smaller screen sizes
- When necessary, page scrolls to display text hidden by footer

#### Location Page
> &bull; A static page showing the map location and transport options for the restaurant  
&bull; Elements that display/resize/scroll when viewed on different sized devices

![Location](static/images/readme/features-location.png)

- Restaurant location clearly indicated at centre of map
- Info regarding local parking and bus options given below map with appropriate icons
- Map and transport info resizes to preserve well-formatted layout at smaller screen sizes

#### Booking Admin
> &bull; An admin area only allowing access to the site admin/superuser  
&bull; A link to the database to clearly display the details of each booking i.e. entry in the database

![Admin](static/images/readme/features-admin.png)

- An admin area accessible via https://east-street-bc0671035c95.herokuapp.com/admin which can only be accessed by typing the address i.e. no direct link is provided to users of the site
- Username and password details must be entered to gain access and will only admit those designated as administrators
- A link named 'Bookings' provided in the lefthand menu allows the admin to view all entries on the database

#### Sign Up/In/Out Forms
> &bull; A sign-up form requiring username and password details  
&bull; A sign-in form requiring username and password details  
&bull; A sign-out form requiring the user to confirm that they wish to sign out

![Sign](static/images/readme/features-sign.png)

- Sign-in form linked directly to 'Bookings' link to display if user is not already logged in
- Text and link on sign-in form enables sign up if user is not already registered
- Sign-in form requires username and password in order to access booking area
- Sign-up form requires confirmation of password in case user types incorrectly in the first instance
- Text and link on sign-up form enables sign in if user is already registered
- Sign-out form linked directly to 'Logout' link and brand link in bookings section
- 'Sign Out' button returns the user to the home page with confirmation alert if successful
- 'Cancel' button keeps the user signed in and returns them to the 'New Booking' page 

#### Booking Form
> &bull; A booking form with date, time, and group size fields which saves those details to the database  
&bull; The option to only select between the days of Wednesday to Sunday inclusive on the booking form  
&bull; The option to only select between the hours of 12.30pm and 9.30pm inclusive on the booking form  
&bull; The option to only select between the group size of 1 and 12 inclusive on the booking form  
&bull; A navbar link to the form to allow access from a different area of the booking site

![Form](static/images/readme/features-form.png)

- The booking form is displayed as the initial page when the user signs into to this section of the site
- This form can also be accessed using the 'New Booking' link in the navbar
- The booking form displays the signed-in username and does not allow for this to be changed
- The booking form also displays text advising user of days which are unavailable for booking
- Attempting to book on today's date or earlier displays the message "A booking cannot be made any earlier than tomorrow"
- Attempting to book on a Monday/Tuesday displays the message "Sorry, the restaurant is closed on a Monday/Tuesday"
- Times are displayed as a dropdown selection in 15 minute intervals, only allowing for times when the restaurant is open
- Group size is also displayed as a dropdown menu only allowing for groups between 1-12 persons

#### User Booking List
> &bull; A list of bookings particular to that user which displays automatically after they have submitted a valid booking  
&bull; A navbar link to the list of bookings to allow access from a different area of the booking site

![List](static/images/readme/features-list.png)

- The booking list will display after a user has made a successful booking
- This user-specific booking list can also be accessed via the 'Current Bookings' link in the navbar
- Only bookings which the signed-in user has made will be displayed in the table
- The booking list will show the status of the booking alongside 'Update ad 'Delete' buttons, if appropriate, to allow for full CRUD functionality
- Date format and layout will adjust for smaller screen sizes in order to keep the list well organised

#### Booking Update Capabilities
> &bull; A button beside each entry in the booking list to allow updating of its details  
&bull; The displaying of the current details within the booking form when clicking said button  
&bull; The option of returning to the list without making changes  
&bull; The updating of these details to the database when the user changes values and clicks 'Confirm'

![Update](static/images/readme/features-update.png)

- A button marked 'Update' appears beside all bookings marked as either 'Pending' or 'Confirmed'
- The 'Update' button will be hidden for any entry whose status the restaurant has set to 'Cancelled'
- Clicking this button takes the user to an adjusted version of the 'New Booking' page
- This adjusted form provides a warning that confirmed bookings will be reset to 'Pending' if updated
- Users can either click 'Confirm & Update' to make changes or 'Return' to return to the booking list with details unchanged

#### Booking Deletion Capabilities

> &bull; A button beside each entry in the booking list to allow for its deletion  
&bull; The displaying of the details to be deleted alongside a warning when clicking said button  
&bull; The option of returning to the list without making changes  
&bull; The deletion of the booking on the database when the user clicks 'Confirm'

![Delete](static/images/readme/features-delete.png)

- A button marked 'Delete' appears beside all bookings in the booking list
- Clicking this button takes the user to the 'Delete a Booking' confirmation page
- This form provides a warning that deleting a booking cannot be undone alongside details of the booking to be deleted
- Users can either click 'Confirm & Delete' to delete the booking or 'Return' to return to the booking list without deletion

#### Booking Overview for Admin
> &bull; A list of all bookings made in the admin area of the site  
&bull; A dropdown option for each individual booking allowing for selection of 'Confirmed' or 'Cancelled'

![Overview](static/images/readme/features-admin-overview.png)

- A link named 'Bookings' provided in the lefthand menu allows the admin to view all entries on the database
- Booking names formatted as ```<date> <time> <contact> x<group size> - <status>``` and displayed in date order for ease of reading/understanding
- Clicking a booking name will take the admin to its detailed view where the status can be updated and saved
- These changes are fed back to the used via their booking list on the regular site

#### Error Pages
> &bull; A 403 Error page which provides a link back to a valid area of the site  
&bull; A 404 Error page which provides a link back to a valid area of the site  
&bull; A 500 Error page which provides a link back to a valid area of the site

![Errors](static/images/readme/features-errors.png)

- The 403 page displays when the user tries to access an area they do not have permission to view and provides links back to the main areas of the site
- The 404 page displays when the user tries to access a non-existent page and provides links back to the main areas of the site
- The 500 page displays when the there is an error with the site's internal server and provides links back to the main areas of the site

### Features to be implemented  !!! TO BE UPDATED !!!

The following features have been identified as long-term goals which bring value to the UX; however, they have not been implemented at this stage as they would require a significant time investment, thereby delaying vital other features of the site, or a level of programming knowledge which I haven't yet developed. 

- FEATURE 1
- FEATURE 2
- FEATURE 3

### Technology & Resources  !!! TO BE UPDATED !!!

#### Technologies Used  !!! TO BE UPDATED !!!
In order to code and design these featured the following technologies were utilised:

- Python Modules
  - asgiref==3.7.2
  - cloudinary==1.34.0
  - dj-database-url==0.5.0
  - dj3-cloudinary-storage==0.0.6
  - Django==4.2.7
  - django-allauth==0.55.0
  - gunicorn==21.2.0
  - oauthlib==3.2.2
  - psycopg2==2.9.7
  - PyJWT==2.8.0
  - python3-openid==3.2.0
  - requests-oauthlib==1.3.1
  - sqlparse==0.4.4
  - urllib3==1.26.15
- [Django](https://www.djangoproject.com/)
  - Used as the main Python framework in the development of this project
  - django-allauth is employed as the means of managing user accounts used for the booking system
  - Jinga/Django templating is used for queries to the database to insert data from it onto the site pages 
- [Heroku](https://heroku.com)
  - Used as the cloud-based deployment platform for this project
- [ElephantSQL](https://elephantsql.com)
  - Used as the database hosting service
- HTML
  - Used as the base coding language for templates and site content
- [Bootstrap](https://getbootstrap.com/)
  - Used as the main means of design layout and formatting throughout the site
- CSS
  - Used to modify Bootstrap behaviour where required and create additional custom stylings
- JavaScript
  - Used to create a timed automatic dismissal of on-screen alerts

#### Packages Used !!! TO BE UPDATED !!!
- [Gitpod](https://gitpod.io) used to code the site and transfer files between the editor and the repository
- [GitHub](https://github.com) used to store the files for this project
- [Cacoo](https://cacoo.com) used to develop the wireframe models for the site design
- [DBDiagram](https://dbdiagram.io/) used to create the database diagram
- [Google Fonts](https://fonts.google.com/) used to style the text throughout the site
- [Google Maps](https://www.google.com/maps) used to create the specific map for the Location page
- [TinyURL](https://tinyurl.com/app) used to shorten link for map source
- [Coolors](https://coolors.co/) used to help create the colour scheme
- [Markdown Table Generator](https://jakebathman.github.io/Markdown-Table-Generator/) used to create tables for documentation
- PowerPoint, MS Paint, and the Windows Photo app used to produce image files for documentation

#### Reference Materials  !!! TO BE UPDATED !!!
- ADD MORE HERE...
- [Code Institute](https://codeinstitute.net/) course materials and walkthrough projects provided many reference points for implementing features of this project
- Any other resources used are directly referenced where appropriate

## Testing  !!! TO BE UPDATED !!!

Manual and automated testing undertaken for this project can be viewed in the separate [TESTING.md file](TESTING.md) (_Use CTRL + Click to this or any of the following links in a new tab/window_). You can also navigate to a specific area of the file by selecting one of the headings below:

### Testing Contents  !!! TO BE UPDATED !!!
- [Introduction](TESTING.md#eastst---testing)
- [Manual Testing](TESTING.md#manual-testing)
    - [Navigation](TESTING.md#navigation)
    - [Responsiveness](TESTING.md#responsiveness)
    - [Authentication](TESTING.md#authentication)
    - [CRUD Functionality](TESTING.md#crud-functionality)
- [Automated Testing](TESTING.md#automated-testing)
- [Validator Testing](TESTING.md#validator-testing)
    - [W3C](TESTING.md#w3c)
    - [PEP8](TESTING.md#pep8)
    - [JSHint](TESTING.md#jshint)
- [Accessibility & Performance](TESTING.md#accessibility--performance)
    - [WAVE](TESTING.md#wave)
    - [Lighthouse](TESTING.md#lighthouse)
- [Bugs](TESTING.md#bugs)

## Deployment  !!! TO BE UPDATED !!!

### Heroku Deployment
This site was deployed to and is currently [hosted on the Heroku platform](https://east-street-bc0671035c95.herokuapp.com/). The steps for deploying to Heroku, using ElephantSQL as the database host, are as follows:

#### ElephantSQL Setup
  1. Navigate to [ElephantSQL](https://www.elephantsql.com/) and create an account/log in
  2. Click 'Create New Instance' in the top right
  3. Enter an Instance/Database name, choose a Plan (free version will suffice) then click 'Select Region'
  4. Select a region from the dropdown, click 'Review' and then 'Create instance'
  5. Return to the dashboard and click on the instance name
  6. In the URL section click the copy icon to copy the database URL

#### Django Project Settings
  7. In the project workspace, navigate to/create a file named 'Procfile' (remember the capital 'P')
  8. Add the following code replacing ```<myapp>``` with the actual app name then save the file:
      ``` python
      web: gunicorn <myapp>.wsgi
      ```
  9. Now navigate to/create a file named 'env.py'
  10. Add the following code, replacing ```<myurl>``` with the URL just copied from ElephantSQL and ```<mykey>``` with a string of your choice then save the file:
      ``` python
      import os

      os.environ["DATABASE_URL"]=<myurl>
      os.environ["SECRET_KEY"]=<mykey>
      ```
  11. Open 'settings.py' and add the following near the top of the code:
      ```python
      import os
      import dj_database_url
      if os.path.isfile('env.py'):
        import env
      ```
  12. Further down the page, replace any current instance of the SECRET_KEY variable with:
      ``` python
      SECRET_KEY = os.environ.get('SECRET_KEY')
      ```
  13. Replace the DATABASES variable with
      ```python
      DATABASES = {
        'default': dj_database_url.parse(os.environ.get("DATABASE_URL"))
        }
      ```
  14. Save the file then run ```python manage.py migrate``` in the terminal
  15. Commit and push these changes to the repository

#### Heroku Setup
  16. Navigate to [Heroku](https://heroku.com) and create an account/log in
  17. Click 'New' in the top right and select 'Create New App'
  18. Enter an App name (must be unique), choose a region, and then click 'Create app'
  19. Select 'Settings' in the menubar
  20. Click 'Reveal Config Vars' and add the following:<br>
    - DATABASE_URL: the DATABASE_URL copied from ElephantSQL<br>
    - SECRET_KEY: The SECRET_KEY string you created<br>
    - PORT: 8000
  21. Click 'Deploy' in the menubar tab then 'GitHub' under 'Deployment method'
  22. Select the repository you want to deploy and click 'Connect'
  23. Scroll down and click 'Deploy Branch' to complete the process

### Forking the Repository
1. Login to/create your [GitHub](https://github.com) account
2. Navigate to the EastSt. GitHub Repository: https://github.com/ndsurgenor/east-street
3. Towards the top right, under the main banner, click 'Fork'
4. Adjust the form fields if desired, then click 'Create fork' to finish

### Cloning the Repository/Running Locally
1. Login to/create your [GitHub](https://github.com) account
2. Navigate to the EastSt. GitHub Repository: https://github.com/ndsurgenor/east-street
3. Click the '<> Code' dropdown button and ensure 'HTTPS' is selected
4. Click the copy icon (two overlapped squares) beside the repository URL
5. Open your local IDE and create a new project, ensuring git is installed
6. Run ```git clone copied-git-url``` in the terminal to finish

## Credits & Acknowledgements
- Background image by...
- useViewportWidth() hook adapted from [code by Ferdinand Steenkamp](https://forum.rescript-lang.org/t/addeventlistener-for-window-resize/1254/3)
- README.md and TESTING.md structure/outline adapted from documentation by ...
- Many thanks to my Code Institute tutor [Daisy McGirr]([https://github.com/G-Taylor](https://www.linkedin.com/in/daisy-mcgirr-4a3671173/)) for her guidance and support in building this project