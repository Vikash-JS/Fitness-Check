import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import { styles } from './styles';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import PurchasedDetailsCard from './PurchaseDetailsCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const PurchasedDetails = () => {
  const navigation = useNavigation();
  const bottomTabHeight = useBottomTabBarHeight()

  const [dummydata, setDummydata] = useState([{ id: 1 }])

  const Footer = () => {
    return (
      <View style={{ height: bottomTabHeight }}></View>
    )
  }
  const renderPurchaseddetails = ({ item }) => (
    <PurchasedDetailsCard item={item.id} />
  )
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={dummydata}
          showsVerticalScrollIndicator={false}
          renderItem={renderPurchaseddetails}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View>
              <View>
                <AppHeader
                  Heading="My Packages"
                  onPress={() => navigation.goBack()}
                />
              </View>

              <View>
                <Image source={imagesFile.ic_banner} />
              </View>
            </View>
          }
          ListFooterComponent={<Footer />}
        />

        <View style={{ marginTop: 16, width: '100%' }}>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default PurchasedDetails;
