ABOUT
TRVL: A travel planner app for creating and editing trips, exploring
destinations and recommendations, and getting travel updates.

DEMO
https://youtu.be/ziQNSykEv3U

PROJECT STRUCTURE
The user is met with a Login/Create Account screen. This is 
part of the AuthStack. After valid authorization, the app
navigates to the MainStack, which has 5 tabs:
1. Home/Map: Search for any locations, navigate between the
results by using the previous/next buttons, and click on
markers to make the callout appear to see more details.
More details navigates to LocationInfo, where all information
fetched from Google Places is displayed. From this screen, there 
is a button to add this location to a trip, which will make the 
CreateViewTrips screen appear. Since there are route params
of the location details, the CreateViewTrips will expect a 
trip click before being dismissed. There is also a back 
button if you change your mind and no longer want to add it 
to a trip. Please note, that from this CreateViewTrips pop-up,
you cannot create a new trip. So, you must first have existing 
trips or create one in order to add new locations.
2. Trips: Create, delete, and rename trips. You can also rearrange
the order of your trips. Locations can be added to trips from the 
Home/Map -> LocationInfo. Clicking on a trip navigates to 
TripInfo, where you can remove trip locations or rearrange them.
You can also see all the locations as markers on a map. Clicking
on a location in a trip will show location details as they 
were presented from the map in LocationInfo, this time fetching the 
details from the database, saving from additional API calls. Although 
with time the information might become outdated (i.e. a change in
opening hours), the user can always search the location in the map to
get the most recent updates, if any.
3. Real-time travel updates: Accepts a zip code or a city 
and displays the weather and/or forecast, depending on user 
choice. Forecast is shown in 3 3-hour increments.
4. Destination Reccomendations: A list of domestic and overseas
destinations. Clicking on a destination navigates to DestinationInfo, 
which includes pictures, locations, and location description.
This tab serves to provide ideas for the user if they are not
familiar with what to do in an area, or want to plan a future
trip and are not sure where to go. 
5. Account: Greets the user and has a button to log out.

INSTALLATION INSTRUCTIONS
This React Native app can be run via Expo. You must install 
npm on your computer. Instructions can be found here:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Then, in terminal, open (cd) the project directory. 
Type 'npm install' to download all required dependencies.
Then, 'npx expo start'. You can either run the project on
computer emulators or download the Expo app and scan the 
QR code displayed on screen.

You will need to acquire 3 keys: Google Places API,
Open Weather API, and Firebase configuration. The Google Places
API should give you free credits and a free trial.
Open Weather has a limit on free API calls. You must
create a new Firebase database, for which npm configuration can be 
found under Project Overview -> Project Settings. You must 
also enable email/password signin method under Authentication.
Relevant links can be found in the config.js file, where you 
will need to paste your keys. 

USAGE GUIDELINES
1. Account Creation and Login:
Start by either creating an account or logging in using your credentials.
2. Creating and Managing Trips:
Navigate to the "Trips" tab to create, delete, or rename trips.
To add locations to your trips, go to the "Home/Map" tab, search for a 
location, and click on a marker to view more details. 
From there, you can add the location to an existing trip.
In the "Trip Details" screen, you can further manage your trip 
by removing locations or rearranging them.
3. Exploring Locations and Recommendations:
Use the "Home/Map" tab to search for locations and explore their details.
Discover destination recommendations in the "Destination Recommendations" tab. 
Click on a destination to view more information in the "Destination Info" screen.
4. Real-time Travel Updates:
Get real-time weather updates by entering a zip code or city name in the 
"Real-time Travel Updates" tab. Choose to view current weather conditions 
or a forecast for the next few hours.
5. Account Management:
Access your account information and log out from the "Account" tab.

IN THE FUTURE
Due to time constraints, all ideas could not be implemented.
In the future, we would consider the following features that
could greatly improve the functionality of the app:
1. Home/Map: Search in the region that is currently in user
view. Currently, to search beyond current location, you have to type
"cafes in London," for example, or write the specific name/address.
2. Trips: accepting dates and flight numbers. A field for 
notes/trip description. A sharing link so friends can see 
the trip in the browser, or add it to their app so a group
trip can be planned together and updated in real-time.
3. Real-time travel updates: providing weather information
not by input, but by accessing the locations in each trip and
fetching weather information for each trip based on the first 
location in that trip. Adding icons for describing the weather.
Additionally, accessing flight numbers/dates to display 
the flight status (on time, delayed, cancelled), gate, etc.
4. Destination recommendations: Ideally, these would not be
statically written recommendations. Integration of AI to 
recommend locations based on the user's current trips and/or 
user preferences (would need to ask for those, i.e. beaches, 
cities, rural areas, continent). Additionally, each location 
recommended would have a "Add to trip" button, making this 
screen more integrated with the rest of the app and making
the process more seamless for the user, eliminating the need
to go and search the location after reading about the recommendation. 
This feature would fetch the most accurate location data 
through the Google API, similar to how Home/Map locations 
are fetched.
5. Account: Providing a forgot password option. Once logged in,
having profile information beyond the "Welcome, [full name]".
Ideas include: profile picture, reset password/email/name,
TRVL member since, and other stats.

This project was made by Collins Otieno, Mariya Popova, and John Warren.
March 2024 - May 2024.
