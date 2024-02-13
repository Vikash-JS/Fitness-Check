import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import { styles } from './styles';
import { smartMenuConstants } from '../ProfileConstants';
import { ListViewCard, Heading } from './ListViewCard';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation} from '@react-navigation/native';

const ListView = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.HOME} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                 onPress={()=>navigation.goBack()}
                >
                    <ListViewCard Image={imagesFile.sm_home} Name={smartMenuConstants.HOME} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.ASSIGNMENTS} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('Programs')}
                >
                    <ListViewCard Image={imagesFile.sm_program} Name={smartMenuConstants.PROGRAMS} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('MyNutritions')}
                >
                    <ListViewCard Image={imagesFile.sm_Nutrition} Name={smartMenuConstants.NUTRITIONS} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('MyWorkout')}
                >
                    <ListViewCard Image={imagesFile.sm_workout} Name={smartMenuConstants.WORKOUT} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                {/* <View style={{ marginHorizontal: 18, marginTop: 12 }}>
                    <ListViewCard Image={imagesFile.sm_file} Name={smartMenuConstants.FILES} Description={smartMenuConstants.DUMMY} />
                </View> */}
                {/* <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                 onPress={()=>navigation.navigate('HabitScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_habit} Name={smartMenuConstants.HABITS} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity> */}

                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('FormScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_forms} Name={smartMenuConstants.FORMS} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.CALENDER} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('CalenderTab')}
                >
                    <ListViewCard Image={imagesFile.sm_calender} Name={smartMenuConstants.CALENDER} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                
            </View>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.TRAINERS} />
                </View>

                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('TrainerTab')}
                >
                    <ListViewCard Image={imagesFile.sm_trainer} Name={smartMenuConstants.MY_TRAINERS} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>

                <TouchableOpacity style={{marginHorizontal:18,marginTop:12}}
                onPress={()=>navigation.navigate('TrainerHomeScreen',{index:1})}
                >
                    <ListViewCard Image={imagesFile.sm_findTrainer} Name={smartMenuConstants.FIND_A_TRAINER} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.MY_PACKAGES} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18,marginTop: 12 }} onPress={()=>navigation.navigate('PurchasedDetails')}>
                    <ListViewCard Image={imagesFile.sm_package} Name={smartMenuConstants.PACKAGES} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.MFM_JOURNEY} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=> navigation.navigate('ProgressRecordScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_mfm} Name={smartMenuConstants.MFM_JOURNEY} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View>
            {/* <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.MFM_FIND_A_PRODUCT} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=> navigation.navigate('ProductList',{index:0})}
                >
                    <ListViewCard  isBorder={true} Image={imagesFile.shop_image} Name={smartMenuConstants.MFM_SHOP} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=> navigation.navigate('ProductList',{index:1})}
                >

                    <ListViewCard isBorder={true} Image={imagesFile.order_history} Name={smartMenuConstants.ORDER_HISTORY} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
            </View> */}
            <View>
                <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                    <Heading Title={smartMenuConstants.TOOLS} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                 onPress={()=>navigation.navigate('BMRCalculatorScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_bmr} Name={smartMenuConstants.BMR_CALCULATOR} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                 onPress={()=>navigation.navigate('MicronutrientCalculatorScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_macros} Name={smartMenuConstants.MACRONUTRIENTS_CALCULATOR} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                 onPress={()=>navigation.navigate('BodyFatCalculatorScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_bodyfat} Name={smartMenuConstants.BODY_FAT_CALCULATOR} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 18, marginTop: 12 }}
                onPress={()=>navigation.navigate('RmCalculatorScreen')}
                >
                    <ListViewCard Image={imagesFile.sm_rm} Name={smartMenuConstants.RM_CALCULATOR} Description={smartMenuConstants.DUMMY} />
                </TouchableOpacity>
        
            </View>
        </View>
    )
}

export default ListView;
