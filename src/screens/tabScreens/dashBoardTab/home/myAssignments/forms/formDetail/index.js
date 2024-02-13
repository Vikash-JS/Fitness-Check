import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { Colors } from '../../../../../../../utils/Constants';
import { styles } from './styles';
import {
  Get_All_Forms,
  Get_Form_Detail,
  Submit_Form,
} from '../../../../../../../apiManager/form/index';
import FlatListHeader from './FlatListHeader';
import { RatingInput } from 'react-native-stock-star-rating';
import SingleButton from '../../../../../../commonComponents/SingleButton';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
import Loader from '../../../../../../commonComponents/Loader';
import FilesCard, {
  FilesCardNew,
} from '../../../../../../commonComponents/FilesCard';
import RNFetchBlob from 'rn-fetch-blob';
const question = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
var multipleParentId;
var scalparentId;

const FormDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [formId, setFormId] = useState(route.params.FormId);
  const [businessId, setBusinessId] = useState(route.params.businessId);
  const [trainerId, setTrainerId] = useState(route.params.TrainerId);
  const [title, setTitle] = useState(route.params.title);
  const [questionList, setQuestionList] = useState([]);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [radioBtn, setRadioBtn] = useState('');
  const [inputValue, setInputValue] = useState({ input: '' });
  const [extraDate, setExtraDate] = useState(new Date());
  const [dummyArr, setDummyArr] = useState([]);
  const [formId1, setFormId1] = useState('');
  const [clientFormId, setClientFormId] = useState('');
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState([]);

  useEffect(() => {
    console.log('routeParams=========', route.params);
    formDetail();
  }, []);

  const updateForm = (answer, parentId) => {
    console.log('ScaleRate=======', answer, parentId);
    let questArr = [...questionList];
    questArr.forEach(element => {
      if (element._id == parentId) {
        element.answer = answer;
      }
    });
    setQuestionList(questArr);
    console.log('QuestionAns========', questArr);
  };
  const updateRadioBtn = (parentId, answer) => {
    console.log('radioRate=======', parentId, answer);
    let questArr = [...questionList];
    questArr.forEach(element => {
      if (element._id == parentId) {
        element.answer = answer;
      }
    });
    console.log('QuestionAns========', questArr);
    setRadioBtn(answer);
    setQuestionList(questArr);
  };

  const updateInput = parentId => {
    console.log('parentId==========', parentId);
    let questArr = questionList;
    questArr.forEach(element => {
      if (element._id == parentId) {
        element.answer = inputValue;
      }
    });
    console.log('QuestionAns========', questArr);
    setQuestionList(questArr);
  };

  const onChangeInput = (text, id) => {
    console.log('textId======', text, id);
    let questArr = questionList;
    questArr.forEach(element => {
      if (element._id == id) {
        element.answer = text;
      }
    });
    console.log('QuestionAns========', questArr);
    setQuestionList([...questArr]);
  };

  const updateMultiple = (optionId, optionName, id) => {
    let questArr = [...questionList];
    let arr1 = [...dummyArr];

    questArr.forEach(element => {
      if (element._id == id) {
        element.options.forEach(element1 => {
          if (element1._id == optionId) {
            if (!element1.ischecked) {
              element1.ischecked = true;
            } else {
              element1.ischecked = false;
            }
          }
        });
      }
    });

    questArr.forEach(element => {
      if (element._id == id) {
        let newArr = [...element.answer];
        console.log('newArr: ', newArr);
        let filter = newArr.includes(optionName);

        if (filter) {
          let index = newArr.indexOf(optionName);
          newArr.splice(index, 1);
        } else {
          newArr.push(optionName);
        }
        element.answer = newArr;
      }
    });

    setDummyArr(arr1);
    setQuestionList(questArr);
    setExtraDate(new Date());
  };

  const updateRating = (rating, parentId) => {
    setRating(rating);
    let questArr = [...questionList];
    questArr.forEach(element => {
      if (element._id == parentId) {
        element.answer = rating;
      }
    });
    setQuestionList(questArr);
  };

  const submitForm = () => {
    let arr1 = questionList;

    arr1.forEach(element => {
      if (element.questionType == 'multiple choice') {
        element.answer = element.answer.join(',');
      }
    });
    let Arr1 = {
      formId: formId1,
      clientFormId: clientFormId,
      questions: arr1,
    };
    let row = JSON.stringify(Arr1);

    Submit_Form(row)
      .then(response => {
        if (response.status == 200) {
          Toaster(response.message);
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log('subFormErr=======', error);
      });
  };

  const formDetail = () => {
    var raw = JSON.stringify({
      trainerId: trainerId,
      businessId: businessId,
    });
    setLoader(true);
    Get_Form_Detail(formId, raw)
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          let all_question = response.data.form.formId.questions;
          all_question.forEach(element => {
            element.answer = '';

            if (element.questionType == 'multiple choice') {
              element.options.forEach(element1 => {
                element1.ischecked = false;
              });
            }
          });
          setFile(response.data.form.formId.file);
          setFormId1(response.data.form.formId._id);
          setClientFormId(response.data.form._id);
          setQuestionList(all_question);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('FormDetailErr========', error);
      });
  };

  const renderScale = ({ item, index }) => {
    let Filter = questionList.filter(i => i._id == item.parentId);
    return (
      <TouchableOpacity
        style={[
          styles.circleView,
          {
            backgroundColor:
              Filter[0]?.answer == item.item.id ? Colors.black : Colors.white,
          },
        ]}
        onPress={() => {
          setUserRating(item.item.id);
          updateForm(item.item.id, item.parentId);
        }}>
        <Text
          style={
            Filter[0]?.answer == item.item.id
              ? styles.bold_10_white
              : styles.bold_10_black
          }>
          {item.item.id}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMultiple = (item, index, id) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <Text style={styles.semiBold_12_black}>{item.option}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          onPress={() => {
            updateMultiple(item._id, item.option, id);
          }}>
          <Image
            source={
              item.ischecked
                ? imagesFile.ic_blueTick
                : imagesFile.ic_recWhiteDot
            }
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    let arrWork = [];
    if (item.questionType == 'scale') {
      scalparentId = item._id;

      let newQuestions = [...question];
      newQuestions.map(i => {
        let obj = {};
        obj.item = i;
        obj.parentId = item._id;
        arrWork.push(obj);
      });
    }
    if (item.questionType == 'multiple choice') {
      multipleParentId = item._id;
    }

    return item.questionType == 'scale' ? (
      <View style={styles.questionView}>
        <View>
          <Text style={styles.bold_14_black}>{item.question}</Text>
        </View>
        <View style={{ marginTop: 14 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={arrWork}
            renderItem={renderScale}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    ) : item.questionType == 'yes or no' ? (
      <View style={styles.questionView}>
        <View>
          <Text style={styles.bold_14_black}>{item.question}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <TouchableOpacity
            style={{
              width: 62,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                questionList[index]?.answer == 'Yes'
                  ? Colors.black
                  : Colors.redGrey,
              borderRadius: 5,
            }}
            onPress={() => {
              updateRadioBtn(item._id, 'Yes');
            }}>
            <Text style={styles.semiBold_14_white}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 9,
              width: 62,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                questionList[index]?.answer == 'No'
                  ? Colors.black
                  : Colors.redGrey,
              borderRadius: 5,
            }}
            onPress={() => {
              updateRadioBtn(item._id, 'No');
            }}>
            <Text style={styles.semiBold_14_white}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : item.questionType == 'text input' ? (
      <View style={styles.questionView}>
        <View>
          <Text style={styles.bold_14_black}>{item.question}</Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.semiBold_10_black}>Type your answer</Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            padding: 16,
            backgroundColor: Colors.white,
            marginTop: 8,
          }}>
          <TextInput
            textAlignVertical="top"
            multiline={true}
            value={item.answer}
            style={{ textAlignVertical: 'top', height: 160, borderRadius: 10 }}
            onChangeText={text => onChangeInput(text, item._id)}
            placeholder="Type your answer"
            blurOnSubmit={true}
          />
        </View>
      </View>
    ) : item.questionType == 'multiple choice' ? (
      <View style={styles.questionView}>
        <View>
          <Text style={styles.bold_14_black}>{item.question}</Text>
        </View>
        <FlatList
          data={item.options}
          renderItem={({ item, index }) =>
            renderMultiple(item, index, multipleParentId)
          }
          keyExtractor={item => item.id}
          extraData={extraDate}
        />
      </View>
    ) : item.questionType == 'opinion rating' ? (
      <View style={styles.questionView}>
        <View>
          <Text style={styles.bold_14_black}>{item.question}</Text>
        </View>
        <View>
          <RatingInput
            rating={questionList[index]?.answer ?? 0}
            setRating={rating => updateRating(rating, item._id)}
            size={50}
            stars={0}
            maxStars={5}
            bordered={false}
          />
        </View>
      </View>
    ) : null;
  };

  const downloadFiles = uri => {
    const { config, fs } = RNFetchBlob;
    let extension = uri.split('.').pop();
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
          Toaster('File downloaded successfully');
          setTimeout(() => {
            RNFetchBlob.ios.openDocument(res.data);
          }, 1000);
        })
        .catch(errorMessage => {
          console.log('ErrorMsg====', errorMessage);
        });
    } else {
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

  const renderItems = ({ item }) => {
    console.log('item:-- ', item);
    return (
      <TouchableOpacity
        onPress={() =>
          item?.filePath
            ? downloadFiles(item.filePath)
            : Toaster('Not a valid file while trying to download')
        }>
        <FilesCardNew item={item} />
      </TouchableOpacity>
    );
  };
  const Footer = () => {
    return (
      <>
        {file?.length > 0 ? <><Text
          style={[
            styles.bold_14_black,
            { fontSize: 16, marginLeft: 20, paddingVertical: 10 },
          ]}>
          Files
        </Text>
          <FlatList
            data={file}
            renderItem={renderItems}
            keyExtractor={item => item.id}
            style={{ paddingBottom: 20 }}
            ListEmptyComponent={<EmptyComponent Heading={'Empty Files!'} />}
          /></> : null}
        {questionList.length > 0 ? (
          <SingleButton name="Done" onPress={() => submitForm()} />
        ) : null}
        <View style={{ height: 80 }}></View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <FlatList
        data={questionList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<FlatListHeader title={title} />}
        ListFooterComponent={<Footer />}
        ListEmptyComponent={
          !loader &&
          !questionList.length && <EmptyComponent Heading={'No date found!'} />
        }
      />
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default FormDetailScreen;
