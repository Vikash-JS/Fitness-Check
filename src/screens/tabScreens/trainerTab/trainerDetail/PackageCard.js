import React, { useState, useSyncExternalStore, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const PackageCard = props => {
  const navigation = useNavigation();
  const [flag, setflag] = useState(false);
  const [dummy, setDummy] = useState(props.item.records);
  // console.log("items=========", props.item.records)

  // const renderPackageDetails = ({ item }) => (
  //   <>
  //   <DropShadow style={styles.shadowStyle}>
  //     <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             backgroundColor:Colors.white
  //           }}>
  //           <View
  //             style={{
  //               width: 60,
  //               height: 60,
  //               borderRadius: 10,
  //               overflow: 'hidden',
  //             }}>
  //             <Image
  //               style={{ width: 60, height: 60 }}
  //               source={imagesFile.sm_feedback}
  //             />
  //           </View>
  //           <View style={{ paddingLeft: 7 }}>
  //             {item.businessDetails ?
  //               <Text>{item?.businessDetails[0]?.businessName}</Text> : null}

  //           </View>
  //           <View style={{ flex: 1 }}></View>
  //           <TouchableOpacity onPress={() => setflag(!flag)}>
  //             <Image
  //               source={
  //                 flag == true
  //                   ? imagesFile.ic_subtract
  //                   : imagesFile.ic_addIcon
  //               }
  //             />
  //           </TouchableOpacity>
  //         </View> 
  //     <TouchableOpacity>
  //       {flag == true ? (
  //         <>
  //           <TouchableOpacity
  //             onPress={() =>
  //               navigation.navigate('PackageCardDetails', { pacakgeId: item._id })
  //             }>
  //             <View style={{ marginTop: 12, overflow: 'hidden' }}>
  //               <Image
  //                 style={{ height: 124, width: '100%', borderRadius: 10 }}
  //                 source={{ uri: item.thumbnail }}
  //               />
  //             </View>

  //             <View style={{ marginTop: 12 }}>
  //               <Text style={styles.bold_16_black}>{item.packageName}</Text>
  //             </View>
  //             <View style={{ marginTop: 4 }}>
  //               <Text style={styles.semibold_9_opacity}>{item.description}</Text>
  //             </View>
  //             <View style={{ marginTop: 12 }}></View>
  //             <View>
  //               <Text style={styles.semibold_12_opacity}></Text>
  //             </View>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 marginTop: 14.5,
  //                 alignItems: 'center',
  //               }}>
  //               <View>
  //                 <Image source={imagesFile.ic_blueTick} />
  //               </View>
  //               <View style={{ paddingLeft: 11, paddingRight: 8 }}>
  //                 <Text style={styles.semibold_9_opacity}>Time Duration:</Text>
  //               </View>
  //               <View>
  //                 <Text style={styles.bold_16_black}>
  //                   {item.packageDuration} months
  //             </Text>
  //               </View>
  //             </View>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 marginTop: 14.5,
  //                 alignItems: 'center',
  //               }}>
  //               <View>
  //                 <Image source={imagesFile.ic_blueTick} />
  //               </View>
  //               <View style={{ paddingLeft: 11, paddingRight: 8 }}>
  //                 <Text style={styles.semibold_9_opacity}>Start Date:</Text>
  //               </View>
  //               <View>
  //                 <Text style={styles.bold_16_black}>June 12, 2022</Text>
  //               </View>
  //             </View>
  //             <View style={{ flexDirection: 'row', marginTop: 14.5 }}>
  //               <View style={styles.amountView}>
  //                 <Text>{item.packagePrice.price}/ Month</Text>
  //               </View>
  //               <View style={{ flex: 1 }}></View>
  //               <View style={styles.buyPackageView}>
  //                 <Text style={{ color: '#ffffff', fontSize: 10 }}>Buy Package</Text>
  //               </View>
  //             </View>
  //           </TouchableOpacity>
  //           <View style={{ width: "100%", borderWidth: 0.5, marginVertical: 14, borderColor: '#707070' }}></View>
  //         </>
  //        ) : null}

  //     </TouchableOpacity>
  //     </DropShadow>
  //   </>
  // );

  const packageDetail = ({ item }) => {
    let expiryDate = new Date(item.createdAt);
    expiryDate.setDate(expiryDate.getDate() + item.packageDuration);
    return (
      // console.log("packageItem=======", item)
      <DropShadow style={styles.shadowStyle}>
        <View style={{ padding: 12, backgroundColor: Colors.white, marginBottom: 15, borderRadius: 10 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View>
              <Image style={{ width: 38, height: 38 }} source={item.businessDetails[0].businessLogo ? { uri: item.businessDetails[0].businessLogo.imagePath } : imagesFile.ic_imgPlaceholder} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>{item.businessDetails[0].businessName}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            {/* <TouchableOpacity onPress={() => setflag(!flag)}>
          <Image
            source={
              flag == true
                ? imagesFile.ic_subtract
                : imagesFile.ic_addIcon
            }
          />
        </TouchableOpacity> */}
          </View>
          <View style={{ width: "100%", borderWidth: 0.5, marginVertical: 14, borderColor: '#707070' }}></View>
          <TouchableOpacity>
            {/* {flag == true ? ( */}
            <>
              <TouchableOpacity
                style={{ backgroundColor: Colors.white, padding: 12 }}
                onPress={() =>
                  navigation.navigate('PackageCardDetails', { pacakgeId: item._id })
                }>
                <View style={{ marginTop: 12, overflow: 'hidden' }}>
                  <Image
                    style={{ height: 124, width: '100%', borderRadius: 10 }}
                    source={{ uri: item.thumbnail }}
                  />
                </View>

                <View style={{ marginTop: 12 }}>
                  <Text style={styles.bold_16_black}>{item.packageName}</Text>
                </View>
                <View style={{ marginTop: 4 }}>
                  <Text style={styles.semibold_9_opacity}>{item.description}</Text>
                </View>
                <View style={{ marginTop: 12 }}></View>
                <View>
                  <Text style={styles.semibold_12_opacity}></Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 14.5,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image source={imagesFile.ic_blueTick} />
                  </View>
                  <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                    <Text style={styles.semibold_9_opacity}>Time Duration:</Text>
                  </View>
                  <View>
                    <Text style={styles.bold_16_black}>
                      {item.packageDuration} days
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 14.5,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image source={imagesFile.ic_blueTick} />
                  </View>
                  <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                    <Text style={styles.semibold_9_opacity}>Start Date:</Text>
                  </View>
                  <View>
                    <Text style={styles.bold_16_black}>{moment(item.createdAt).format('MMM DD, YYYY')}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 14.5,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image source={imagesFile.ic_blueTick} />
                  </View>
                  <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                    <Text style={styles.semibold_9_opacity}>Expiry Date:</Text>
                  </View>
                  <View>
                    <Text style={styles.bold_16_black}>{moment(expiryDate).format('MMM DD, YYYY')}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 14.5 }}>
                  <View style={styles.amountView}>
                    <Text style={styles.bold_14_black}>₹{item.packagePrice.price}</Text>
                  </View>
                  <View style={{ flex: 1 }}></View>
                  <View style={styles.buyPackageView}>
                    <Text style={{ color: '#ffffff', fontSize: 10 }}>Buy Package</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
            {/* ) : null} */}

          </TouchableOpacity>
        </View>
      </DropShadow>
    )
  }


  return (

    <View style={styles.mainContainer}>
      <View>

        <FlatList
          data={dummy}
          showsVerticalScrollIndicator={false}
          renderItem={packageDetail}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
    // </DropShadow>
  );
};

export default PackageCard;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    // borderRadius: 20,
    // padding: 12,
    marginHorizontal: 18,
    // marginBottom: 20,
  },
  amountView: {
    borderRadius: 10,
    width: 115,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  buyPackageView: {
    borderRadius: 10,
    width: 82,
    height: 35,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold_16_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 16,
    color: Colors.black,
  },
  semibold_9_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 9,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_10_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  semibold_11_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 11,
    color: Colors.black,
  },
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black
  }
});
