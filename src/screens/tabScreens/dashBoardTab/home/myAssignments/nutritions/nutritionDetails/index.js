import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { NutritionDetailConstants } from '../nutritionConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import base64 from 'base64-js';
import { decode } from 'base-64';

import DualButton from '../../../../../../commonComponents/DualButton';
import { styles } from './styles';
import {
  Capitalize,
  Colors,
  Fonts,
  NtritionData,
} from '../../../../../../../utils/Constants';
import DropShadow from 'react-native-drop-shadow';
import NutritionDetailCard from '../../../../../../commonComponents/NutritionDetailCard';
import PDFCard from '../../../../../../commonComponents/PDFCard';
import SingleButton from '../../../../../../commonComponents/SingleButton';
import Loader from '../../../../../../commonComponents/Loader';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import {
  Export_Pdf,
  Get_NutritionDetail_ById,
  Get_User_Nutrition_Assign,
  Mark_as_Done,
  GetNutritionActivityById,
} from '../../../../../../../apiManager/nutrition/index';
import MyStatusBar from '../../../../../../commonComponents/MyStatusBar';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';
import RNFetchBlob from 'rn-fetch-blob';
import { ProgressChart } from 'react-native-chart-kit';

const NutritionDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [headerName, setHeaderName] = useState(route.params.name);
  const [nutritionId, setNutritionId] = useState(route.params.id);
  console.log('route.params.id: ', route.params.id);
  const [type, setType] = useState(route.params.type);
  const [loader, setLoader] = useState(false);
  const [nutritionDetail, setNutritionDetail] = useState([]);
  const [microNutritients, setMicroNutrients] = useState([]);
  const [dynamicId, setDynamicId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [adsUri, setAdsUri] = useState('');
  const [consumedPercentage, setConsumedPercentage] = useState(0);

  useEffect(() => {
    NutritionDetail();
    console.log('route========****', route);
    GetAds();
  }, []);

  const selectIndex = id => {
    setIndex(id);
  };

  const progressChartView = () => {
    console.log('typeof consumedPercentage', typeof consumedPercentage);

    const chartConfig = {
      backgroundGradientFromOpacity: 0.05,
      backgroundGradientToOpacity: 0.05,
      backgroundColor: Colors.black,
      backgroundGradientFrom: Colors.black,
      backgroundGradientTo: Colors.black,
      propsForLabels: { fill: Colors.black },
      decimalPlaces: 2,
      color: (opacity = 1, _index) => `rgba(256,256,256,${0.7})`,
    };
    const data = {
      labels: [''],
      data: [consumedPercentage == 'NaN' ? 0 : consumedPercentage / 100],
      colors: [Colors.black],
    };

    return (
      <>
        <ProgressChart
          data={data}
          width={Dimensions.get('window').width * 0.95 - 10}
          height={170}
          strokeWidth={10}
          hasLegend={true}
          withCustomBarColorFromData={true}
          radius={50}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 10 }}
        />
      </>
    );
  };

  const GetAds = () => {
    var raw = JSON.stringify({ place: 'Nutritions', panel: 'Customer' });
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

  const NutritionDetail = () => {
    setLoader(true);
    // Get_NutritionDetail_ById(nutritionId, type).then((response) => {
    //     if (response.status == 200) {
    //         // console.log("NutriDetail=======", response.data.nutrition)
    //         setNutritionDetail(response.data.nutrition)
    //         let micro = response.data.nutrition[0].microNutrients
    //         let activity = response.data.nutrition[0].activity
    //         // console.log("MicroNut========", micro)

    //         micro.forEach(element => {
    //             element.value = 0
    //             element.left = 0
    //         });
    //         // console.log("updatedMicro========", micro)
    //         setMicroNutrients(micro)
    //         if (response.data.nutrition[0].activity.length > 0) {
    //             //  micro.forEach(mic => {
    //             activity.forEach(act => {
    //                 response.data.nutrition[0].mealGroup.forEach(mealGrp => {
    //                     mealGrp.meals.forEach(meals => {
    //                         if (meals._id == act.mealId) {
    //                             micro.forEach(mic => {
    //                                 if (mic.microNutrientName == 'Protein') {
    //                                     mic.value = mic.value + meals.protein
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 } else if (mic.microNutrientName == 'Fat') {
    //                                     mic.value = mic.value + meals.fat
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 } else if (mic.microNutrientName == 'Carbs') {
    //                                     mic.value = mic.value + meals.carbs
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 } else if (mic.microNutrientName == 'Fiber') {
    //                                     mic.value = mic.value + meals.fiber
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 } else if (mic.microNutrientName == 'Sodium') {
    //                                     mic.value = mic.value + meals.sodium
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 } else if (mic.microNutrientName == 'Sugar') {
    //                                     mic.value = mic.value + meals.sugar
    //                                     mic.left = mic.microNutrientValue - mic.value
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 });
    //                 // });
    //             });
    //             //  setMicroNutrients(micro)
    //             console.log("MicroProtine=============", micro)
    //         }
    //         calculatePercentage(response.data.nutrition[0])
    //         setMicroNutrients(micro)
    //         setLoader(false)
    //     }
    //     Get
    // }).catch((error) => {
    //     // console.log("NutriDetailError------", error)
    //     setLoader(false)
    // })

    //       Get_NutritionDetail_ById(nutritionId, type).then(response => {
    //         let array = []
    //     array.push(response.data.nutrition)
    //     setNutritionDetail(array);
    // setLoader(false)
    // }).catch(err =>{
    // console.log(err)
    // setLoader(false)
    // })
    (type == 'all' ? Get_NutritionDetail_ById(nutritionId, type) : GetNutritionActivityById(nutritionId))
      .then(response => {
        if (response.status == 200) {
          console.log('response: --=-=-=-=-==', response.data.nutrition);
          setNutritionDetail(response.data.nutrition)
          let array = []
          if (type == 'all') {
            array.push(response.data.nutrition)
            setNutritionDetail(array);
          }
          let micro = (type == 'all' ? array[0].microNutrients : response.data.nutrition[0].microNutrients);
          let activity = (type == 'all' ? array[0].activity : response.data.nutrition[0].activity);
          // console.log("MicroNut========", micro)

          micro.forEach(element => {
            element.value = 0;
            element.left = 0;
          });
          // console.log("updatedMicro========", micro)
          setMicroNutrients(micro);
          if (type == 'all' ? array[0].activity.length > 0 : response.data.nutrition[0].activity.length > 0) {
            //  micro.forEach(mic => {
            activity.forEach(act => {
              (type == 'all' ? array[0].mealGroup : response.data.nutrition[0].mealGroup).forEach(mealGrp => {
                mealGrp.meals.forEach(meals => {
                  if (meals._id == act.mealId) {
                    micro.forEach(mic => {
                      if (mic.microNutrientName == 'Protein') {
                        mic.value = mic.value + meals.protein;
                        mic.left = mic.microNutrientValue - mic.value;
                      } else if (mic.microNutrientName == 'Fat') {
                        mic.value = mic.value + meals.fat;
                        mic.left = mic.microNutrientValue - mic.value;
                      } else if (mic.microNutrientName == 'Carbs') {
                        mic.value = mic.value + meals.carbs;
                        mic.left = mic.microNutrientValue - mic.value;
                      } else if (mic.microNutrientName == 'Fiber') {
                        mic.value = mic.value + meals.fiber;
                        mic.left = mic.microNutrientValue - mic.value;
                      } else if (mic.microNutrientName == 'Sodium') {
                        mic.value = mic.value + meals.sodium;
                        mic.left = mic.microNutrientValue - mic.value;
                      } else if (mic.microNutrientName == 'Sugar') {
                        mic.value = mic.value + meals.sugar;
                        mic.left = mic.microNutrientValue - mic.value;
                      }
                    });
                  }
                });
              });
              // });
            });
            //  setMicroNutrients(micro)
            console.log('MicroProtine=============', micro);
          }
          calculatePercentage(type == 'all' ? array[0] : response.data.nutrition[0]);
          setMicroNutrients(micro);
          setLoader(false);
        }
      })
      .catch(error => {
        // console.log("NutriDetailError------", error)
        setLoader(false);
      });
  }



  const calculatePercentage = nutritionDetail => {
    let totalMealArr = [];
    let completedMealsArr = [];
    nutritionDetail.mealGroup.forEach(mealGroup => {
      console.log('mealsGroup========', mealGroup);
      mealGroup.meals.forEach(meals => {
        console.log('meals=======', meals);
        totalMealArr.push(meals);
      });
    });
    if (nutritionDetail?.activity?.length > 0) {
      nutritionDetail?.activity.forEach(element => {
        completedMealsArr.push(element);
      });
    }
    // console.log("mealsArr========",totalMealArr.length)
    // console.log("completedActivity========",completedMealsArr.length)
    let percent = (completedMealsArr.length / totalMealArr.length) * 100;
    console.log('completedMealsArr.length=========', totalMealArr.length);

    setConsumedPercentage(percent.toFixed(2));
  };

  const onSelectMeal = (mealId, index, mealGrpId) => {
    console.log('MEalsID==========', mealId, index, mealGrpId, nutritionId);
    let arr1 = nutritionDetail;
    var index;
    var isExist = false;
    let isMarkTrue = true;

    if (arr1[0].activity.length > 0) {
      arr1[0].activity.forEach(element => {
        if (element.mealId == mealId) {
          index = arr1[0].activity.indexOf(element);
          isExist = true;
          isMarkTrue = false;
        }
      });

      if (isExist) {
        console.log('11111');
        arr1[0].activity.splice(index, 1);
        setNutritionDetail(arr1);
        setDate(new Date());
        let micro = microNutritients;
        arr1[0].mealGroup.forEach(element => {
          if (element._id == mealGrpId) {
            element.meals.forEach(element1 => {
              if (element1._id == mealId) {
                micro.forEach(element2 => {
                  if (element2.microNutrientName == 'Protein') {
                    element2.value = element2.value - element1.protein;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Fat') {
                    element2.value = element2.value - element1.fat;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Carbs') {
                    element2.value = element2.value - element1.carbs;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Fiber') {
                    element2.value = element2.value - element1.fiber;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Sodium') {
                    element2.value = element2.value - element1.sodium;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Sugar') {
                    element2.value = element2.value - element1.sugar;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  }
                });
              }
            });
          }
        });
        var raw = JSON.stringify({
          nutritionId: nutritionId,
          mealGroupId: mealGrpId,
          mealId: mealId,
          status: 'false',
        });
        markAsDone(raw);
      } else {
        console.log('22222');

        let id = dynamicId + 1;
        let obj1 = { _id: id, mealId: mealId };
        setDynamicId(id);
        console.log('UpdateId==========', id);
        arr1[0].activity.push(obj1);
        console.log('updataingArray', arr1);
        // console.log("ActivityArr=======", arr1)
        // setWorkoutDetail({})
        setNutritionDetail(arr1);
        setDate(new Date());
        let micro = microNutritients;
        arr1[0].mealGroup.forEach(element => {
          if (element._id == mealGrpId) {
            element.meals.forEach(element1 => {
              if (element1._id == mealId) {
                micro.forEach(element2 => {
                  if (element2.microNutrientName == 'Protein') {
                    element2.value = element2.value + element1.protein;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Fat') {
                    element2.value = element2.value + element1.fat;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Carbs') {
                    element2.value = element2.value + element1.carbs;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Fiber') {
                    element2.value = element2.value + element1.fiber;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Sodium') {
                    element2.value = element2.value + element1.sodium;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  } else if (element2.microNutrientName == 'Sugar') {
                    element2.value = element2.value + element1.sugar;
                    element2.left =
                      element2.microNutrientValue - element2.value;
                  }
                });
              }
            });
          }
        });
        setMicroNutrients(micro);
        var raw = JSON.stringify({
          nutritionId: nutritionId,
          mealGroupId: mealGrpId,
          mealId: mealId,
          status: 'true',
        });
        console.log('rawwww****', raw);
        markAsDone(raw);
      }
    } else {
      console.log('33333');

      let id = dynamicId + 1;
      let obj1 = { _id: id, mealId: mealId };
      setDynamicId(id);
      console.log('UpdateId==========', id);
      arr1[0].activity.push(obj1);
      // console.log("updataingArray", arr1)
      // console.log("ActivityArr=======", arr1)
      // setWorkoutDetail({})
      setNutritionDetail(arr1);
      setDate(new Date());
      let micro = microNutritients;
      arr1[0].mealGroup.forEach(element => {
        if (element._id == mealGrpId) {
          element.meals.forEach(element1 => {
            if (element1._id == mealId) {
              micro.forEach(element2 => {
                if (element2.microNutrientName == 'Protein') {
                  element2.value = element2.value + element1.protein;
                  element2.left = element2.microNutrientValue - element2.value;
                } else if (element2.microNutrientName == 'Fat') {
                  element2.value = element2.value + element1.fat;
                  element2.left = element2.microNutrientValue - element2.value;
                } else if (element2.microNutrientName == 'Carbs') {
                  element2.value = element2.value + element1.carbs;
                  element2.left = element2.microNutrientValue - element2.value;
                } else if (element2.microNutrientName == 'Fiber') {
                  element2.value = element2.value + element1.fiber;
                  element2.left = element2.microNutrientValue - element2.value;
                } else if (element2.microNutrientName == 'Sodium') {
                  element2.value = element2.value + element1.sodium;
                  element2.left = element2.microNutrientValue - element2.value;
                } else if (element2.microNutrientName == 'Sugar') {
                  element2.value = element2.value + element1.sugar;
                  element2.left = element2.microNutrientValue - element2.value;
                }
              });
            }
          });
        }
      });
      setMicroNutrients(micro);

      var raw = JSON.stringify({
        nutritionId: nutritionId,
        mealGroupId: mealGrpId,
        mealId: mealId,
        status: 'true',
      });

      markAsDone(raw);
    }
    calculatePercentage(arr1[0]);
  };

  const markAsDone = raw => {
    setLoader(true);
    console.log('nutritionData======', raw);
    Mark_as_Done(raw)
      .then(response => {
        console.log('markAsResponse========', response);
        if (response.status == 200) {
          setLoader(false);
          Toaster(response.message);
          // setNutritionDetail(response.data.nutritionDetail)
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('MarkAsDoneError=======', error);
      });
  };

  const verifyPlatform = async () => {
    if (Platform.OS === 'ios') {
      downloadExportPdf();
    } else {
      try {
        if (Platform.OS === 'android' && Platform.Version < 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          if (
            granted !== "granted"
          ) {
            setLoader(false);
            Toaster('storage_permission required to export ');
          } else {
            console.log('Storage Permission Granted.');
            downloadExportPdf();
          }
        } else {
          console.log('Storage Permission Granted.');
          downloadExportPdf();
        }
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
        setLoader(false);
      }
    }
  };

  const downloadExportPdf = () => {
    setLoader(true);
    const pdfFileName = 'pdfNutrition.pdf'; // The desired file name
    RNFetchBlob
      .config({
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification: true,
          title: pdfFileName,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          mime: 'application/pdf',
          description: 'File downloaded by download manager.',
          path: RNFetchBlob.fs.dirs.DownloadDir + '/' + pdfFileName,
        }
      })
    Export_Pdf(nutritionId)
      .then(async response => {
        // the path of downloaded file
        // resp.path()
        let base64Str = response.pdf;
        // console.log(base64Str)
        // let base64Str = response.pdf.trim();
        var fileDir;
        if (Platform.OS == 'ios') {
          fileDir = RNFetchBlob.fs.dirs.DocumentDir;
        } else {
          fileDir = RNFetchBlob.fs.dirs.DownloadDir;
        }
        let pdfLocation = `${fileDir}/${Math.floor(date.getTime() + date.getSeconds() / 2)}.pdf`;

        // RNFetchBlob.fs.createFile(pdfLocation, RNFetchBlob.base64.encode(base64Str), 'base64');
        RNFetchBlob.fs.createFile(pdfLocation, response.pdf, 'base64').then(path => {
          // necessary ?
          console.log('newPath....', path);
          RNFetchBlob.session('all').add(path);
        });
        Toaster('PDF downloaded  successfully');
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error('Error downloading PDF:', error);
      });
  };

  const renderItem = ({ item }) => (
    // console.log('MicroItems=========', item),
    (
      <TouchableOpacity
        onPress={() => navigation.navigate('MacrosDetails', { item: item })}>
        <NutritionDetailCard
          type={type}
          detail={nutritionDetail}
          item={item}
          onSelect={(id, index) => onSelectMeal(id, index, item._id)}
        />
      </TouchableOpacity>
    )
  );

  const renderCocreator = ({ item }) => (
    console.log('CoCreator========', item),
    (
      <DropShadow style={styles.shadowStyle}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 3,
            borderRadius: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontFamily: Fonts.gilroy_SemiBold,
              fontSize: 14,
              color: Colors.black,
              paddingVertical: 8,
              marginLeft: 7
            }}>
            {Capitalize(item.fullName ?? '')}
          </Text>
        </View>
      </DropShadow>
    )
  );

  return (
    // console.log("Cocreator=======",nutritionDetail?.CoCreator),
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView style={{ flex: 1 }}>
          {type == 'my' ? (
            <AppHeader
              onGraphCall={() =>
                navigation.navigate('NutritionProgress', {
                  progressData: route?.params,
                })
              }
              Heading={headerName}
              image={imagesFile.ic_graph}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <AppHeader
              Heading={headerName}
              onPress={() => navigation.goBack()}
            />
          )}
          <View>
            <Image
              resizeMode={'cover'}
              style={{ width: '100%', height: 110, alignSelf: 'center' }}
              source={{ uri: adsUri }}
            />
          </View>
          {/* <DualButton
                        index={index}
                        onPress={id => selectIndex(id)}
                        tab1={NutritionDetailConstants.PLAN}
                        tab2={NutritionDetailConstants.DETAILS}

                    /> */}
          {index == 0 && type == 'my' ? (
            <View style={styles.durationView}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.bold_18_black}>
                  {NutritionDetailConstants.NUTRITION_PROGRESS}
                </Text>
                {/* <TouchableOpacity onPress={()=>
                            {
                                navigation.navigate('NutritionProgress',{progressData:route?.params})
                            }}>
                            <Text style={[styles.bold_18_black,{color:Colors.blue}]} >{NutritionDetailConstants.WEEKLY_PROGRESS}</Text>
                            </TouchableOpacity> */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                {/* <View>
                                <Image source={imagesFile.ic_ellipse} />
                            </View> */}
                {/* <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.bold_18_black}>{consumedPercentage}% </Text>
                                <Text style={styles.bold_18_black}>Consumed</Text>
                            </View> */}

                {progressChartView(consumedPercentage)}
              </View>
            </View>
          ) : null}
          {console.log("indexxxx", index)}
          {index == 0 ? (
            // mealGroup?.map((HeaderData) =>
            //     <NutritionDetailCard item={HeaderData} />
            // )
            <>
              <View style={{ marginTop: 10 }}>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      fontFamily: Fonts.gilroy_Bold,
                      fontSize: 14,
                      color: Colors.black,
                    }}>
                    Co-Creator
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={nutritionDetail[0]?.CoCreator}
                    renderItem={renderCocreator}
                    style={{ marginTop: 10 }}

                  />
                </View>
              </View>
              <FlatList
                data={nutritionDetail[0]?.mealGroup}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                extraData={date}
              />
            </>
          ) : (
            <View style={{ marginHorizontal: 18, marginTop: 20 }}>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={styles.bold_18_black}>
                    {NutritionDetailConstants.PLAN_NAME}
                  </Text>
                </View>
                <DropShadow style={styles.shadowStyle}>
                  <View style={styles.description_note_view}>
                    <Text style={styles.semiBold_12_black}>
                      {nutritionDetail[0]?.planName}
                    </Text>
                  </View>
                </DropShadow>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={styles.bold_18_black}>
                    {NutritionDetailConstants.DESCRIPTION}
                  </Text>
                </View>
                <DropShadow style={styles.shadowStyle}>
                  <View style={styles.description_note_view}>
                    <Text style={styles.semiBold_12_black}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </Text>
                  </View>
                </DropShadow>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={styles.bold_18_black}>
                    {NutritionDetailConstants.NOTES}
                  </Text>
                </View>
                <DropShadow style={styles.shadowStyle}>
                  <View style={styles.description_note_view}>
                    <Text style={styles.semiBold_12_black}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </Text>
                  </View>
                </DropShadow>
              </View>
              {/* <View style={{ marginTop: 20 }}>
                                <View style={{ marginBottom: 12 }}>
                                    <Text style={styles.bold_18_black}>{NutritionDetailConstants.FILES}</Text>
                                </View>
                                <View>
                                    <PDFCard />
                                </View>
                                <View style={{ marginTop: 6 }}>
                                    <PDFCard />
                                </View>
                                <View style={{ marginTop: 6 }}>
                                    <PDFCard />
                                </View>
                            </View> */}
            </View>
          )}

          <View style={{ marginTop: 10 }}>
            <SingleButton
              name={'Export plan as PDF'}
              onPress={() => verifyPlatform()}
            />
          </View>
          {index == 0 ? (
            <TouchableOpacity
              style={styles.totalBtnView}
              onPress={() =>
                navigation.navigate('Macros', { data: microNutritients })
              }>
              <Text style={styles.semiBold_14_black}>
                {NutritionDetailConstants.VIEW_TOTALS}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={{ height: 80 }}></View>
        </ScrollView>
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};

export default NutritionDetail;
