import React from 'react';
import {View, Text, Image} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import {MyFilesConstants} from '../FilesConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import SearchTab from '../../../../../../commonComponents/SearchTab';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
import {styles} from './styles';
const FlatListHeader = (props) =>{
    const navigation = useNavigation()
    return(
        <View style={{paddingBottom:25}}>
            <AppHeader Heading={MyFilesConstants.FILES} onPress={()=>navigation.goBack()} />
            <View>
                <Image style={{width:'100%'}} resizeMode='cover' source={imagesFile.ic_banner}/>
            </View>
            {/* <SearchTab onFilterPress={props.onFilterPress}/> */}
            {/* <View style={styles.usageView}>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text>{MyFilesConstants.USAGE}</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    <View>
                        <Text>{"6 GB / 10GB"}</Text>
                    </View>
                </View>
                <View style={styles.fullProgressBar}>
                    <View style={styles.coloredProgressBar}></View>
                </View>
            </View> */}
        </View>
    )
}

export default FlatListHeader;