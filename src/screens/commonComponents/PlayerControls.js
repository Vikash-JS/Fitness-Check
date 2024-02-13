import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import { Svg,Path } from 'react-native-svg';


const DeleteIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}>
      <Path
        fill="#fff"
        d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z"
      />
      <Path
        fill="#fff"
        d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z"
      />
      <Path
        fill="#211F1E"
        d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c.1-20.2-16.9-36.8-37.7-36.8zm-293.5-41.5h145.3v41.5H439.8v-41.5zm-146.2 83.1h435.9v41.5H293.6v-41.5zm404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
      />
      <Path
        fill="#211F1E"
        d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zm-103.8 0c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c.1 11.4 9.4 20.7 20.8 20.7zm207.6.7c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
      />
    </Svg>
  );
};

const PlayerControls = props => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;

  return (
    <View style={styles.wrapper}>
      {/* <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <DeleteIcon />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <PauseIcon  />
        ) : (
          <PlayIcon  />
        )}
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <DeleteIcon />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

export default PlayerControls;



const PauseIcon = (props) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={50}
  height={50}
  viewBox="0 0 25 25"
  {...props}
>
  <Path
    d="M34.92 18c0 9.343-7.577 16.92-16.92 16.92-9.343 0-16.92-7.577-16.92-16.92C1.08 8.657 8.657 1.08 18 1.08c9.343 0 16.92 7.577 16.92 16.92Zm0 0"
    style={{
      fill: "none",
      strokeWidth: 2,
      strokeLinecap: "butt",
      strokeLinejoin: "miter",
      stroke: "#fff",
      strokeOpacity: 1,
      strokeMiterlimit: 4,
    }}
    transform="scale(.69444)"
  />
  <Path
    d="M13.36 10.783h1.569v14.434h-1.57Zm7.711 0h1.57v14.434h-1.57Zm0 0"
    style={{
      fillRule: "evenodd",
      fill: "#fff",
      fillOpacity: 1,
      strokeWidth: 1,
      strokeLinecap: "butt",
      strokeLinejoin: "miter",
      stroke: "#fff",
      strokeOpacity: 1,
      strokeMiterlimit: 4,
    }}
    transform="scale(.69444)"
  />
</Svg>
)


const PlayIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 25 25"
    {...props}
  >
    <Path
      d="M12.5 0C5.625 0 0 5.625 0 12.5S5.625 25 12.5 25 25 19.375 25 12.5 19.375 0 12.5 0Zm4.375 13.125-6.25 4.688c-.156.078-.313.156-.469.156-.156 0-.234 0-.312-.078-.313-.157-.469-.391-.469-.703V7.813c0-.313.156-.547.469-.704.234-.156.547-.078.781.079l6.25 4.687c.234.156.313.39.313.625 0 .234-.079.469-.313.625Zm0 0"
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fff",
        fillOpacity: 1,
      }}
    />
  </Svg>
)