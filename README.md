# liri-node-app

### Overview

This is a command-line-driven node.js application that allows users to retrieve basic information about songs, movies, and concerts.  Search results are output to the terminal/bash window. Searches and results will also be logged in the `log.txt` file.

Supported commands and functions:

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will search the Spotify API and show the following information about the song in the terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from


3. `node liri.js movie-this '<movie name here>'`

   * This will search the OMDB API and output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

4. `node liri.js do-what-it-says`

   * This will randomly call one of the above commands and output the results to the terminal/bash window.



### Demonstration Video

* click the link below to view a demonstration of liri-node-app functionality.
`https://drive.google.com/file/d/1JI4ivjAF_8VNdGQ8y7k-EqBtITbhBzwz/view`


