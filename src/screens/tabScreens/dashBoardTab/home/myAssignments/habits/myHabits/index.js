import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import FlatListHeader from './FlatListHeader';
import imagesFile from '../../../../../../../../assets/imagesFile';
import HabitsCard from '../../../../../../commonComponents/HabitsCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Get_MyHabits, Create_Habit, Delete_Habit, Get_Archive_Habits,
    Get_AssignBy_Trainer, Archive_Habit_Api,
    UnArchive_Habit_Api, Mark_As_Done, Mark_As_unDone
} from '../../../../../../../apiManager/habit/index';
import { HabitsScreenConstants } from '../habitsConstants';
import AddHabitModal from '../../../../../../modals/AddHabitModal';
import { styles } from './styles';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import Loader from '../../../../../../commonComponents/Loader';
import MyStatusBar from '../../../../../../commonComponents/MyStatusBar';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';

const HabitScreen = () => {
    const navigation = useNavigation()
    const [tabIndex, setTabIndex] = useState(0)
    const [isChecked, setIsChecked] = useState(false)
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [radioId, setRadioId] = useState(0)
    const [habitName, setHabitName] = useState('')
    const [description, setDescription] = useState('')
    const [habitDuration, setHabitDuration] = useState('')
    const [assignByTrainerHabits, setAssignByTrainer] = useState([])
    const [inactiveData, setInactiveData] = useState([])
    const [selfAssignHabits, setSelfAssignHabits] = useState([])
    const [loader, setLoader] = useState(false)
    const [extData, setExtData] = useState(new Date())
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [measurementDate, setMeasurementDate] = useState(new Date())
    const [timeSlotList, setTimeSlotList] = useState([])
    const [extraData, setExtraData] = useState(false)
    const selectIndex = (id) => {
        if (id == 0 && assignByTrainerHabits.length == 0) {
            assignByTrainer()
        } else if (id == 1 && selfAssignHabits.length == 0) {
            myHabits()
        } else if (id == 2 && inactiveData.length == 0) {
            inactive_Habits()
        }
        setTabIndex(id)
    }
    const pullToRefresh = () => {
        if (tabIndex == 0) {
            assignByTrainer()
        } else if (tabIndex == 1) {
            myHabits()
        } else {
            inactive_Habits()
        }
    }

    useEffect(() => {
        assignByTrainer()
    }, [])


    const checkValidation = () => {
        if (habitName == '') {
            Toaster(HabitsScreenConstants.NAME_VALIDATION)
        }
  else if(!timeSlotList.length)
  {
          Toaster(HabitsScreenConstants.TIME_SLOT)
  }
 else if (description == '') {
            Toaster(HabitsScreenConstants.DESCRIPTION_VALIDATION)
 } else {
            Create_Habit_Api()
 }
    }

    const Create_Habit_Api = () => {

        let freq = ""
        if (timeSlotList.length > 1) {
            freq = "multiple"
        } else {
            freq = "oneTime"
        }

        console.log("my new habits=========>", "habitName", habitName,
            "description", description,
            "frequency", habitDuration)
        let data = JSON.stringify({
            "habitName": habitName,
            "description": description,
            "frequency": freq,
            "timeSlot": timeSlotList
        });
        console.log("habitData=======", data)

        setLoader(true)
        Create_Habit(data).then((response) => {
            setLoader(false)
            console.log("CreatedHabit=======", response)
            setAddModalVisible(false)
            let arr1 = selfAssignHabits
            arr1.push(response.data.habit)
            setSelfAssignHabits([...arr1])
            setTimeout(() => {
                Toaster(response.message)
            }, 500);

            setHabitDuration('')
            setHabitName('')
            setTimeSlotList('')
            setDescription('')
            setRadioId(0)

        }).catch((error) => {
            setLoader(false)
            console.log("createHabitErr======", error)
            setAddModalVisible(false)
        })
    }

    const archive_Habits = (id, index) => {
        let selfAssignData = selfAssignHabits
        if (selfAssignData[index]._id == id) {
            selfAssignData.splice(index, 1)
            setSelfAssignHabits([...selfAssignData])
        }
        setLoader(true)
        Archive_Habit_Api(id).then((response) => {
            if (response.status == 200) {
                let arr1 = inactiveData
                arr1.push(response.data.habits)
                setInactiveData(arr1)
                Toaster(response.message)
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("ArchivedErr=====", error)
        })
    }

    const unArchiveHabit = (id, index) => {
        let inactiveHabit = inactiveData
        if (inactiveHabit[index]._id == id) {
            inactiveHabit.splice(index, 1)
            setInactiveData([...inactiveHabit])
        }
        setLoader(true)
        UnArchive_Habit_Api(id).then((response) => {
            if (response.status == 200) {
                console.log("reactivate habit===========>", response)
                let arr1 = selfAssignHabits
                arr1.push(response.data.habits)
                setSelfAssignHabits(arr1)
                Toaster(response.message)
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("unArchiveEror=========", error)
        })
    }

    const delete_habit_api = (id, index) => {
        console.log("deleteFunc=====", id, index)
        setLoader(true)
        Delete_Habit(id).then((response) => {
            if (response.status == 200) {
                console.log("HabitDeleteResp=====", response)
                Toaster(response.message)
                let arr1 = inactiveData
                if (arr1[index]._id == id) {
                    arr1.splice(index, 1);
                    setInactiveData(arr1)
                }
            }
            setLoader(false)
        }).catch((error) => {
            setLoader(false)
            console.log("DeleteHabitErr======", error)
        })
    }

    const removeAssignHabit = (id, index) => {
        setLoader(true)
        Delete_Habit(id).then((response) => {
            if (response.status == 200) {
                console.log("AssignHabitDeleteResp=====", response)
                Toaster(response.message)
                let arr1 = assignByTrainerHabits
                if (arr1[index]._id == id) {
                    arr1.splice(index, 1);
                    setAssignByTrainer(arr1)
                }
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("DeleteAssignHabitErr======", error)
        })
    }

    const selfAssing_MarkAsDone = (id, index) => {

        console.log("mark as done ApiID========>", id)
        console.log("self assign habit===========>", selfAssignHabits)
        Mark_As_Done(id).then((response) => {
            if (response.status == 200) {
                console.log("MarkAsDoneResp======", response)
                Toaster(response.message)
                let arr1 = selfAssignHabits
                arr1.forEach(element => {
                    if (element._id == id) {
                        console.log("ActivityApiment=========>", element)
                        element.activity.push(response.data.habitDetail.activity)
                    }
                });
                setSelfAssignHabits([...arr1])
                setExtData(new Date())
                console.log("updatedHabit=========", arr1)
            } else if (response.error) {
                Toaster(response.error)
            }
            console.log("markAsDoneRespself===========", response)
        }).catch((error) => {
            console.log("MarkAsDoneErrSelf========", error)
        })
    }
    const trainerAssignMarkAsDone = (id, index) => {
        Mark_As_Done(id).then((response) => {
            if (response.status == 200) {
                console.log("TrainerMarkAsDoneResp======", response)
                Toaster(response.message)
                let arr1 = assignByTrainerHabits
                arr1.forEach(element => {
                    if (element._id == id) {
                        element.activity.push(response.data.habitDetail.activity[0])
                    }
                });
                setAssignByTrainer(arr1)
                setTimeout(() => {
                    assignByTrainer()
                }, 500);
                console.log("updatedHabit=========", arr1)

            } else if (response.error) {
                Toaster(response.error)
            }
            console.log("markAsDoneRespTrainer===========", response)
        }).catch((error) => {
            console.log("MarkAsDoneErrTrainer========", error)
        })
    }

    const timeMarkDone = (timeSlotId, isTrue, habitId) => {
        console.log("isTrue=========", isTrue)
        if (isTrue) {
            timeMarkUnDone(timeSlotId)
        } else {
            newMarkAsDone(timeSlotId, habitId)
        }


    }
    const newTranierMarkDone_unDone = (timeSlotId, isTrue, habitId) => {
        console.log("typeofMark========******", timeSlotId, isTrue, habitId)

        let newArr = assignByTrainerHabits

        if (isTrue) {
            let index;
             let ActivityId;
            newArr.forEach(element => {
                element.activity.forEach(activity => {
                    if (activity.habitId == habitId) {
                         ActivityId = activity._id
                    }
                });
            });
            console.log('ActivityId==========', ActivityId)
            setLoader(true)
            Mark_As_unDone(ActivityId).then((response) => {
                console.log("UndoneResp======", response)
                if (response.status == 200) {
                    setLoader(false)
                    Toaster(response.message)
                    assignByTrainer()
                    console.log("UndoneResp======", response)
                }
            }).catch((error) => {
                setLoader(false)
                console.log("undoneErr======", error)
            })
        } else {
            setLoader(true)
            console.log("***********TimeSlot&HabitId",timeSlotId,habitId)
            Mark_As_Done(timeSlotId, habitId).then((response) => {
                setLoader(false)
                if (response.status == 200) {
                    setLoader(false)
                    Toaster(response.message)
                    assignByTrainer()
                    console.log("markAsDoneResp=======", response)

                }
            }).catch((error) => {
                setLoader(false)
                console.log("markAsDoneErr=====", error)
            })
        }

    }

    const selftAssignMark_As_Done_unDone = (timeSlotId, isTrue, habitId)=>{
        console.log("typeofMark========", timeSlotId, isTrue, habitId)

        let newArr = selfAssignHabits

        if (isTrue) {
            let index;
             let ActivityId;
            newArr.forEach(element => {
                element.activity.forEach(activity => {
                    if (activity.timeSlotId == timeSlotId) {
                         ActivityId = activity._id
                    }
                });
            });
            console.log('NewId==========', ActivityId, index)
            setLoader(true)
            Mark_As_unDone(ActivityId).then((response) => {
                console.log("UndoneResp======", response)
                if (response.status == 200) {
                    setLoader(false)
                    Toaster(response.message)
                    myHabits()
                    console.log("UndoneResp======", response)
                }
            }).catch((error) => {
                setLoader(false)
                console.log("undoneErr======", error)
            })
        } else {
            setLoader(true)
            Mark_As_Done(timeSlotId, habitId).then((response) => {
                
                if (response.status == 200) {
                    setLoader(false)
                    Toaster(response.message)
                    myHabits()
                    console.log("markAsDoneResp=======", response)

                }
            }).catch((error) => {
                setLoader(false)
                console.log("markAsDoneErr=====", error)
            })
        }
    }



    const assignByTrainer = () => {
        setLoader(true)
        Get_AssignBy_Trainer().then((response) => {
            if (response.status == 200) {
                setAssignByTrainer(response.data.habits)
                setLoader(false)
                setExtData(new Date())
            }
        }).catch((error) => {
            setLoader(false)
            console.log("AssignByTrainerErr========", error)
        })
    }

    const myHabits = () => {
        setLoader(true)
        Get_MyHabits().then((response) => {
            if (response.status == 200) {
                console.log("myHabitResp=======", response.data.habits)
                setSelfAssignHabits(response.data.habits)
                setLoader(false)
                setExtData(new Date())
            }

        }).catch((error) => {
            setLoader(false)
            console.log("myHabError========", error)
        })
    }
    const inactive_Habits = () => {
        setLoader(true)
        Get_Archive_Habits().then((response) => {
            if (response.status == 200) {
                console.log("archiveHabit=======", response)
                setInactiveData(response.data.habits)
                setLoader(false)
            }
        }).catch((error) => {
            console.log("archiveHabitErr=======", error)
            setLoader(false)
        })
    }

    const radioSelection = (id) => {
        console.log("RadioID=======", id)
        if (id == 1) {
            setHabitDuration('oneTime')
        } else {
            setHabitDuration('multiple')
        }
        setRadioId(id)

    }

    const onDateChange = (date) => {
        console.log("selectedDate=======", date)
    }

    const onSelectDate = (date) => {
        let arr1 = timeSlotList
        let formate = moment(date).format('HH:mm')
        let id = arr1.length + 1
        let Obj1 = { time: formate }
        arr1.push(Obj1)
        console.log("onselectDate=========", arr1)
        setTimeSlotList([...arr1])
        setMeasurementDate(date)
        setOpenDatePicker(false)
    }

    const onDeleteTime = (id, index) => {
        console.log("deleteTime========", id, index)
        let arr1 = timeSlotList
        arr1.splice(index, 1)
        setTimeSlotList(arr1)
        setExtraData(previousState => !previousState);
    }

    const renderItem = ({ item, index }) => (
console.log("habits******",item),
        <HabitsCard
            onMarkTimeSlot={(timeSlotId, isTrue) => tabIndex == 0 ? newTranierMarkDone_unDone(timeSlotId, isTrue, item._id) : tabIndex == 1?selftAssignMark_As_Done_unDone(timeSlotId, isTrue, item._id):null}
            tabIndex={tabIndex}
            item={item}
            onSelectDelete={() => tabIndex == 0 ? trainerAssignMarkAsDone(item._id, index) : tabIndex == 1 ? selfAssing_MarkAsDone(item._id, index) : unArchiveHabit(item._id, index)}
            onSelectViewDetail={() => navigation.navigate('HabitDetailScreen', { id: item._id, type: tabIndex == 0 ? "my" : "my" })}
            onSelectSend={() => tabIndex == 2 ? delete_habit_api(item._id, index) : tabIndex == 1 ? archive_Habits(item._id, index) : removeAssignHabit(item._id, index)}
            // onPress={() => tabIndex == 0 ? SelectCheckBox(index) : navigation.navigate('HabitDetailScreen')}
            tab1={HabitsScreenConstants.VIEW_DETAIL}
            tab2={tabIndex == 2 ? HabitsScreenConstants.REACTIVATE_HABIT : HabitsScreenConstants.MARK_AS_DONE}
            tab3={tabIndex == 0 ? HabitsScreenConstants.REMOVE_HABIT : tabIndex == 1 ? HabitsScreenConstants.DEACTIVATE_HABIT : HabitsScreenConstants.DELETE_HABIT}
        />
        // <View style={{width:'100%', }}>
        //     <Image resizeMode='cover' style={{width:'100%',height:300}} source={imagesFile.ic_noDataFound} />
        // </View>

    )

    const Footer = () => {
        return (
            <View style={{ height: 80 }}></View>
        )
    }


    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, }}>
                <View style={{ flex: 1 }}>

                    <FlatList

                        data={tabIndex == 0 ? assignByTrainerHabits : tabIndex == 1 ? selfAssignHabits : inactiveData}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListHeaderComponent={<FlatListHeader index={tabIndex} onPress={(id) => selectIndex(id)} />}
                        ListFooterComponent={<Footer />}
                        ListEmptyComponent={<EmptyComponent Heading={tabIndex == 0 ? "Empty Trainer Assigned!" : tabIndex == 1 ? "Empty SelfAssigned!" : "Empty Inactive!"} />}
                        extraData={extData}
                        refreshing={false}
                        onRefresh={pullToRefresh}
                    />
                    {tabIndex == 1 ?
                        <TouchableOpacity style={styles.addBtnStyle}
                            onPress={() => setAddModalVisible(true)}
                        >
                            <View>
                                <Image source={imagesFile.ic_add} />
                            </View>
                            {/* <View style={{ marginLeft: 6.5 }}>
                                <Text style={styles.semibold_14_white}>{HabitsScreenConstants.ADD_NEW}</Text>
                            </View> */}
                        </TouchableOpacity> : null}
                </View>
                {addModalVisible ?
                    <AddHabitModal
                        habitValue={habitName}
                        HabitDesc={description}
                        timeSlot={timeSlotList}
                        onChangeDesc={(text) => setDescription(text)}
                        onChangeHabitName={(text) => setHabitName(text)}
                        OnSubmit={() => checkValidation()}
                        cancelModal={() => setAddModalVisible(false)}
                        radioId={radioId}
                        onPress={(id) => radioSelection(id)}
                        visible={addModalVisible}
                        onDelete={(id, indx) => onDeleteTime(id, indx)}
                        onSelectTime={() => setOpenDatePicker(true)}
                        extraData={extraData}
                    /> : null}
                {loader ? <Loader /> : null}
                <View >
                    <DatePicker
                        modal
                        open={openDatePicker}
                        date={measurementDate}
                        mode={'time'}
                        locale={'en_GB'}
                        is24hourSource={'locale'}
                        onConfirm={(date) => { onSelectDate(date) }}
                        onCancel={() => {
                            setOpenDatePicker(false)
                        }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default HabitScreen;