import React from 'react';
import { View, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import YouTube from 'react-native-youtube';
import WebView from 'react-native-webview';

export default function PlayTrailer(props) {
    const { route } = props;
    const { trailerKey } = route.params;
    const { height: SCREEN_HEIGHT, width: SCREEN_WIDHT } = Dimensions.get('window')

    return (
        <View style={{ transform: [{ rotate: '90deg' }] }}>
            <View style={{ backgroundColor: 'darkgray' }}>

                <YoutubePlayer
                    videoId={trailerKey}
                    play={true}
                    height={SCREEN_WIDHT}
                    width={SCREEN_HEIGHT - 80}
                />
            </View>
        </View >
    );
};


