import React from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { CommunityConstants } from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
import AppHeader from '../../../../../commonComponents/AppHeader';
import CommunityCard from './CommunityCard';
import FlatListHeader from './FlatListHeader';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../../../../../utils/Constants';


const DATA = [
  {
    id: '1',
    image: imagesFile.ic_communityDemo,
  },
  {
    id: '2',
    image: imagesFile.ic_communityDemo,
  },
  {
    id: '3',
    image: imagesFile.ic_communityDemo,
  },
  {
    id: '4',
    image: imagesFile.ic_communityDemo,
  },
  {
    id: '5',
    image: imagesFile.ic_communityDemo,
  },
];
const CommunityScreen = () => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <CommunityCard item={item} />
  )
  const Footer = () => {
    return (
      <View style={{ height: 80 }}></View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<FlatListHeader goBack={() => navigation.goBack()} />}
          ListFooterComponent={<Footer />}
        />
      </View>
    </SafeAreaView>
  )
}

export default CommunityScreen;