import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import {MyFilesConstants} from '../FilesConstants';
import { useNavigation } from '@react-navigation/native';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
import imagesFile from "../../../../../../../../assets/imagesFile";
import {styles} from './styles';
const FilesDetail = ()=>{
    const navigation = useNavigation()
    return(
        <SafeAreaView style={{flex:1,backgroundColor:Colors.white}}>
            <View style={{flex:1}}>
                <AppHeader Heading={MyFilesConstants.FILES} onPress={()=>navigation.goBack()} />
                <View style={{overflow:'hidden',borderRadius:8,marginTop:20,height:248,marginHorizontal:20}}>
                    <Image style={{width:"100%"}} source={imagesFile.ic_demo5}/>
                </View>
                <View style={{marginTop:20,marginLeft:18}}>
                    <View>
                        <Text style={styles.medium_10_black}>{MyFilesConstants.SIZE}</Text>
                    </View>
                    <View style={{marginTop:8}}>
                        <Text style={styles.semiBold_14_black}>1.2 MB</Text>
                    </View>
                </View>
                <View style={{marginTop:20,marginLeft:18}}>
                    <View>
                        <Text style={styles.medium_10_black}>{MyFilesConstants.UPLOADED_BY}</Text>
                    </View>
                    <View style={{marginTop:8}}>
                        <Text style={styles.semiBold_14_black}>Krishna Agrawal</Text>
                    </View>
                </View>
                <View style={{marginTop:20,marginLeft:18}}>
                    <View>
                        <Text style={styles.medium_10_black}>{MyFilesConstants.UPLOADED_AT}</Text>
                    </View>
                    <View style={{marginTop:8}}>
                        <Text style={styles.semiBold_14_black}>Aug 25, 2022 / 05:34 PM</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default FilesDetail;
