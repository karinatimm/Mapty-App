# Mapty App

Welcome to Mapty App! Mapty is a web application designed to help you track and log your workouts. Whether you're running through the city streets or cycling along scenic routes, Mapty makes it easy to record your exercise activities and visualize them on a map. Please note that it may take some time for the map to be downloaded initially.

This project was completed by me as part of the course "The Complete JavaScript Course 2024: From Zero to Expert!" created by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman) on the Udemy educational platform. While this course provided the initial set of features, I successfully implemented them and expanded upon the project by introducing additional functionalities to enhance user experience such as convenient error display, reset results, and other usability improvements.

## Features

- **Track Workouts**: With Mapty, you can log various types of workouts, including running and cycling. Simply input various details such as distance, duration, type of workout and etc., and Mapty will display your workouts on a map for easy reference.
- **Interactive Map**: Mapty integrates with a third-party map service to provide an interactive map interface. You can view your workout routes, locations, and details directly on the map, making it convenient to visualize your fitness activities.
- **Geolocation**: Mapty automatically detects your current location using geolocation technology. This allows you to start tracking your workouts from anywhere without needing to manually enter your location.
- **Save and Reset**: Mapty ensures that your workout data is saved locally, enabling access when the app is reloaded. If needed, users can click the reset button to clear their data.
- **Error Handling**: Mapty provides clear and informative error message to help you troubleshoot any issues that may arise during the tracking process. This ensures a smooth and hassle-free user experience.

### Deployment

This project has been deployed on Netlify and is accessible at the following URL:
**[![Netlify Status](https://api.netlify.com/api/v1/badges/630fe60b-b94e-4b2a-a165-f476d7b89165/deploy-status)](https://mapty-app-kartim.netlify.app)**

## System Requirements if one wants to run this Mapty App locally:

To run this application locally, ensure you have the following software installed on your system:

- Node.js(version 20.3.0 LTS or higher) **(https://nodejs.org/)**
- Node Package Manager(npm) **(https://www.npmjs.com/)**

### Installation and usage instructions:

Follow these steps to install and run this app:

- Check if Node.js and npm are installed:

Check if you Node.js and npm are installed on your computer. If they are not installed, use the links provided in the "System requirements" section above to install them. If they are already installed, check their versions by opening your terminal or command prompt and running the following commands:

**node -v**
**npm -v**

- Clone the Mapty App repository:

Open the terminal or command prompt, navigate to your desired directory, and clone the repository from GitHub using the provided link:

**git clone https://github.com/karinatimm/Mapty_app.git**

- Move to the project directory on your computer. If desired, rename the directory as required:

**cd Mapty_app**

- Install project dependencies using npm:

**npm ci**

- Execute the following command to start working with this project locally by opening the localhost reference in the browser:

  **npm start**

### Quality Assurance

### Linter status:

[![ESLint Status](https://img.shields.io/badge/ESLint-Passing-brightgreen.svg)](https://github.com/karinatimm/Mapty_app.git)
