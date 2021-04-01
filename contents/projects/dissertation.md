---
title: Computer Vision System for a Chess-Playing Robot
titleShort: Dissertation
date: 2019-05-01
image: '/assets/images/dynamic/dissertation/demonstration.png'
description: A computer vision system for a chess-playing robot. Tracks the state of a chessboard over time, using Python, scikit-learn and OpenCV
tags:
  - Python
  - OpenCV
  - scikit-learn
  - Flask
  - Vue
---

I completed my dissertation as part of my 3^rd^ year of university. Entitled "A Computer Vision System for a Chess-Playing Robot", my dissertation aimed to infer the state of a chessboard from a webcam placed above the board. You can [download the report here](https://gregives.co.uk/projects/dissertation/dissertation.pdf). Here's what the finished system looks like!

![Demonstration page of the system](/assets/images/dynamic/dissertation/demonstration.png)

## Impetus

Isn't it easy to detect moves being played on a chessboard? In general, a move consists one piece moving from one square to another square, the possible destination squares being determined by the type of the chessman being moved. However, pieces can often be very difficult to see from above, even for the human eye.

Here is a storyboard of a pawn being moved from square `e2` to square `e4`. The leftmost image is before, the middle image is after and the rightmost image is the difference between the two. As you can see, it is not as simple as finding the square which has changed the most.

![Storyboard showing chess move e2e4](/assets/images/dynamic/dissertation/e2e4.png)

The motivation for the project was to create a computer vision system which could successfully detect moves being played regardless of the lighting conditions and environment. The abstract is as follows:

> The aim of this project is to design a computer vision system to be used by a chess-playing robot, capable of detecting opponents' moves and returning the best move to be played by the robot. The system should be robust to changes in perspective, lighting and other environmental factors so that it can be used in any reasonable setting.

## How It Works

As seen previously, it is not possible to simply use the difference between keyframes in order to determine which piece has been moved. After some experimentation, the Canny edge detection provided by OpenCV proved to be incredibly valuable, identifying the edges of pieces even when they could barely be seen. Here you can see the effect of Canny edge detection on the previous storyboard of move `e2e4`. The image on the right is taken by the difference of the sums of each square in the board --- a higher difference denotes more change in the square.

![Canny edge detection on move e2e4](/assets/images/dynamic/dissertation/canny.png)

The result of Canny edge detection alone is not enough to infer the move which has been made, however, it does clearly show which squares have changed the most. I combine this with two other metrics:

1. The possible moves according to the rules of chess
2. A classification of the colour of each square and its piece

Finding which moves are possible at each point in the game is trivial; the `python-chess` [library by Niklas Fiekas](https://github.com/niklasf/python-chess) provides a simple API for move generation and validation, which I used to keep track of the state of the chessboard over time.

I classified the colour of the squares and their pieces using a K-nearest neighbours algorithm. Before each move, the variance and intensity of each square were found in order to produce clusters of points, each cluster representing a colour combination of the square and its piece. There were 6 clusters of points, namely:

1. Empty black square
2. Empty white square
3. White piece on black square
4. Black piece on black square
5. White piece on white square
6. Black piece on white square

After a move had been played, each square of the chessboard was classified into a cluster using the K-nearest neighbours algorithm. The probability of each move having occurred was found and combined with the result of the Canny edge detection to find the most probable move.

## Designing the User Interface

I envisaged a dashboard-like system which would provide an overview of the current state of the game and briefly show how the application worked. As the application would be very interactive, for example controlling video playback and annotating moves as the game progressed, I opted to use [Vue.js](https://vuejs.org) as my front-end framework of choice: Vue would handle the data layer on the front-end without me having to worry about DOM manipulation or state management. The application would connect to the Python server in order to live stream the video playback and receive information about the game being played.

For the user interface, [Bootstrap](https://getbootstrap.com) seemed the most obvious choice for a framework as it would allow me to rapidly prototype ideas without worrying about the maintenance of the CSS for the components. [BootstrapVue](https://bootstrap-vue.js.org) allowed plug-and-play components within the application.

![Demonstration page of the system](/assets/images/dynamic/dissertation/demonstration.png)

![Annotation page of the system](/assets/images/dynamic/dissertation/annotation.png)

![Testing page of the system](/assets/images/dynamic/dissertation/testing.png)

## Conclusion of the Report

The system was tested with respect to many different factors, including lighting conditions and angle of the webcam. In 'reasonable' conditions, the system performed very well. Over the whole suite of test data, the computer vision system was found to have a success rate of 96.3% ± 8.4%. This shows promising performance whilst no constraints are upon the system, however, there is definitely scope to see the project taken further. With a larger set of chess videos to train the system upon, new algorithms and techniques could continue to improve the performance and robustness of the system, with the aim of creating a fully autonomous chess-playing robot.

To find out more, please [download the report here](/projects/dissertation/dissertation.pdf) or take a look at the repository.
