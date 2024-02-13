import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CommunityHomeConstants } from '../CommunityConstants';
import imagesFile from '../../../../../assets/imagesFile';
import {Colors,Fonts} from '../../../../utils/Constants';
import DropShadow from "react-native-drop-shadow";
const About = (props) => {
    return (
        <View>
            <DropShadow style={styles.shadowStyle}>
            <View style={styles.aboutView}>
                <View>
                    <Text style={styles.bold_16_black}>{CommunityHomeConstants.ABOUT}</Text>
                </View>
                <View style={{marginTop:12}}>
                    <Text style={styles.semibold_12_black}>{props.about}</Text>
                </View>
            </View>
            </DropShadow>
            {/* <DropShadow style={styles.shadowStyle}>
            <View style={styles.adminView}>
                <View>
                    <Text style={styles.bold_16_black}>{CommunityHomeConstants.ADMIN}</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:10,justifyContent:'center',alignItems:'center' }}>
                    <View style={{width:56,height:56,borderRadius:28}}>
                        <Image style={{width:56,height:56,borderRadius:28}} source={imagesFile.ic_coDemo2} />
                    </View>
                    <View style={{marginLeft:9}}>
                        <View>
                            <Text style={styles.bold_14_black}>Ibrahim Adil</Text>
                        </View>
                        <View style={{marginTop:6}}>
                            <Text style={styles.medium_12_opacity}>Co-founder, director at fitness company</Text>
                        </View>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
            </View>
            </DropShadow>
            <DropShadow style={styles.shadowStyle}>
            <View style={styles.adminView}>
                <View>
                    <Text style={styles.bold_16_black}>{CommunityHomeConstants.GROUP_HISTORY}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <View>
                        <Image source={imagesFile.ic_i} />
                    </View>
                    <View style={{marginLeft:9}}>
                        <Text style={styles.medium_12_opacity}>Community History shows when this community was created, as well as changes to its name. You can use Community History to see whether a community’s purpose has changed over time.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <View style={{marginTop:2}}>
                        <Image source={imagesFile.ic_flag} />
                    </View>
                    <View style={{marginLeft:9}}>
                        <View>
                            <Text style={styles.bold_14_opacity}>Community Create On</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_13_opacity}>March 21, 2015</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <View style={{marginTop:2}}>
                        <Image source={imagesFile.ic_flag} />
                    </View>
                    <View style={{marginLeft:9}}>
                        <View>
                            <Text style={styles.bold_14_opacity}>You Joined On</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_13_opacity}>March 21, 2015</Text>
                        </View>
                    </View>
                </View>
            </View>
            </DropShadow> */}
            {/* <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                <Text style={styles.meduim_14_opacity}>No recent changes to community name</Text>
            </View> */}
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
        flex:1
    },
    bold_16_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:16,
        color:Colors.black
    },
    bold_14_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    bold_14_opacity:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black,
        opacity:0.6
    },
    medium_12_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:12,
        color:Colors.black,
        opacity:0.6
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    aboutView:{
        
        borderRadius: 10,
        marginHorizontal: 18,
        padding: 16,
        backgroundColor:Colors.white
    },
    adminView:{
        marginTop: 12,
        borderRadius: 10,
        marginHorizontal: 18,
        padding: 16,
        backgroundColor:Colors.white
    },
    medium_13_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:13,
        color:Colors.black,
        opacity:0.6
    },
    meduim_14_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:14,
        color:Colors.black,
        opacity:0.6
    }
})