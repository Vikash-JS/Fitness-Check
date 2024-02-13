import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {
  LineChart,
  BarChart
} from 'react-native-chart-kit';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { myWorkoutConstants } from '../WorkoutConstants';
import { useNavigation } from '@react-navigation/native';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
import { CheckWorkoutWeeklyProgress } from '../../../../../../../apiManager/workout/index';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import Loader from '../../../../../../commonComponents/Loader';
import DropShadow from 'react-native-drop-shadow';
import moment from 'moment';

const Workout_Progress = (props) => {
  const navigation = useNavigation();
  const [workoutProgress, setWorkoutProgress] = React.useState({})
  const [loader, setLoader] = React.useState(false)

  useEffect(() => {
    setLoader(true)
    let workout_id = props?.route?.params?.progressData?.workoutID
    CheckWorkoutWeeklyProgress(workout_id).then(res => {
      console.log("res**", res)
      setWorkoutProgress(res?.data?.workout)
      setLoader(false)
    }).catch(err => {
      console.log("error", err)
      setLoader(false)
    })
  }, [])

  const MyLineChart = () => {

    console.log('workoutProgress ', workoutProgress);
    const data = {
      labels: workoutProgress[0]?.day,
      datasets: [
        {
          data: workoutProgress[0]?.percentage
        }
      ]
    };

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      fillShadowGradientOpacity: 0.8,
      fillShadowGradient: Colors.black,
      backgroundGradientFromOpacity: 0.15,
      backgroundGradientToOpacity: 0.1,
      backgroundColor: Colors.black,
      backgroundGradientFrom: Colors.black,
      backgroundGradientTo: Colors.black,
      backgroundGradientToOpacity: 0.01,
      color: () => `rgb(0, 0, 0)`,
      barPercentage: 0.75,
      useShadowColorFromDataset: false,

    };
    return (
      <>
        <BarChart
          fromZero
          showValuesOnTopOfBars
          withInnerLines={false}
          showBarTops={false}
          segments={4}
          style={{ borderRadius: 10, marginVertical: 10 }}
          data={data}
          width={screenWidth * 0.95}
          height={250}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.bmrHeading}>
          <Text style={styles.semiBold_15_black}>{'Date'}</Text>
          <Text style={[styles.semiBold_15_black, { marginLeft: 15 }]}>
            {'Percentage'}
          </Text>
          {/* <Text style={styles.semiBold_15_black}>{'Remove'}</Text> */}
        </View>

        <DropShadow style={styles.shadowProp}>
          <View style={styles.mainContainer}>
            <Text style={styles.Regular15_black}>
              {item?._id?.date}
              {/* {moment(item?.createdAt).format('DD MMMM YY')} */}
            </Text>
            <Text style={[styles.Regular15_black, { marginLeft: -15 }]}>{item?.percentage}%</Text>
          </View>
        </DropShadow>
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <AppHeader
        Heading="Workout Progress"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>

          <FlatList
            data={workoutProgress}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              !loader && <EmptyComponent Heading={'No History Found!'} />
            }
          />
          <View>
            {/* {
              workoutProgress && workoutProgress.length > 0 ? <MyLineChart /> : <EmptyComponent Heading={"No Data Found!"} />
            } */}

          </View>
          {loader && <Loader />}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Workout_Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: '85%'

  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 7,
    marginTop: 10,
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 18,
  },
  Regular15_black: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 15,
    color: Colors.black,
  },
  semiBold_15_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 15,
    color: Colors.black,
  },
  bmrHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    padding: 10,
    width: '75%'
  },
});
