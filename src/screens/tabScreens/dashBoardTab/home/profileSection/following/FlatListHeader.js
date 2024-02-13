import React from 'react';
import ProfileHeader from '../profile/ProfileHeader';
import {ProfileDetialConstants} from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const FlatListHeader = ()=>{
    const navigation = useNavigation()
    return(
        <ProfileHeader goBack={()=>navigation.goBack()} Heading={ProfileDetialConstants.FOLLOWINGS} image={imagesFile.ic_back} image1={imagesFile.ic_shareImg} />
    )
}

export default FlatListHeader;