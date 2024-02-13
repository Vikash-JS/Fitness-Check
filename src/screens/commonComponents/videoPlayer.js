import React, {useState, useEffect, useRef} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import ProgressBar from '../commonComponents/ProgressBarVideoPlayer';
import PlayerControls from './PlayerControls';
import Orientation from 'react-native-orientation-locker';
import {Svg, Path} from 'react-native-svg';
import imagesFile from '../../../assets/imagesFile';

const windowHeight = Dimensions.get('window').width * (9 / 16);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

export default function CustomMFMVideoPlayer(props) {
  const videoRef = useRef(null);
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, [props]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControl, setShowControl] = useState(true);

  const handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      setFullscreen(true);
      StatusBar.setHidden(true);
    } else {
      setFullscreen(false);
      StatusBar.setHidden(false);
    }
  };

  const handlePlayPause = async () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
  };

  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 15);
    setCurrentTime(currentTime - 15);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 15);
    setCurrentTime(currentTime + 15);
  };

  const handleControls = () => {
    if (showControl) {
      setShowControl(false);
    } else {
      setShowControl(true);
    }
  };

  const onLoadEnd = data => {
    setDuration(data.duration);
    videoRef.current.seek(0);
    setCurrentTime(data.currentTime);
    setShowControl(false);
    setPlay(true);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onEnd = () => {
    setPlay(true);
    videoRef.current.seek(0);
  };

  const onErrorPlayVideo = err => {
    console.log('err', err);
  };

  return (
    <View style={fullscreen ? styles.fullscreenContainer : styles.container}>
      {/* <TouchableOpacity onPress={handleControls}> */}
      <>
        {props?.visibileVideo?.length > 0 &&
        props?.visibileVideo[0]?.index == props?.index &&
        props?.childIndex == props?.pageIndex ? (
          <Video
            ref={videoRef}
            source={{
              uri: props?.url,
              initOptions: ['--codec=avcodec'],
            }}
            repeat={true}
            style={styles.video}
            controls={false}
            resizeMode={'cover'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!play}
            onLayout={props.handleVideoLayout}
            muted={false}
            onError={onErrorPlayVideo}
          />
        ) : (
          <Image
            source={imagesFile.ic_logo}
            style={[styles.full]}
            resizeMode="contain"
          />
        )}

        {/* {showControl &&props?.visibileVideo?.length>0&& props?.visibileVideo[0]?.index == props?.index&&props?.childIndex == props?.pageIndex&&(
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.fullscreenButton}></TouchableOpacity>
              <PlayerControls
                onPlay={handlePlay}
                onPause={handlePlayPause}
                playing={play}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={currentTime}
                duration={duration > 0 ? duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
            </View>
          )} */}
      </>
      {/* </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  video: {
    height: windowHeight,
    backgroundColor: 'black',
    overflow: 'hidden',
    width: windowWidth,
  },
  fullscreenVideo: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  full: {
    // position: 'absolute',
    height: windowHeight,
    width: windowWidth * 0.5,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  poster: {
    resizeMode: 'cover',
  },
});

// import React, {useState, useRef} from 'react';
// import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import Video from 'react-native-video';
// import
//   MediaControls, {PLAYER_STATES}
// from 'react-native-media-controls';

// const windowWidth = Dimensions.get('window').width;

//  export default function CustomMFMVideoPlayer(props) {
//   const videoPlayer = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paused, setPaused] = useState(false);
//   const [
//     playerState, setPlayerState
//   ] = useState(PLAYER_STATES.PLAYING);
//   const [screenType, setScreenType] = useState('content');

//   const onSeek = (seek) => {

//     videoPlayer.current.seek(seek);
//   };

//   const onPaused = (playerState) => {

//     setPaused(!paused);
//     setPlayerState(playerState);
//   };

//   const onReplay = () => {
//     //Handler for Replay
//     setPlayerState(PLAYER_STATES.PLAYING);
//     videoPlayer.current.seek(0);
//   };

//   const onProgress = (data) => {

//     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
//       setCurrentTime(data.currentTime);
//     }
//   };

//   const onLoad = (data) => {
//     console.log("*********>>>>>>>",paused)
//     setDuration(data.duration);
//     setIsLoading(false);
//   };

//   const onLoadStart = (data) => setIsLoading(true);

//   const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

//   const onError = () => alert('Oh! ', error);

//   const exitFullScreen = () => {
//     alert('Exit full screen');
//   };

//   const enterFullScreen = () => {};

//   const onFullScreen = () => {
//     setIsFullScreen(isFullScreen);
//     if (screenType == 'content') setScreenType('cover');
//     else setScreenType('content');
//   };

//   const renderToolbar = () => (
//     <View>
//       <Text style={styles.toolbar}> toolbar </Text>
//     </View>
//   );

//   const onSeeking = (currentTime) => setCurrentTime(currentTime);

//   return (
//     <View style={{flex: 1,  height: 390, width: windowWidth}}>
//       <Video
//         onEnd={onEnd}
//         onLoad={onLoad}
//         onLoadStart={onLoadStart}
//         onProgress={onProgress}
//         paused={paused}
//         ref={videoPlayer}
//         resizeMode={screenType}
//         onFullScreen={isFullScreen}
//         source={{
//

//        }}
//         style={styles.mediaPlayer}
//         volume={10}
//       />
//       <MediaControls
//         duration={duration}
//         isLoading={isLoading}
//         mainColor="#333"
//         onFullScreen={onFullScreen}
//         onPaused={onPaused}
//         onReplay={onReplay}
//         onSeek={onSeek}
//         onSeeking={onSeeking}
//         playerState={playerState}
//         progress={currentTime}
//         toolbar={renderToolbar()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
// });
