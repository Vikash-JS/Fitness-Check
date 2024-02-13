import React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import {programConstants} from '../../../../dashBoardConstants';
import { useNavigation } from '@react-navigation/native';
const ExerciseSetsHeader = (props) =>{
    const navigation = useNavigation()
    return(
        <View>
            <AppHeader Heading={programConstants.CURRENT_WORKOUT} onPress={props.onPress} />
        </View>
    )
}

export default ExerciseSetsHeader;