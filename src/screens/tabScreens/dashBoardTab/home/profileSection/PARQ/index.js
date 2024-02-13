import React,{useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, Image ,TouchableOpacity, Alert} from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import ProfileHeader from '../profile/ProfileHeader';
import {PARQConstants} from '../ProfileConstants';
import PARQCard from './PARQCard';
import {PARQ_Question_Api, UPDATE_PARQ} from '../../../../../../apiManager/profile/index';
import Loader from '../../../../../commonComponents/Loader';
import { useNavigation } from '@react-navigation/native';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {Toaster} from '../../../../../commonComponents/Toaster';
import EmptyComponent from '../../../../../commonComponents/EmptyComponent';

const ParqScreen = () => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [parqList, setParqList] = useState([])

    useEffect(()=>{
        getParq()
    }, [])

    const getParq = ()=>{
        setLoader(true)
        PARQ_Question_Api().then((response)=>{
            console.log("parqResp======",response)
            if(response.status == 200){
                setParqList(response.data.parqDetails.questions)
                setLoader(false)
            }
        }).catch((error)=>{
            console.log("parqErrr=======",error)
            setLoader(false)
        })
    }

    const FlatListHeader = ()=>{
        return(
            <View style={{marginBottom:11}}>
            <ProfileHeader goBack={()=>navigation.goBack()} image={imagesFile.ic_back} Heading={PARQConstants.PARQ_DETAIL} />
            </View>
        )
    }
    const selectAnswer = (ans,index)=>{
        console.log("PARK==========",ans,index)
        let arr1 = parqList
        arr1[index].ans = ans
        setParqList([...arr1])
        console.log("UpdatedData=========",arr1)
    }

    const updateParq = ()=>{
        setLoader(true)
        UPDATE_PARQ(parqList).then((response)=>{
            if(response.status == 200){
                console.log("ParqResp=======",response)
                setLoader(false)
                    Toaster(response.message)
            }

        }).catch((error)=>{
            setLoader(false)
            console.log("updateParqErr=====",error)
        })
    }

    const renderItem = ({ item,index }) => (
        <PARQCard item={item}  onPress={(ans)=>selectAnswer(ans,index)}/>
    )

    const Footer  = ()=>{
        return(
            <>
            <View>
                {parqList.length>0?
                <SingleButton name={PARQConstants.DONE} onPress={()=>updateParq()} />:null}
            </View>
            <View style={{height:90}}></View>
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={parqList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<FlatListHeader/>}
                    ListFooterComponent={<Footer/>}
                    ListEmptyComponent={<EmptyComponent Heading={"No data found!"} />}
                />
            </View>
            {loader?<Loader/>:null}
        </SafeAreaView>
    )
}

export default ParqScreen;