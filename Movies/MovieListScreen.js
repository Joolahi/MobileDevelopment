import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';

const MoviesList = (props) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&page=1')
            .then(response => {
                console.log(response.data.results);
                setMovies(response.data.results);
            })
    }, []);

    if (movies.length === 0) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Loading, please wait...</Text>
            </View>
        )
    }
    let movieItems = movies.map(function (movie, index) {
        return (
            <TouchableHighlight
                onPress={_ => itemPressed(index)}
                underlayColor='lightgray'
                key={index}>
                <MovieListItem movie={movie} key={index} />
            </TouchableHighlight >
        );
    });
    const itemPressed = (index) => {
        props.navigation.navigate('MovieDetails', { movie: movies[index] });
    }

    return (
        <ScrollView>
            {movieItems}
        </ScrollView>
    )
}

const MovieListItem = (props) => {
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + props.movie.poster_path;
    return (
        <View style={styles.movieItem}>
            <View style={styles.movieItemImage}>
                <Image source={{ uri: imageurl }} style={{ width: 99, height: 146 }}></Image>
            </View>
            <View style={{ marginRight: 20 }}>
                <Text style={{ fontWeight: 800, color: 'black' }}>{props.movie.title}</Text>
                <Text style={styles.movieItemTitle}>{props.movie.release_date}</Text>
                <Text style={styles.movieItemTitle} ellipsizeMode='tail' numberOfLines={6}>{props.movie.overview}</Text>
            </View>
        </View>
    )
}




const MovieListScreen: () => Node = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                <MoviesList navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    movieItem: {
        margin: 5,
        flex: 1,
        flexDirection: 'row'
    },
    movieItemImage: {
        marginRight: 5
    },
    movieItemTitle: {
        fontWeight: 'bold',
    },
    movieItemText: {
        flexWrap: 'wrap'
    }
});

export default MovieListScreen;
