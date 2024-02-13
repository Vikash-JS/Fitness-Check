import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import PurchasedDetailsCard from './PurchaseDetailsCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MyPackages } from '../../../../../../apiManager/trainer/index'
import { Toaster } from '../../../../../commonComponents/Toaster';
import Loader from '../../../../../commonComponents/Loader';

const PurchasedDetails = () => {
  const navigation = useNavigation();
  const bottomTabHeight = useBottomTabBarHeight()

  const [Data, setdata] = useState([])
  const [loader, setLoader] = useState()

  useEffect(() => {
    Mypackages()
  }, []);

  const Mypackages = () => {
    setLoader(true)
    MyPackages().then((response) => {
      if (response.status == 200) {
        setdata(response.data.packages)
        setLoader(false)
        Toaster(response.message)
      }
    }).catch((error) => {
      setLoader(false)
    })

  }


  const Footer = () => {
    return (
      <View style={{ height: bottomTabHeight }}></View>
    )
  }
  const renderPurchaseddetails = ({ item }) => (
    <PurchasedDetailsCard item={item} />
  )
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={Data}
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
                <Image style={style.banner_image} source={imagesFile.ic_banner} />
              </View>
            </View>
          }
          ListFooterComponent={<Footer />}
        />

        <View style={style.bottom_view}>

          {loader ? <Loader /> : null}
        </View>
      </View>

    </SafeAreaView>
  );
};

export default PurchasedDetails;


const style = StyleSheet.create({
  banner_image:
  {
    width: '100%',
    height: 110
  },
  bottom_view:
  {
    marginTop: 16, width: '100%'
  }
})