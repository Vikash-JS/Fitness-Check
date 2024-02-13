import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { myWorkoutConstants } from '../WorkoutConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import FlatListHeader from './FlatListHeader';
import MyTrainerCard from '../../../../../../commonComponents/MyTrainerCard';
import { styles } from './MyWorkOutStyle';
import FilterModal from '../../../../../../modals/FilterModal';
import { Get_All_Workouts, Get_My_Workout_List, Search_All_Workouts, Search_My_Workout } from '../../../../../../../apiManager/workout/index';
import Loader from '../../../../../../commonComponents/Loader';
import { Get_All_Trainer } from '../../../../../../../apiManager/trainer/index';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';

const MyWorkout = () => {

    const navigation = useNavigation()
    const bottomTabHeight = useBottomTabBarHeight()
    const [index, setIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [loader, setLoader] = useState(false)
    const [myWorkouts, setMyWorkouts] = useState([])
    const [workoutLibraryList, setWorkoutLibraryList] = useState([])
    const [search, setSearch] = useState('')
    const [trainerList, setTrainerList] = useState([])
    const [filterTrainerId, setFilterTrainerId] = useState('')
    useEffect(() => {
        setLoader(true)
        myWorkoutList()
        // allTrainerApi()
    }, [])

    const onSelectTab = (id) => {
        if (id == 0 && myWorkouts.length == 0) {
            myWorkoutList()
            setIndex(id)
        } else if (id == 1 && workoutLibraryList.length == 0) {
            all_WorkoutList()
            setIndex(id)
        } else if (id == 2) {
            navigation.navigate('Workout_Progress');
        } else {
            setIndex(id)
        }

    }
    const pullToRefresh = () => {
        if (index == 0) {
            myWorkoutList()
        } else {
            all_WorkoutList()
        }
    }
    const onFilterTab = () => {
        setModalVisible(true)
    }

    const myWorkoutList = () => {
        // setLoader(isRefresh)
        Get_My_Workout_List().then((response) => {
            if (response.status == 200) {
                console.log("MyWorkoutList=====", response)
                setMyWorkouts(response.data.workout)
                setLoader(false)
            }
        }).catch((error) => {
            console.log("userWorkOutErr------", error)
            setLoader(false)
        })
    }

    const all_WorkoutList = () => {
        setLoader(true)
        Get_All_Workouts().then((response) => {
            if (response.status == 200) {
                console.log("workoutLibRes----", response.data.workouts)
                setWorkoutLibraryList(response.data.workouts)
            }
            setLoader(false)

        }).catch((error) => {
            console.log("workoutLibErr------", error)
            setLoader(false)
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
    const SearchAllWorkouts = (text, trainerName) => {
        var raw
        setSearch(text)
        if (index == 0) {
            setMyWorkouts([])
            var raw = JSON.stringify({ "search": text, "name": trainerName });

            Search_My_Workout(raw).then((response) => {
                console.log("mySeResp=======", response)
                if (response.status == 200) {
                    console.log("mySeResp=======", response)
                    setMyWorkouts(response.data.workout)
                }
            }).catch((error) => {
                console.log("MySeErr========", error)
            })
        } else {
            setWorkoutLibraryList([])
            raw = JSON.stringify({ "search": text, "trainerId": '' });
            Search_All_Workouts(raw).then((response) => {
                if (response.status == 200) {
                    console.log("Allresp======", response)
                    setWorkoutLibraryList(response.data.workout)
                }
            }).catch((error) => {
                console.log("allErr=========", error)
            })
        }
    }

    const addFilter = (trainerName) => {
        setFilterTrainerId(trainerName)
        SearchAllWorkouts(search, trainerName)
        setModalVisible(false)
    }

    const clearFilterFunc = () => {
        setFilterTrainerId('')
        if (index == 0) {
            myWorkoutList()
        } else {
            all_WorkoutList()
        }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            onPress={() => navigation.navigate("WorkoutLibrary1", { name: item.workoutName, id: item._id,workoutID:item.workoutId, type: index == 0 ? 'my' : 'all' })}
            >
                <MyTrainerCard item={item} />
            </TouchableOpacity>
        )

    }
    const Footer = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <TouchableOpacity style={styles.startWorkoutBtn}
                    onPress={() => navigation.navigate('SessionStart')}
                   >
                    <Text style={styles.semiBold_12_white}>{myWorkoutConstants.START_WORKOUT}</Text>
                </TouchableOpacity> */}
                <View style={{ height: bottomTabHeight }}></View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList

                    data={index == 0 ? myWorkouts : workoutLibraryList}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={<FlatListHeader clearFilter={() => clearFilterFunc()} filterId={filterTrainerId} value={search} onChangeText={(text) => SearchAllWorkouts(text, filterTrainerId)} onFilterPress={() => onFilterTab()} onPressTab={(id) => onSelectTab(id)} index={index} />}
                    ListFooterComponent={<Footer />}
                    ListEmptyComponent={<EmptyComponent Heading={index == 0 ? "Empty Workouts!" : "EmptyLibrary"} />}
                    ListFooterComponentStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshing={false}
                    onRefresh={pullToRefresh}
                />

            </View>
            {modalVisible ? <FilterModal
                filterName={filterTrainerId}
                addFilter={(trainerName) => addFilter(trainerName)}
                cancelModal={() => setModalVisible(false)}
                visible={modalVisible} />
                : null}
            {console.log("*********", loader)}
            {loader ? <Loader /> : null}

        </SafeAreaView>
    )
}
export default MyWorkout;