import React,{useState,useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { MacrosConstants } from '../nutritionConstants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
import {styles} from './styles';
import { useNavigation } from '@react-navigation/native';
import {Get_Home_Adds} from '../../../../../../../apiManager/ads/index';
const FlatListHeader = () => {
   const navigation = useNavigation()
   const [adsUri,setAdsUri] = useState('')

   useEffect(()=>{
    GetAds()
   }, [])

   const GetAds = ()=>{
    var raw = JSON.stringify({ "place": "Nutrtions", "panel": "Customer" });
    Get_Home_Adds(raw).then((response)=>{
        if (response.status == 200) {
            setAdsUri(response.data.adsData[0].image.url)
            console.log("ProAdsresp========", response)
        }
    }).catch((error)=>{
        console.log("programAddErr========",error)
    })
}
    return (
        <View>
            <AppHeader Heading={MacrosConstants.MACROS} onPress={() => navigation.goBack()} />
            <View>
                <Image style={{ width: '100%',height:110 }} source={{uri:adsUri}} />
            </View>
            <View style={{marginLeft:18, marginTop:20}}>
                <Text style={styles.semiBold_17_black}>{MacrosConstants.TOTALS}</Text>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:18,marginTop:12}}>
                <View style={{flex:1}}></View>
                <View>
                    <Text style={styles.medium_10_opacity}>{MacrosConstants.TARGET}</Text>
                </View>
                <View style={{flex:0.3}}></View>
                <View>
                    <Text style={styles.medium_10_opacity}>{MacrosConstants.TOTAL}</Text>
                </View>
                <View style={{flex:0.3}}></View>
                <View>
                    <Text style={styles.medium_10_opacity}>{MacrosConstants.LEFT}</Text>
                </View>
            </View>
        </View>
    )
}

export default FlatListHeader;