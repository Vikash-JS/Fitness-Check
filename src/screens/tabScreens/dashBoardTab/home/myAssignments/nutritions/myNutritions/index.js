import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { myNutritionsConstants } from '../nutritionConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import FlatListHeader from './FlatListHeader';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import NutritionCard from '../../../../../../commonComponents/NutritionCard';
import FilterModal from '../../../../../../modals/FilterModal';
import { Get_All_Nutrition, Get_My_Nutrition_List, Search_All_Nutrition ,Search_My_Nutrition} from '../../../../../../../apiManager/nutrition/index';
import { Get_All_Trainer } from '../../../../../../../apiManager/trainer/index';
import Loader from '../../../../../../commonComponents/Loader';
import MyStatusBar from '../../../../../../commonComponents/MyStatusBar';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';

const BirdsName = [{ id: 1, planName: 'Bikini Body', image: imagesFile.ic_bikny }, { id: 2, planName: 'Female Fat Loss', image: imagesFile.ic_fatLoss }, { id: 3, planName: 'Female Muscle Gain', image: imagesFile.ic_bikny },
];
const MyNutritions = (props) => {

    const navigation = useNavigation()
    const bottomTabHeight = useBottomTabBarHeight()
    const [index, setIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [allNutritions, setAllNutritions] = useState([])
    const [myNutrition, setMyNutrition] = useState([])
    const [loader, setLoader] = useState(false)
    const [trainerList, setTrainerList] = useState([])
    const [filterTrainerId, setFilterTrainerId] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        Get_MyNutrition()
        allTrainerApi()
    }, [])

    const pullToRefresh = () => {
        if (index == 0) {
            Get_MyNutrition()
        } else {
            GetNutrition()
        }
    }
    const allTrainerApi = () => {
        setLoader(true)
        Get_All_Trainer()
            .then(response => {
                if (response.status == 200) {
                    setLoader(false)
                    console.log('trainerResp======', response);
                    setTrainerList(response.data.trainers);
                }
            })
            .catch(error => {
                setLoader(false)
                console.log('AllTrainerErr====', error);
            });
    };

    const onSelectTab = (id) => {
        if (id == 0 && myNutrition.length == 0) {
            Get_MyNutrition()
            setIndex(id)
        } else if (id == 1 && allNutritions.length == 0) {
            GetNutrition()
            setIndex(id)
        }else if(id == 2){
            navigation.navigate("NutritionProgress")
        }else{
            setIndex(id)
        }
        
    }

    const Get_MyNutrition = () => {
        setLoader(true)
        Get_My_Nutrition_List().then((response) => {
            console.log("myNutrition=====", response)
            if (response.status == 200) {
                setMyNutrition(response.data.nutrition)
                setLoader(false)
            }
        }).catch((error) => {
            console.log("MyNutriErr======", error)
            setLoader(false)
        })
    }

    const AllNutritionSearch = (text,trainerName) => {
        console.log('text:********** ', text);
        console.log('trainerName: ************', trainerName);
        setSearch(text)
        var raw 
        if (index == 0) {
            setMyNutrition([])
            raw = JSON.stringify({ "search": text, "name":trainerName});
            Search_My_Nutrition(raw).then((response)=>{
                if(response.status == 200){
                    console.log("myNutriSearch=========",response)
                    setMyNutrition(response.data.nutrition)
                }
            }).catch((error)=>{
                console.log("mySearchErr=========",error)
            })
        } else {
            setAllNutritions([])
            raw = JSON.stringify({ "search": text, "trainerId": [""] });
            Search_All_Nutrition(raw).then((response) => {
                console.log("myNutriSearch=========",response)
                if(response.status == 200){
                    setAllNutritions(response.data.nutrition)
                }
                
            }).catch((error) => {
                console.log("allNutSheErr=====", error)
            })
        }

    }

    const GetNutrition = () => {
        setLoader(true)
        Get_All_Nutrition().then((response) => {
            if (response.status == 200) {
                setAllNutritions(response.data.nutrition)
                setLoader(false)
            }
        }).catch((error) => {
            console.log("AllNutriErr======", error)
            setLoader(false)
        })
    }
    const clearFilterFunc = ()=>{
        setFilterTrainerId('')
        if(index == 0){
            Get_MyNutrition()
        }else{
            GetNutrition()
        }
    }

    const addFilter = (trainerName) => {
        console.log('trainerName: **********', trainerName);
        setFilterTrainerId(trainerName)
        AllNutritionSearch(search,trainerName)
        setModalVisible(false)
    }

    const renderItem = ({ item }) => {
        console.log('item: ', item);
        return(
            <TouchableOpacity
            onPress={() => navigation.navigate("NutritionDetail", { name: item.planName,nutritionID:item.nutritionId, id: item._id, type: index == 0 ? "my" : "all" })}
        >
            <NutritionCard item={item} />
        </TouchableOpacity>
        )
    }
       
    const Footer = () => {
        return (
            <View style={{ height:bottomTabHeight }}></View>
        )
    }

    const onFilterTab = () => {
        setModalVisible(true)
    }
    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={index == 0 ? myNutrition : allNutritions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader clearFilter={()=>clearFilterFunc()} filterId={filterTrainerId}  value={search} onChangeText={(text)=>AllNutritionSearch(text,filterTrainerId)} onFilterPress={() => onFilterTab()} onPressTab={(id) => onSelectTab(id)} index={index} />}
                        ListFooterComponent={<Footer />}
                        ListEmptyComponent={<EmptyComponent Heading={index == 0 ?"Empty Nutritions!":"Empty Library!"} />}
                        refreshing={false}
                        onRefresh={pullToRefresh}
                    />
                </View>
                {modalVisible ? <FilterModal 
                filterName={filterTrainerId}
                addFilter={(trainerName) => addFilter(trainerName)}
                cancelModal={() => setModalVisible(false)}
                visible={modalVisible}
                />
                 : null}
                {loader ? <Loader /> : null}
            </SafeAreaView>
        </>
    )
}

export default MyNutritions;