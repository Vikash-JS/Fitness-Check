import React,{useState} from 'react';
import { SafeAreaView, View, Text, TextInput ,ScrollView} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { programConstants } from '../../../../dashBoardConstants';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import { styles } from '../../programs/programsDetails/programDetailStyle';
import ToggleButton from '../../../../../../commonComponents/ToggleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
const WorkoutFinished = () => {
    const navigation = useNavigation()
    const [enable, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={{ flex: 1 }}>
                <AppHeader Heading={programConstants.WORKOUT_FINISHED} onPress={() => navigation.goBack()} />
                <View style={{  marginTop: 19, marginLeft: 28, marginRight: 23 }}>
                    <View style={{  }}>
                        <Text style={styles.bold_22_black}>{programConstants.AWESOME_YOU_HAVE_FINISHED}</Text>
                    </View>
                    <View style={{ marginTop:10 }}>
                        <Text style={styles.medium_10_black}>{programConstants.LIKE_TO_NOTE}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={styles.semiBold_10_black}>{programConstants.FEEDBACK}</Text>
                    </View>
                    <View style={{paddingHorizontal:10,height:160,borderRadius:10, backgroundColor:Colors.lightGrey,justifyContent:'center'}}>
                        <TextInput
                        placeholder={"FeedBack"}
                        
                        multiline={true}
                        style={{textAlignVertical:'top',backgroundColor:Colors.lightGrey, borderRadius:10,height:140}}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:30,justifyContent:'center',alignItems:'center'}}>
                        <View>
                            <Text>{programConstants.SAVE_AS_A_WORKOUT_TEMPLATE}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <View style={{marginRight:5}}>
                            <ToggleButton isOn={enable} onToggle={toggleSwitch}/>
                        </View>
                    </View>
                    <View style={{marginTop:12,height:54,borderColor:Colors.inputGrey, borderWidth:1,borderRadius:7,justifyContent:'center'}}>
                        <TextInput
                        placeholder="Template Title"
                        />
                    </View>
                </View>
                <TouchableOpacity style={{marginTop:20,justifyContent:'center',alignItems:"center",height:54,backgroundColor:Colors.blue,marginHorizontal:18,borderRadius:5}}>
                    <Text style={styles.semiBold_14_white}>{programConstants.FINISH}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WorkoutFinished;