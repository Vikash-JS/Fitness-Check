import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MacrosConstants } from '../nutritionConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Accordion from '../../../../../../commonComponents/Accordion';

const MacrosDetails = () => {
  const route = useRoute();
  const [items, setItmes] = useState(route?.params?.item);
  const [meals, setmeals] = useState(route?.params?.item.meals);
  const bottomTabHeight = useBottomTabBarHeight();
  const navigation = useNavigation();

  // console.log('my macrosssssssss=======>', items.mealName);
  // console.log(route?.params?.item)
  const modifiedMeals = meals && meals?.map(item => ({
    ...item,
    hasAlternatives: item?.substitute?.length > 0
  }));

  const Header = () => {
    return (
      <View>
        <AppHeader
          Heading="Macros Details"
          onPress={() => navigation.goBack()}
        />
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.mealnameText}>{items.mealName}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <>
      <View style={{ borderWidth: 1, marginTop: 20, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.itemnameText}>{item.itemName}</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.itemnameText}>
              Calories: {Number(item.calories).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            marginTop: 20,
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Protein</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>
              {Number(item.protein).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Fat</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>{Number(item.fat).toFixed(2)}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Carbs</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>
              {Number(item.carbs).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Fiber</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>
              {Number(item.fiber).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Sodium</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>
              {Number(item.sodium).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={styles.macrosvalues}>Sugar</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.macrosvalues}>
              {Number(item.sugar).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          marginTop: 20,
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Protein</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>
            {Number(item.protein).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Fat</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>{Number(item.fat).toFixed(2)}</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Carbs</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>
            {Number(item.carbs).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Fiber</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>
            {Number(item.fiber).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Sodium</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>
            {Number(item.sodium).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Text style={styles.macrosvalues}>Sugar</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.macrosvalues}>
            {Number(item.sugar).toFixed(2)}
          </Text>
        </View>
      </View>
      <Accordion
        title="Steps"
        data={['Add onions', 'boil water', 'stir for 5 mins']}
      />
      <Accordion
        title="Ingredients"
        data={['capcicum', 'onion', 'chicken', 'oil']}
      />
    </>
  );

  const Footer = () => {
    return <View style={{ height: bottomTabHeight }}></View>;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.itemname}>
          <FlatList
            ListHeaderComponent={<Header />}
            data={modifiedMeals}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<Footer />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MacrosDetails;

const styles = StyleSheet.create({
  container: {
    //flex:1
    // width:"100%",
    //  marginHorizontal: 20,
  },
  itemname: {
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 1,
    marginHorizontal: 20,
  },
  mealnameText: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 20,
  },
  itemnameText: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 15,
  },
  macrosvalues: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
  },
});
