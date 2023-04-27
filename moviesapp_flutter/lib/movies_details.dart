import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MovieDetailScreen extends StatefulWidget {
  final dynamic movie;
  const MovieDetailScreen({Key? key, required this.movie}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _MovieDetailScreenState createState() => _MovieDetailScreenState();
}

class _MovieDetailScreenState extends State<MovieDetailScreen> {
  late String imagePath = 'https://image.tmdb.org/t/p/w500';
  late String imageUrl = imagePath + widget.movie['backdrop_path'];
  List<dynamic> genres = [];
  Map<String, dynamic> info = {};
  List<dynamic> trailers = [];

  static const Color backGroundcolor = Color(0xFF1A120B);
  static const Color textColor = Color.fromRGBO(229, 229, 203, 1.0);
  static const Color buttonColor = Color(0xFF3C2A21);

  void fetchMovieData() async {
    var response = await http.get(Uri.parse(
        'https://api.themoviedb.org/3/movie/${widget.movie['id']}?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&append_to_response=videos'));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      setState(() {
        genres = data['genres'];
        info = data;
        trailers = data['videos']['results'];
      });
    } else {
      throw Exception('Failed to load movie data');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchMovieData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: buttonColor,
        appBar: AppBar(
          title: Text(widget.movie['title'],
              style: const TextStyle(color: textColor)),
          backgroundColor: backGroundcolor,
        ),
        body: SingleChildScrollView(
            // Wrap the body in a SingleChildScrollView widget to allow for scrolling.
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          SizedBox(
              height: 200,
              width: double.infinity,
              child: Image.network(imageUrl, fit: BoxFit.cover)),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.movie['title'],
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18.0,
                color: textColor,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.movie['release_date'],
              style: const TextStyle(
                color: textColor,
                fontSize: 14.0,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.movie['overview'],
              style: const TextStyle(
                color: textColor,
                fontSize: 14.0,
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Genres:',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: textColor,
                fontSize: 15.0,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 25.0),
            child: Wrap(
              children: [
                for (var genre in genres)
                  Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: Text(
                      genre['name'],
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: textColor,
                        fontSize: 15.0,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Runtime: ${info['runtime']} min',
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: textColor,
                fontSize: 15.0,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Budget: ${info['budget']} USD',
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: textColor,
                fontSize: 15.0,
              ),
            ),
          ),
        ])));
  }
}
