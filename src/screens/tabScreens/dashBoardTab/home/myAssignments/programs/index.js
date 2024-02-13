import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import ProgramCard from './ProgramCard';
import FlatListHeader from './FlatListHeader';
import FilterModal from '../../../../../modals/FilterModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import { Get_All_Programs, Get_My_Programs, Search_All_Programs, Search_My_Program } from '../../../../../../apiManager/program/index';
import Loader from '../../../../../commonComponents/Loader';
import { Get_All_Trainer } from '../../../../../../apiManager/trainer/index';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import EmptyComponent from '../../../../../commonComponents/EmptyComponent';

const Programs = () => {
    const navigation = useNavigation()
    const bottomTabHeight = useBottomTabBarHeight()
    const [index, setIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [allPrograms, setAllPrograms] = useState([])
    const [myPrograms, setMyPrograms] = useState([])
    const [loader, setLoader] = useState(false)
    const [trainerList, setTrainerList] = useState([])
    const [filterTrainerId, setFilterTrainerId] = useState('')
    const [search, setSearch] = useState('')

    const pullToRefresh = () => {
        if (index == 0) {
            My_Programs()
        } else {
            All_Programs()
        }
    }

    const onSelectTab = (id) => {
        if (id == 0 && myPrograms.length == 0) {
            My_Programs()
        } else if (id == 1 && allPrograms.length == 0) {
            All_Programs()
        }
        setIndex(id)
    }

    useEffect(() => {
        My_Programs()
        allTrainerApi()
    }, [])

    const All_Programs = () => {
        setLoader(true)
        Get_All_Programs().then((response) => {
            if (response.status == 200) {
                console.log("AllPro======", response.data.program)
                setAllPrograms(response.data.program)
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("AllProgramErr======", error)
        })
    }

    const My_Programs = () => {
        setLoader(true)
        Get_My_Programs().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                setMyPrograms(response.data.program)
                console.log("MyPro======", response)
            }

        }).catch((error) => {
            setLoader(false)
            console.log("MyProErr========", error)
        })
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

    const AllProgramSearch = (text, trainerName) => {
        console.log('trainerName: ', trainerName);
        var raw
        setSearch(text)
        if (index == 0) {
            raw = JSON.stringify({ "search": text, "name": trainerName });
            setMyPrograms([])
            Search_My_Program(raw).then((response) => {
                if (response.status == 200) {
                    setMyPrograms(response.data.program)
                    console.log("searchMyResp=========", response)
                }
            }).catch((error) => {
                console.log("myProSearchErr========", error)
            })
        } else {
            raw = JSON.stringify({ "search": text, "trainerId": [""] });
            setAllPrograms([])
            Search_All_Programs(raw).then((response) => {
                if (response.status == 200) {
                    console.log("searchAll========", response)
                    setAllPrograms(response.data.program)
                }

            }).catch((error) => {
                console.log("allsearchErr=======", error)
            })
        }
    }

    const clearFilterFunc = () => {
        setFilterTrainerId('')
        if (index == 0) {
            My_Programs()
        } else {
            All_Programs()
        }
    }
    const addFilter = (trainerName) => {
        setFilterTrainerId(trainerName)
        AllProgramSearch(search, trainerName)
        setModalVisible(false)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProgramDetails", { id: item._id, heading: item.programName, type: index == 0 ? 'my' : 'all' })}
        >
            <ProgramCard item={item} />
        </TouchableOpacity>
    )
    const onFilterTab = () => {
        setModalVisible(true)
    }
    const Footer = () => {
        return (
            <View style={{ height: bottomTabHeight }}></View>
        )
    }

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={index == 0 ? myPrograms : allPrograms}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader clearFilter={() => clearFilterFunc()} filterId={filterTrainerId} value={search} onChangeText={(text) => AllProgramSearch(text, filterTrainerId)} onFilterPress={() => onFilterTab()} onPressTab={(id) => onSelectTab(id)} index={index} />}
                        ListFooterComponent={<Footer />}
                        ListEmptyComponent={<EmptyComponent Heading={index == 0 ? "Empty Program!" : "Empty Library!"} />}
                        refreshing={false}
                        onRefresh={pullToRefresh}
                    />
                </View>
                {modalVisible ? <FilterModal
                    filterId={filterTrainerId}
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

export default Programs;