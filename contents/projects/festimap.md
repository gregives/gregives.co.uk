---
title: Festimap
titleShort: ''
date: 2019-04-01
image: '/assets/images/dynamic/festimap/screenshots1.png'
description: Progressive web app designed to share photos at festivals around the world, created for a university module on modern web development
tags:
  - Node.js
  - Express
  - socket.io
  - MongoDB
  - Passport
  - Vue
  - Mapbox
---

Festimap is a progressive web app designed to share photos from festivals around the world. Created as a university project with [Tom Croasdale](https://tomcroasdale.dev), Festimap was built with Express, Node.js, MongoDB and Vue.

![Screenshots of Festimap app](/assets/images/dynamic/festimap/screenshots1.png)

## Requirements

We were tasked with creating a progressive web app for use at festivals, which must work both offline and online. Users should be able to take photos using the app and upload the photos to the festival they are attending, along with an optional description. Users should be able to browse festivals on a map and create a new festival at a given location (which would then be verified). In order to satisfy the requirements of the system, we created 6 pages including: a login/signup page; a home page which displays a typical social media feed of users' posts; a page to create a post and take a photo; a profile page for each user; a map of all current festivals; and a page to create new festivals.

![Screenshots of Festimap app](/assets/images/dynamic/festimap/screenshots2.png)

## Implementation

The server uses Node.js and Express for the routing of the application and MongoDB for our document-driven database. We use both AJAX and socket.io for communicating between the client and the server. We used Passport, an authentication middleware for Express, in order to create and validate users' authentication when logging into the app.

The front-end uses Vue and Bootstrap for the interface, with some custom branding on top. The interactive map to view the festivals uses [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/overview/), a JavaScript library that uses WebGL to render interactive maps from vector tiles.

A focus of the project was to make the app a fully-fledged progressive web app, which works both offline and online. Key to this was the service worker which would cache resources and the IndexedDB. The IndexedDB was designed to mirror the MongoDB server, with very similar documents for stories and events --- when the app was online, it would sync the IndexedDB with the MongoDB, so that when the app went offline it would fallback to the mirrored version on the device. When taking a photo on the device, it was first stored into the IndexedDB; if there was no internet connection it would then sync the photo at a later date and upload the photo to the server.

![Diagram showing the layout of the progressive web app's pages and data flow](/assets/images/dynamic/festimap/diagram.png)
