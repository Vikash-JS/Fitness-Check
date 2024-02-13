import React,{useEffect, useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import CommunityHeader from '../../../commonComponents/CommunityHeader';
import { CommunityHomeConstants } from '../CommunityConstants';
import DualTab from './DualTab';
import imagesFile from '../../../../../assets/imagesFile';
import {Get_Community_List,Popular_Communities} from '../../../../apiManager/community/index';
import { Colors, Fonts } from '../../../../utils/Constants';
import Loader from '../../../commonComponents/Loader';
import { useNavigation, useRoute } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [popularCommunities, setPopularCommunities] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(()=>{
        popular_community()
    }, [])

    const popular_community = ()=>{
        setLoader(true)
        Popular_Communities().then((response)=>{
          if(response.status == 200){
            setPopularCommunities(response.data.community)
            setLoader(false)
          }
    
        }).catch((error)=>{
          setLoader(false)
          console.log("popErr=============",error)
        })
      }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}
        onPress={()=>navigation.navigate('CommunityDetailScreen', { id: item?._id })}
        >
            <View style={{ width: 70, height: 70, borderRadius: 35, overflow: 'hidden',backgroundColor:Colors.off_white,justifyContent: 'center', alignItems: 'center',  }}>
                {loader?<Loader/>:
                <Image style={{ width:item?.coverImage? 70:50, height:item?.coverImage? 70:50, borderRadius: 35}} source={item?.coverImage?{ uri : item?.coverImage}:imagesFile.ic_NoImage} />}
            </View>
            <View style={{ marginTop: 7 }}>
                <Text style={styles.bold_11_black}>{item?.title}</Text>
            </View>
            <View style={{ marginTop: 3 }}>
                <Text style={styles.bold_10_opacity}>{item?.count} People</Text>
            </View>
        </TouchableOpacity>
    )
    const EmptyComponent = () => {
        return (
            <View style={{ width:windowWidth,alignSelf: 'center',justifyContent:'center',alignItems:'center'}}>
                <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 20, color: Colors.inputGrey, paddingVertical: 10 }}>No popular community found..</Text>
            </View>
        )
    }

    return (
        <View >
            <CommunityHeader Heading={CommunityHomeConstants.COMMUNITY} onPress={props.onPress} />
            <View style={{ marginTop: 10, marginLeft: 20 }}>
                <DualTab index={props.index} onPressBookmark={props.onPressBookmark} onPressCommunity={props.onPressCommunity} onPressAll={props.onPressAll} onPress={props.onPressTab} />
            </View>
            {props.index == 1 ?
                <View style={{ marginLeft: 22,marginTop:10,marginBottom:7 }}>
                    <Text style={styles.semiBold_14_black}>{CommunityHomeConstants.YOUR_COMMUNITIES}</Text>
                </View>
                : null}
            {props.index == 0 ?
                <View style={{ marginTop: 10, backgroundColor: "#F8F8F8", paddingVertical: 18 }}>
                    <View style={{ marginLeft: 22 }}>
                        <Text style={styles.semiBold_14_black}>{CommunityHomeConstants.POPULAR_COMMUNITIES}</Text>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 14 }}
                        horizontal={true}
                        data={popularCommunities}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={<EmptyComponent/>}
                    />
                </View> : null}
        </View>
    )
}

export default FlatListHeader;

const styles = StyleSheet.create({
    semiBold_14_black: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        color: Colors.black
    },
    bold_11_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 11,
        color: Colors.black
    },
    bold_10_opacity: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4
    }
})