import React, { useState, useSyncExternalStore, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Colors, Fonts } from '../../../../utils/Constants';
import imagesFile from '../../../../../assets/imagesFile';
import AppHeader from '../../../commonComponents/AppHeader';
import { trainerProfileConstants } from '../trainerConstants';
import { RatingInput } from 'react-native-stock-star-rating'
import TrainerTabBar from '../../../commonComponents/TrainerTabBar';
import { styles } from './styles';
import moment from 'moment';
import {
  FollowTrainer,

  RateTrainer,

  TrainerReview,
} from '../../../../apiManager/trainer';
import DropShadow from "react-native-drop-shadow";
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import { Toaster } from '../../../commonComponents/Toaster';
import Loader from '../../../commonComponents/Loader';

const FlatListHeader = props => {
  const [certificate, SetCertificate] = useState(
    props?.Trainer?.certifications,
  );
  const [Education, SetEducation] = useState(props?.Trainer?.educations);
  const [Experince, SetExperience] = useState(props?.Trainer?.experience);
  const [skills, SetSkills] = useState(props?.Trainer?.skills);
  const [language, setLangages] = useState(props?.Trainer?.language);
  const [flag, setFlag] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loader, setLoader] = useState(false);
  const [trainerid, SetTrainerId] = useState(props?.trainerid);
  const [isFollow, setIsFollow] = useState(props?.isFollow);
  const [follow, setfollow] = useState(true);
  const navigation = useNavigation();
  const ToggleAssosiate = () => {
    setFlag(!flag);
  };


  const renderSkills = ({ item }) => (
    <View style={stylesdetails.SkillRenderView}>
      <Text style={stylesdetails.bold_11_black}>{item}</Text>
    </View>
  );

  const renderLanguages = ({ item }) => (
    <View style={stylesdetails.SkillRenderView}>
      <Text style={stylesdetails.bold_11_black}>{item}</Text>
    </View>
  );

  const downloadPopup = uri => {
    Alert.alert('Download', 'Are you sure want to downlaod this file', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => downloadCertifications(uri),
      },
    ]);
  };

  const downloadCertifications = uri => {
    const { config, fs } = RNFetchBlob;
    console.log('uri===============>', uri);
    let extension = uri.split('.').pop();
    console.log('fileExtension======', extension);
    let date = new Date();
    var fileDir;
    let configOptions;
    if (Platform.OS == 'ios') {
      fileDir = RNFetchBlob.fs.dirs.DocumentDir;
      configOptions = {
        fileCache: true,
        path:
          fileDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          `.${extension}`,

        notification: true,
      };
      config(configOptions)
        .fetch('GET', uri)
        .then(res => {
          // onResumeCall();
          Toaster('File downloaded successfully');
          setTimeout(() => {
            // RNFetchBlob.ios.previewDocument('file://' + res.path());   //<---Property to display iOS option to save file
            RNFetchBlob.ios.openDocument(res.data); //<---Property to display downloaded file on documaent viewer
            // Alert.alert(CONSTANTS.APP_NAME,'File downloaded successfully');
          }, 1000);
        })
        .catch(errorMessage => {
          console.log('ErrorMsg====', errorMessage);
        });
    } else {
      // fileDir = RNFetchBlob.fs.dirs.downloadDir;
      fileDir = RNFetchBlob.fs.dirs.DCIMDir;
      configOptions = {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            fileDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            `.${extension}`,
          description: 'Downloading xlsx...',
        },
      };
      config(configOptions)
        .fetch('GET', uri)
        .then(res => {
          Toaster('File downloaded successfully');
          setTimeout(() => {
            RNFetchBlob.android.actionViewIntent(res.path());
          }, 2000);
        })
        .catch((errorMessage, statusCode) => {
          console.log('errirMsg=======', errorMessage);
        });
    }
  };
  const RateAndReview = () => {
    setLoader(true)
    var formdata = new FormData();
    formdata.append("rating", rating);
    formdata.append("review", review);
    formdata.append('trainerId', props?.trainerid);
    RateTrainer(formdata).then((response) => {
      // console.log("rate======", response)
      if (response.status == 200) {
        // console.log("rate======", response)
        // setMyTrainer_List(response.data.trainers)
        setShowRateModal(false)
        setLoader(false)
      } else {
        setLoader(false)
      }
    }).catch((error) => {
      setLoader(false)
      console.log("rateerrrr========", error)
    })
  }

  return (
    <View>
      <View style={styles.mainContainer}>
        {/* <Image
          resizeMode={'contain'}
          style={{ width: '100%' }}
          source={imagesFile.ic_demo8}
        /> */}
        <View style={styles.homeHeader}>
          <TouchableOpacity
            style={{ marginLeft: 18 }}
            onPress={() => navigation.goBack()}>
            <Image source={imagesFile.ic_back} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <View>
            <Text style={styles.bold_18_black}>
              {trainerProfileConstants.HEADING}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={{ width: 34, marginRight: 18 }}>
            {/* <Image source={imagesFile.ic_dot} /> */}
          </TouchableOpacity>
        </View>
      </View>

      {props?.Trainer?.profilePicture.url !== null ? (
        <View style={styles.imgMainContainer}>
          <View style={styles.imgSubContainer}>
            <Image
              style={{ height: 88, width: 88 }}
              resizeMode="cover"
              source={
                props?.Trainer?.profilePicture.url
                  ? { uri: props?.Trainer?.profilePicture.url }
                  : imagesFile.ic_imgPlaceholder
              }
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
        }}>
        <View>
          <Text style={styles.bold_16_black}>{props?.Trainer?.firstName}</Text>
        </View>
        {props?.Trainer?.kyc == true ? (
          <View>
            <Image source={imagesFile.ic_blueTick} style={{ marginLeft: 4, marginTop: 1, width: 12, height: 12 }} />
          </View>
        ) : null}
      </View>
      {props?.Trainer?.address && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text style={styles.semibold_12_opacity}>
            {props?.Trainer?.address}
          </Text>
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 18,
          marginTop: 12,
        }}>
        <Text style={styles.medium_10_black}>{props?.Trainer?.about}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={props.onMessengerClick}>
          <Image source={imagesFile.ic_messenger} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.follow}
          style={{
            flexDirection: 'row',
            borderRadius: 17,
            backgroundColor: props?.isFollow ? Colors.white : Colors.blue,
            marginHorizontal: 8,
            width: 86,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: props.follow ? 1 : 0,
            borderColor: Colors.blue,
          }}>
          <View>
            {!props?.isFollow ? (
              <Image
                style={{ marginRight: 10 }}
                source={imagesFile.ic_add_white}
              />
            ) : null}
          </View>
          <View>
            <Text
              style={
                props?.isFollow
                  ? styles.semibold_12_blue
                  : styles.semibold_12_white
              }>
              {props?.isFollow ? 'Following' : 'Follow'}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => RateAndReview()}>
          <Image source={imagesFile.ic_share} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => setShowRateModal(true)}>
          <Image source={imagesFile.ic_star} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={styles.bold_20_black}>{props?.follower}</Text>
          </View>
          <View style={{ marginTop: 3 }}>
            <Text style={styles.semibold_10_opacity}>
              {trainerProfileConstants.FOLLOWERS}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 21.5,
            width: 1,
            height: 16,
            borderWidth: 1,
            opacity: 0.5,
            borderRadius: 10,
          }}></View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={styles.bold_20_black}>{props?.averageRating}</Text>
          </View>
          <View style={{ marginTop: 3 }}>
            <Text style={styles.semibold_10_opacity}>
              {trainerProfileConstants.RATINGS}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 16, flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.05 }}></View>
        <TrainerTabBar index={props.index} onPress={id => props.onPress(id)} />

        <View style={{ flex: 0.05 }}></View>
      </View>
      {/* {console.log(props?.Trainer?.availability, 'props?.Trainer')} */}
      {props.index == 1 ? (
        <View style={stylesdetails.DetailMainContainer}>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.AboutView}>
              <View style={{ paddingVertical: 12 }}>
                <Text style={styles.bold_16_black}>About</Text>
              </View>
              <View style={{ paddingBottom: 15 }}>
                <Text style={styles.bold_12_black}>
                  {props?.Trainer?.about}
                </Text>
              </View>
            </View>
          </DropShadow>

          {/* <DropShadow style={stylesdetails.shadowStyle}>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 16,
                backgroundColor: Colors.white,
                borderRadius: 10,
              }}>
              <View style={{ marginVertical: 11 }}>
                <Text>Associated with</Text>
              </View>
              <View style={stylesdetails.AssosiatedView}>
                <View>
                  <Text>Gym Mattas</Text>
                </View>
                <View style={{ flex: 1 }}></View>

                <TouchableOpacity onPress={() => ToggleAssosiate()}>
                  <Image
                    source={
                      flag == true
                        ? imagesFile.ic_subtract
                        : imagesFile.ic_addIcon
                    }
                  />
                </TouchableOpacity>
              </View>
              {flag == true ? (
                <View>
                  <View style={stylesdetails.SubViewAssosiatedwith}>
                    <View style={{ paddingRight: 8 }}>
                      <Image source={imagesFile.ic_Notes_Logo} />
                    </View>
                    <View>
                      <Text>2435678</Text>
                    </View>
                  </View>

                  <View style={stylesdetails.SubViewAssosiatedwith}>
                    <View style={{ paddingRight: 8 }}>
                      <Image source={imagesFile.ic_MSG_icon} />
                    </View>
                    <View>
                      <Text>k.agrawal@gmail.com</Text>
                    </View>
                  </View>
                  <View style={stylesdetails.SubViewAssosiatedwith}>
                    <View style={{ paddingRight: 8 }}>
                      <Image source={imagesFile.ic_phoneIcon} />
                    </View>
                    <View>
                      <Text>2435678</Text>
                    </View>
                  </View>
                  <View style={stylesdetails.SubViewAssosiatedwith}>
                    <View style={{ paddingRight: 8 }}>
                      <Image source={imagesFile.ic_Location} />
                    </View>
                    <View>
                      <Text>
                        618, Shekhar Central, Palasia Square Manorama Ganj, Indore
                      </Text>
                    </View>
                  </View>

                  <View style={stylesdetails.Indiaview}>
                    <View style={{ paddingRight: 8 }}>
                      <Image source={imagesFile.ic_Earthicon} />
                    </View>
                    <View>
                      <Text>India</Text>
                    </View>
                  </View>
                </View>

              ) : null}
            </View>
          </DropShadow> */}

          <DropShadow style={[stylesdetails.shadowStyle, { marginTop: 10 }]}>
            <View style={stylesdetails.AboutView}>
              <View style={{ paddingVertical: 12 }}>
                <Text style={styles.bold_16_black}>Availability</Text>
              </View>
              {props?.Trainer?.availability?.map(e => {
                if (e.startTime && e.endTime) {
                  return (
                    <View
                      style={{
                        paddingBottom: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.bold_12_black, { width: '30%' }]}>
                        {e.day}
                      </Text>
                      <Text style={styles.bold_12_black}>{e.startTime}</Text>
                      <Text style={styles.bold_12_black}>{e.endTime}</Text>
                    </View>
                  );
                }
              })}
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.contactInfoview}>
              <View style={stylesdetails.contactInfoSubView}>
                <View>
                  <Text style={stylesdetails.bold_16_black}>Contact Info</Text>
                </View>
                <View style={stylesdetails.contactSubview2}>
                  <View style={{ paddingRight: 8 }}>
                    <Image source={imagesFile.ic_email} />
                  </View>
                  <View>
                    <Text style={stylesdetails.semibold_12_black}>
                      {props?.Trainer?.email}
                    </Text>
                  </View>
                </View>
                <View style={stylesdetails.contactSubview2}>
                  <View style={{ paddingRight: 8 }}>
                    <Image source={imagesFile.ic_pho} />
                  </View>
                  <View>
                    <Text style={stylesdetails.semibold_12_black}>
                      {props?.Trainer?.mobileNumber}
                    </Text>
                  </View>
                </View>
                <View style={stylesdetails.contactSubview2}>
                  <View style={{ paddingRight: 8 }}>
                    <Image source={imagesFile.ic_location} />
                  </View>
                  <View>
                    <Text style={stylesdetails.semibold_12_black}>
                      {props?.Trainer?.address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.SkillMAinView}>
              <View>
                <Text style={stylesdetails.bold_16_black}>Education</Text>
              </View>
              {Education && Education.length
                ? Education.map(e => (
                  <View style={stylesdetails.contactSubview2}>
                    <View>
                      <Image source={imagesFile.ic_educ} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                      <View>
                        <Text style={stylesdetails.semibold_12_black}>
                          {e.institute}
                        </Text>
                      </View>
                      <View>
                        <Text style={stylesdetails.semibold_12_black}>
                          {e.certificate}
                        </Text>
                      </View>
                      <View>
                        <Text style={stylesdetails.medium_10_opacity}>
                          {moment(e.startDate).format('MMM-YYYY')}-
                          {moment(e.endDate).format('MM-YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
                : null}
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.SkillMAinView}>
              <View>
                <Text style={stylesdetails.bold_16_black}>Position</Text>
              </View>
              {Experince && Experince.length
                ? Experince.map(t => (
                  <View style={stylesdetails.contactSubview2}>
                    <View>
                      <Image source={imagesFile.ic_pos} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                      <View>
                        <Text style={stylesdetails.semibold_12_black}>
                          {t.companyName}
                        </Text>
                      </View>
                      <View>
                        <Text style={stylesdetails.semibold_12_black}>
                          {t.role}
                        </Text>
                      </View>
                      <View>
                        <Text style={stylesdetails.medium_10_opacity}>
                          {moment(t.startDate).format('MMM-YYYY')}-
                          {moment(t.endDate).format('MM-YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
                : null}
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.SkillMAinView}>
              <View>
                <Text style={stylesdetails.bold_16_black}>Certificates</Text>
              </View>
              {certificate && certificate.length
                ? certificate.map(data => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                    }}>
                    <View style={stylesdetails.certificateDownload}>
                      <View>
                        <Image source={imagesFile.ic_pos} />
                      </View>
                      <View style={{ marginLeft: 8 }}>
                        <Text style={stylesdetails.semibold_12_black}>
                          {data.institute}
                        </Text>
                        <Text style={stylesdetails.semibold_12_black}>
                          {data.certificate}
                        </Text>
                        <Text style={stylesdetails.medium_10_opacity}>
                          {moment(data.startDate).format('MMM-YYYY')}-
                          {moment(data.endDate).format('MM-YYYY')}
                        </Text>
                      </View>
                      <View></View>
                    </View>

                    <View style={{ marginRight: 15, alignSelf: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          downloadPopup(data?.file?.url);
                        }}>
                        <Image source={imagesFile.ic_download} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
                : null}
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.SkillMAinView}>
              <View style={{ paddingTop: 8, paddingBottom: 12 }}>
                <Text style={stylesdetails.bold_16_black}>Skills</Text>
              </View>
              <FlatList
                numColumns={3}
                data={skills}
                ItemSeparatorComponent={() => (
                  <View style={{ marginTop: 10 }}></View>
                )}
                showsVerticalScrollIndicator={false}
                renderItem={renderSkills}
                keyExtractor={item => item.id}
              />
            </View>
          </DropShadow>
          <DropShadow style={stylesdetails.shadowStyle}>
            <View style={stylesdetails.SkillMAinView}>
              <View style={{ paddingTop: 8, paddingBottom: 12 }}>
                <Text style={stylesdetails.bold_16_black}>Language</Text>
              </View>
              <FlatList
                numColumns={3}
                data={language}
                ItemSeparatorComponent={() => (
                  <View style={{ marginTop: 10 }}></View>
                )}
                showsVerticalScrollIndicator={false}
                renderItem={renderLanguages}
                keyExtractor={item => item.id}
              />
            </View>
          </DropShadow>
        </View>
      ) : null}
      <Modal
        visible={showRateModal}
        animationType="slide"
        onRequestClose={() => setShowRateModal(false)}
        transparent={true}
      >
        <View style={stylesdetails.editModalContainer}>
          <View style={stylesdetails.editModalView}>
            <View style={stylesdetails.editModalHeader}>
            </View>
            <View style={stylesdetails.innerInputContainer}>
              <View style={[stylesdetails.inputView1, {}]}>
                <View style={[stylesdetails.inputView1,]}>

                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => setShowRateModal(false)}
                    style={stylesdetails.editModalCloseIcon}
                  >
                    <Image source={imagesFile.ic_close}
                      style={{ width: 12, height: 12 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[stylesdetails.inputView3,]}>
                <View style={[stylesdetails.inputView2, { marginTop: 14 }]}>
                  <RatingInput
                    rating={rating}
                    setRating={setRating}
                    size={50}
                    maxStars={5}
                    bordered={false}
                  />
                </View>
                <View style={[stylesdetails.inputView2,]}>
                  <TextInput
                    style={stylesdetails.input}
                    onChangeText={newText => setReview(newText)}
                    value={review}
                    placeholderTextColor={Colors.palceHolder_grey}
                    fontFamily={Fonts.gilroy_SemiBold}
                    fontSize={12}
                    numberOfLines={6}
                    multiline={true}
                    returnKeyType={'done'}
                    blurOnSubmit={true}
                    placeholder="Write your review"
                  />
                </View>
                <View style={[stylesdetails.inputView2, { marginRight: 0 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      RateAndReview()
                    }}
                    style={stylesdetails.editModalCloseIcon1}
                  >
                    <Text style={stylesdetails.closeButtonStyle}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {loader && <Loader />}
    </View>
  );
};

export default FlatListHeader;

const stylesdetails = StyleSheet.create({
  DetailMainContainer: {
    marginTop: 10,
    padding: 18,
    // borderWidth: 1,
    backgroundColor: Colors.white,
  },
  input: {
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderColor: Colors.inputGrey,
    paddingHorizontal: 20,
    height: 100,
    width: '90%',
    textAlignVertical: 'top',
  },
  SkillMAinView: {
    paddingLeft: 16,
    marginTop: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 12,
  },
  SkillRenderView: {
    borderRadius: 20,
    height: 38,
    width: 92,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: Colors.inputGrey,
  },
  AboutView: {
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  AssosiatedView: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SubViewAssosiatedwith: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  Indiaview: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 8,
  },
  contactInfoview: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 12,
  },
  contactInfoSubView: {
    paddingHorizontal: 16,
  },
  contactSubview2: {
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
  },
  certificateDownload: {
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
  },
  shadowStyle: {
    flex: 1,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  bold_16_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 16,
    color: Colors.black,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  medium_10_opacity: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
  bold_11_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 11,
    color: Colors.black
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 20,
  },
  editModalView: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,

  },
  editModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  editModalHeaderText: {
    fontFamily: Fonts.gilroy_Medium,
    // fontWeight: Typography.FW_MEDIUM,
    fontSize: 18,
    marginTop: 4,
    color: "#000",
  },
  editModalCloseIcon: {
    backgroundColor: "#fff",
    padding: 6,
    // paddingVertical: 8,
    // marginTop: 4,
    borderRadius: 5,
    elevation: 1.6,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0.2, height: 0.2 },
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1
  },
  editModalCloseIcon1: {
    backgroundColor: Colors.blue,
    padding: 4,
    paddingVertical: 4,
    width: '50%',
    marginTop: 8,
    borderRadius: 5,
    elevation: 1.6,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0.8, height: 0.3 },
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1
  },
  closeButtonStyle: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },
  inputView1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputView2: {
    marginVertical: 4,
    flexDirection: "row",
    borderColor: '#ddd',
    alignItems: 'center',
    // borderBottomWidth: 0.6,
  },
  inputView3: {
    alignItems: 'center',
  },
});
