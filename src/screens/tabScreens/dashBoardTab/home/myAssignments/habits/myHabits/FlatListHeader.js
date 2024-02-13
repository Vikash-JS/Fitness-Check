import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import imagesFile from '../../../../../../../../assets/imagesFile';
import DualButton from '../../../../../../commonComponents/DualButton';
import HabitTabBar from '../../../../../../commonComponents/HabitTabBar';
import { HabitsScreenConstants } from '../habitsConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';

const FlatListHeader = props => {
  const navigation = useNavigation();
  const [adsUri, setAdsUri] = useState('');

  useEffect(() => {
    GetAds();
  }, []);

  const GetAds = () => {
    var raw = JSON.stringify({ place: 'Habits', panel: 'Customer' });
    Get_Home_Adds(raw)
      .then(response => {
        if (response.status == 200) {
          setAdsUri(response.data.adsData[0].image.url);
          console.log('ProAdsresp========', response);
        }
      })
      .catch(error => {
        console.log('programAddErr========', error);
      });
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <AppHeader
        onGraphCall={() => navigation.navigate('ProgressHabitGraph')}
        Heading={HabitsScreenConstants.HABITS}
        image={imagesFile.ic_graph}
        onPress={() => navigation.goBack()}
      />
      <View>
        {adsUri ? <Image style={{ width: '100%', height: 110 }} source={{ uri: adsUri }} /> : null}
      </View>
      <View>
        <HabitTabBar
          index={props.index}
          tab1={HabitsScreenConstants.ASSIGNED_BY_TRAINER}
          tab2={HabitsScreenConstants.SELF_ASSIGNED}
          tab3={HabitsScreenConstants.INACTIVE}
          onPress={id => props.onPress(id)}
        />
      </View>
    </View>
  );
};

export default FlatListHeader;
