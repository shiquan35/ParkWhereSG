# ParkWhereSG

Search for the nearest public carpark to your destination in Singapore.

## To start the app

Run `npm i` for both backend and frontend files

Note:
if you do not have `node` `nodemon` globally installed, please install it (`npm i nodemon`, `npm i node`) after running `npm i`

## Things to note:

The UI for this app would fit most laptop and mobile screen sizes. Do note that if viewing this application from a tablet, the size of the display map may be larger than the screen size of the tablet.

## Interface:

The features of this application is available for all users, except the "Add to Favourites" function, which will require the user to create an account before being able to access it.

### Homepage / Map View

![image](https://user-images.githubusercontent.com/86793931/199426423-ae898b67-6f6a-403b-9603-d1fe5470b80e.png)
Type in your destination in the search bar and the map will automatically populate the nearest carparks within the area of your destination.
<br />
Click on the carpark marker for specific information such as: Carpark Name, Lots Available, Duration of Parking Charges.

### Carpark Rates

![image](https://user-images.githubusercontent.com/86793931/199428177-cc42ebb9-623d-40c3-b36a-6efb84bdad3e.png)
<br />
The parking rates for most public parking in Singapore are of similar pricing with the exception of a few areas. These prices are taken from the HDB Website (https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges)

### Dashboard

Users may save frequented carparks in their dashboard by clicking the "Add to Favourite" button on the map. Please note that the dashboard is only accessible to logged in users.
![image](https://user-images.githubusercontent.com/86793931/199430395-902db974-9e2e-45db-9bb8-965518a7f245.png)
![image](https://user-images.githubusercontent.com/86793931/199430520-162fa62b-17ed-470b-91af-7b7124757ccc.png)
