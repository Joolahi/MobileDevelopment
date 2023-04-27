import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;  // importing the dart:convert library for converting data
import 'dart:convert';  // importing the dart:convert library for converting data

import 'movies_details.dart';

class MoviesList extends StatefulWidget {
  const MoviesList({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _MoviesListState createState() => _MoviesListState();
}

class _MoviesListState extends State<MoviesList> {
  late List<dynamic> movies; // initializing the list of movies to be empty initially


  static const Color backGroundcolor = Color(0xFF1A120B);
  static const Color textColor = Color.fromRGBO(229, 229, 203, 1.0);
  static const Color buttonColor = Color(0xFF3C2A21);


  // A function to fetch the data from the API
  void fetchMoviesData() async {
    var response = await http.get(Uri.parse(
        'https://api.themoviedb.org/3/movie/popular?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&page=1'));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      setState(() {
        movies = data['results'];
      });
    } else {
      throw Exception('Failed to load movie data');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchMoviesData();   // calling fetchMoviesData() function to get the movie data when the screen loads
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text(
            'Popular Movies',
            style: TextStyle(color: textColor),
          ),
          backgroundColor: backGroundcolor,
        ),
        // ignore: unnecessary_null_comparison
        body: Container(
          color: buttonColor,
          // ignore: unnecessary_null_comparison
          child: movies == null               // checking if the movie list is empty or not
              ? const Center(                 // if the movie list is empty, show a circular progress indicator
                  child: CircularProgressIndicator(),
                )
              : ListView.builder(                    // building the list of movies
                  itemCount: movies.length,
                  itemBuilder: (context, index) {
                    final movie = movies[index];

                    // wrapping the movie details in an InkWell to make it clickable
                    return InkWell(
                      onTap: () {
                        // navigating to the movie details screen when the movie is clicked
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                MovieDetailScreen(movie: movie),
                          ),
                        );
                      },
                      child: Card(
                        color: textColor,
                        margin: const EdgeInsets.all(8.0),
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Row(
                            children: [
                              Image.network(
                                'http://image.tmdb.org/t/p/w92${movie['poster_path']}',
                                fit: BoxFit.cover,
                              ),
                              const SizedBox(width: 16.0),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      movie['title'],
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16.0,
                                      ),
                                    ),
                                    Text(
                                      movie['release_date'],
                                      style: const TextStyle(
                                        fontSize: 14.0,
                                      ),
                                    ),
                                    Text(
                                      movie['overview'],
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontSize: 14.0,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
        ));
  }
}
