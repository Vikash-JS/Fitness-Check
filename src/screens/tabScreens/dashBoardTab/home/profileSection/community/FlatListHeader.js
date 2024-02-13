import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import ProfileHeader from '../profile/ProfileHeader';
import { CommunityConstants } from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
const FlatListHeader = (props) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <ProfileHeader goBack={props.goBack} image={imagesFile.ic_back} Heading={CommunityConstants.COMMUNITIES} />
        </View>
    )
}

export default FlatListHeader;