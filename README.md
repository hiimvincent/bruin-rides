# Bruin Rides

Bruin Rides is platform that helps UCLA students save money by coordinating rideshare groups.

## Purpose

Whether it's sightseers looking for fun in downtown LA, beach-goers headed to Santa Monica, 
or even Bruins hoping to get a better rate on their trip to LAX, Bruin Rides is the central 
location for all UCLA students looking to split transportation costs.

Find rides created by fellow Bruins or create your own ride for others to join.

## Features

Bruin Rides offers a variety of features including:

- Account creation/login, adding relevant contact details to profile, and seeing current rideshares
- Editing profile informantion such as first name, last name, and email after account creation
- Adding and removing rideshare requests organized by group size, date, time, and location
- Searching and filtering relevant rideshare requests from UCLA based on date, time, and location
- Joining/leaving rideshares created by other users and get the contact info for rideshare members

## Run Locally

This project can be run locally by following the steps below.

Clone the repository using:

```
git clone git@github.com:hiimvincent/bruin-rides.git
```

Set up the project using:

```
cd bruin-rides
cd src/server
npm install
cd ../client
npm install
```

Create a file called ```.env``` in ```src/server``` and paste in the mongoDB API key:
``` 
DATABASE_URL=mongodb+srv://INSERT_API_KEY_HERE
```

Then start the backend in ```src/server``` by running:
```
npm run devStart
```

Finally, run the frontend from ```src/client``` locally with:
```
npm start
```

## More Info

More information about the project structure and design can be found using the following links:

[Presentation Slides](https://docs.google.com/presentation/d/13tyhhxncBWvAt1bGz-lyz6WBvLOqO-0GKxVdkrW4zyc/edit?usp=sharing)

[Project Proposal](https://docs.google.com/document/d/184NQZ7YtGccJ1xOpeU93VNF680S57QEdOa7TqZwsF7w/edit?usp=sharing)

[Project Timeline](https://docs.google.com/document/d/1hySZwTxMKwEKLpYeaiA2VunZeTdlS-ZPaws4GEH8LXg/edit?usp=sharing)

## Credit

This project was a collaboration by:

- Morgan Mason
- David Lee
- Ryan Lee
- Satyen Subramaniam
- Vincent Johnson
