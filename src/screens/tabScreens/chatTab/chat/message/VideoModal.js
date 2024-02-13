import React from 'react';
import { Modal, View, Text,Dimensions,TouchableOpacity,Image } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import imagesFile from '../../../../../../assets/imagesFile';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VideoModal = (props) => {
    return (
        <Modal 
         
        visible={props.visible} 
        transparent={true}
        presentationStyle={'overFullScreen'}
        >
            <View style={{justifyContent:'center',height:'100%',width:'100%',backgroundColor:'rgba(0, 0, 0, 0.9)'}}>
                <TouchableOpacity
                onPress={props.cancel}
                style={{alignSelf:'flex-end',right:20}}
                >
                    <Image source={imagesFile.ic_cross}/>
                </TouchableOpacity>
            <View style={{width: windowWidth, height:windowHeight-200,justifyContent:'center',alignItems:'center'}}>
            <VideoPlayer
                autoplay={true}
                style={{width: windowWidth, height:windowHeight-200,alignSelf:'center' }}
                resizeMode='cover'
                video={{ uri: props?.uri }}
                
             
             videoHeight={windowHeight-200}
            // thumbnail={{ uri: 'https://picsum.photos/200/300' }}
            />
            </View>
            </View>    
        </Modal>
    )
}

export default VideoModal;