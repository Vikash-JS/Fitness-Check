import React from 'react';
import {View, Text, Modal,StyleSheet, TouchableOpacity,Image} from 'react-native';
import imagesFile from '../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../utils/Constants';

const BottomSheetModal = (props)=>{
    return(
        <Modal
                animationType='slide'
                visible={props.visible}
                presentationStyle={'overFullScreen'}
                transparent={true}
            >
                <View style={styles.main_containerStyle}>
                    <TouchableOpacity style={{flex:1}}
                    onPress={props.cancel}
                    ></TouchableOpacity>
                    <View style={styles.subContainer}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                        onPress={props.uploadVideo}
                        >
                            <Image style={{width:50,height:50,marginBottom:10}} source={imagesFile.ic_vid} />
                            <Text style={styles.semiBold_12_white}>video</Text>
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                        onPress={props.uploadGallery}
                        >
                            <Image style={{width:50,height:50,marginBottom:10}} source={imagesFile.ic_gall} />
                            <Text style={styles.semiBold_12_white}>gallery</Text>
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                        onPress={props.uploadFile}
                        >
                            <Image style={{width:50,height:50,marginBottom:10}} source={imagesFile.ic_doc} />
                            <Text style={styles.semiBold_12_white}>document</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    )
}

export default BottomSheetModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
    subContainer: {
        flexDirection:'row',
        // backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backgroundColor:Colors.black,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
        // marginHorizontal: 11,
        paddingHorizontal: 60,
        // paddingVertical: 10,
        flex:1/4,
        justifyContent:'center',
        alignItems:'center'
    },
    semibold_12_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
        opacity:0.6
    },
    semibold_14_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.black
    },
    semibold_17_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:17,
        color:Colors.white
    },
    saveBtnStyle:{
        marginTop:20,
        borderRadius:12,
        height:54,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.blue
    },
    bold_22_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:22,
        color:Colors.black
    },
    semiBold_12_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.white
    }
})