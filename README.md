# CupOSugah

CupOSugah is a social media website that allows users to choose a neighbourhood, and only see posts that are made in their neighbourhood. After the user registers their account, the Google Maps geocoding API to determine the user's location, cross references the database and provides 2 of the closest neighbourhoods the user can choose from.

Features - 

- Help Wanted/Offered Posts
- Event calendar 
- Alert Posts
- Instant messaging system
- SMS notifications for selected posts (via Twilio)

This was created as a project for the Lighthouse Labs Web Developer program. It was a group project with [Sam Gadet](https://www.github.com/Samy0412) and [Graham Mothersill](https://www.github.com/GrandMothersill) 


## Video of website walkthrough
[Click for YouTube Video](https://www.youtube.com/watch?v=ANXvLV38fXI)

## Technologies Used

React, React Router, Sass, PostgreSQL, Node, Express

## Installation Instructions

The server and client are located in their own separate folders, each with their own package.json folder. The server needs to run concurrently with the React app. Please see the readme files in each folder for instructions on how to run. 

Please note that there are currently only 2 neighbourhoods in the database (2 in Toronto, 2 in Montreal). So when you register an account you will be prompted for either Toronto or Montreal neighbourhoods only, depending on your location. 

## Future Developments 

The app is currently not complete. Future developments will include - 

- The ability for users to create their own neighbourhoods based on Google Maps pins they set. 
- Messages to open up in a modal instead of a new page
- Users able to filter messages by user instead of all messages showing on their message page