import 'package:flutter/material.dart';
import 'movies_list.dart';

// Main function, the entry point of the app and alling the constructor of MyApp widget and running the app
void main() {       
  runApp(const MyApp());
}


// MyApp widget, which extends StatelessWidget inside is constructor with a named parameter
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {

    // Returning MaterialApp widget, the root of the widget tree
    return const MaterialApp(
        debugShowCheckedModeBanner: false,  //This will only disable debug banner on emulator
        title: 'Movies App',
        home: StartingPage(title: 'MoviesApp'));
  }
}

class StartingPage extends StatefulWidget {
  const StartingPage({super.key, required this.title}); // Constructor with a named required parameter and under it final property to store the title
  final String title;

  @override
  State<StartingPage> createState() => _StartingPage();  // Creating the state object for StartingPage
}



// The state object for StartingPage widget, which extends State
class _StartingPage extends State<StartingPage> {
  static const Color backGroundcolor = Color(0xFF1A120B);
  static const Color textColor = Color.fromRGBO(229, 229, 203, 1.0);
  static const Color buttonColor = Color(0xFF3C2A21);


  // A function to navigate to the MoviesList page
  void navigateNextPage(BuildContext movielistpage) {
    Navigator.of(movielistpage).push(MaterialPageRoute(builder: (_) {
      return const MoviesList();
    }));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundcolor,
      body: Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          children: [
            Image.asset(
              'assets/Movies.png',
              height: 500,
              width: 500,
              fit: BoxFit.cover,
            ),
            const Text(
              'Welcome to find your next favorite movie with MoviesApp',
              style: TextStyle(
                color: textColor,
                fontSize: 20,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(
              height: 50,
            ),

            // Navigating to the MoviesList page when the button is pressed
            ElevatedButton(         
              onPressed: () {
                navigateNextPage(context);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: buttonColor,
                padding:
                    const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
              ),
              child: const Text(
                'View MovieList',
                style: TextStyle(
                  color: textColor,
                  fontSize: 20,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
