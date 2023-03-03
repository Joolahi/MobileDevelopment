import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import axios from 'axios';
import YouTube from 'react-native-youtube';

export default function MovieDetailScreen(props) {
    const { route } = props;
    const { movie } = route.params;
    let IMAGEPATH = 'http:/image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + movie.backdrop_path

    const [genres, setGenres] = useState([]);
    const [info, setInfo] = useState([]);
    const [trailers, setTrailers] = useState([]);
    useEffect(() => {

        axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&append_to_response=videos')
            .then(response => {
                setGenres(response.data.genres);
            })
    }, []);

    let movieGenres = genres.map(function (genres, index) {
        return (
            <View>
                <MovieGenresList genres={genres} key={index}></MovieGenresList>
            </View>
        )
    });

    function MovieGenresList(props) {
        return (
            <View>
                <Text style={styles.genres}>{props.genres.name}</Text>
            </View>
        )
    }
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&append_to_response=videos')
            .then(response => {
                setInfo(response.data);
            })
    }, []);

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=875bb04b769cd254a5cd16ded8babc13&language=en-US&append_to_response=videos')
            .then(response => {
                setTrailers(response.data.videos.results);
            })
    }, []);

    let movieTrailers = trailers.map(function (trailers, index) {
        return (
            <View>
                <MovieTrailers trailers={trailers} key={index}></MovieTrailers>
            </View>)
    });

    function MovieTrailers(props) {
        return (
            <TouchableHighlight
                onPress={_ => linkPressed(props.trailers.key)}
                underlayColor='lightgray'>
                <Text style={{ paddingBottom: 10, fontSize: 14, color: 'blue', paddingLeft: 10 }}>{props.trailers.name}</Text>

            </TouchableHighlight >

        );
    };
    const linkPressed = (index) => {
        props.navigation.navigate(
            'PlayTrailer',
            {trailerKey: index}
        );
    };


    return (
        <View>
            <ScrollView>
                <Image source={{ uri: imageurl }} style={styles.image}></Image>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.text}>{movie.release_date}</Text>
                <Text style={styles.text}>{movie.overview}</Text>
                <View style={{ justifyContent: 'center', margin: 5 }}>
                    <Text style={styles.infoTextHeadlines} >Genres:</Text>
                    <Text style={styles.genres}> {movieGenres}</Text>
                    <Text style={styles.infoTextHeadlines}>Runtime: </Text>
                    <Text style={{ paddingLeft: 25, fontWeight: 'bold', }}>{info.runtime} min</Text>
                    <Text style={styles.infoTextHeadlines}>Homepage: </Text>
                    <Text style={{ paddingLeft: 25, fontWeight: 'bold', }}>{info.homepage}</Text>
                    <Text style={styles.infoTextHeadlines}>Trailers:</Text>
                    <Text>{movieTrailers}</Text>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 670 / 250
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        paddingLeft: 10
    },
    text: {
        fontSize: 12,
        flexWrap: 'wrap',
        paddingLeft: 15
    },
    genres: {
        fontWeight: 'bold',
        paddingLeft: 25,
        fontSize: 15
    },
    infoTextHeadlines: {
        fontSize: 15,
        fontWeight: 500,
        color: 'black',
        paddingLeft: 10
    }

});
