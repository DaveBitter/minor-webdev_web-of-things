# Minor WebDev | Web Of Things
Dave Bitter | Camille Niessen | Zishan K. Pasha | Tristan Jacobs | Ioannis Kapritsias

    V 1.0.0

## General
This repository holds the seperate exercises for the course 'Web Of Things', part of the minor "Webdevelopment" at the [HvA](http://www.hva.nl/)

All exercise folders are standalone projects and work as such. You can navigate through the folder structure or through the navigation below.

## Issues
We highly encourage adding issues to this repo in the case of finding one. We are always up for improving our code.

## Getting started
### Clone this repo, duh
    git clone https://github.com/DaveBitter/minor-webdev_web-of-thingsreal-time-web.git
    cd minor-webdev_web-of-things

### Install the dependencies
    npm i

### Start up the server
When you run this command, changes in serverside JS files will be watched and the server will restart automatically, changes in clientside JS files will be watched and browserified and the server will be restarted.

    npm start

### Additional commands
Browserify clientside JS

    npm run build

Watchify clientside JS

    npm run watch

Clean clientside build.js file

    npm run clean

## Wishlist
* Implement dashboard for queue system.

Possible Example
[![Example Dashboard](https://s8.postimg.org/e7mttllit/queue_dashboard.jpg)](https://postimg.org/image/4zulcwegh/)

## License
[MIT](LICENSE.md)
