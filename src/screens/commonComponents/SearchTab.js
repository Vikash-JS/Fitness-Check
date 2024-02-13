import React from 'react';
import { View, Text, StyleSheet, TextInput ,TouchableOpacity ,Image} from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const SearchTab = (props) => {
    return (
        <View style={styles.inputView}>
            <View style={styles.inputSubView}>
                <TextInput
                value={props.value}
                    style={{ height: 30, backgroundColor: Colors.white, borderRadius: 10 }}
                    placeholder={"🔍   search"}
                    onChangeText={props.onChangeText}
                />
            </View>
        </View>
    )
}

export default SearchTab;

const styles = StyleSheet.create({
    
    inputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14.5,
        paddingHorizontal:18
        
    },
    inputSubView: {
        borderColor: Colors.inputGrey,
        borderWidth: 1,
        width: '100%',
        height: 40,
        // marginLeft: 18,
        borderRadius: 10,
        justifyContent: 'center',
    }

})