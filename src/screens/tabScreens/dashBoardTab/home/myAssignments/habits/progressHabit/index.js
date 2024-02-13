import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
import {Habit_Graph} from '../../../../../../../apiManager/habit/index';
import Loader from '../../../../../../commonComponents/Loader';
import moment from 'moment';
import DropDown from '../../../../../../commonComponents/DropDown';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
const screenWidth = Dimensions.get('window').width;
const data = [
  {key: '1', value: 'Last 7 Days'},
  {key: '2', value: 'Last 30 Days'},
];
const habits = [
  {
    _id: '2023-03-25',
    count: 2,
  },
  {
    _id: '2023-03-26',
    count: 1,
  },
  {
    _id: '2023-03-27',
    count: 3,
  },
  {
    _id: '2023-03-28',
    count: 5,
  },
  {
    _id: '2023-03-29',
    count: 3,
  },
  {
    _id: '2023-03-30',
    count: 2,
  },
  {
    _id: '2023-03-31',
    count: 5,
  },
  {
    _id: '2023-03-25',
    count: 2,
  },
  {
    _id: '2023-03-26',
    count: 1,
  },
  {
    _id: '2023-03-27',
    count: 3,
  },
  {
    _id: '2023-03-28',
    count: 5,
  },
  {
    _id: '2023-03-29',
    count: 3,
  },
  {
    _id: '2023-03-30',
    count: 2,
  },
  {
    _id: '2023-03-31',
    count: 5,
  },
];


const ProgressHabitGraph = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [lable, setLable] = useState([]);
  const [graphVal, setGraphVal] = useState([]);

  useEffect(() => {
    let date = new Date();
    let firstDay = moment(date).subtract(7, 'days').format('YYYY-MM-DD');
    let FromDate = moment(firstDay).format('YYYY-MM-DD');
    let EndDate = moment(date).format('YYYY-MM-DD');
    console.log('fromdate==========', FromDate, EndDate);

    HabitGraph(FromDate, EndDate);
  }, []);

  const HabitGraph = (FromDate, EndDate) => {
    setLoader(true);
    Habit_Graph(FromDate, EndDate)
      .then(response => {
        console.log('graphResp======', response);
        if (response.status == 200) {
          setLoader(false);
          let labelArr = [];
          let data = [];
          response?.data?.habits?.forEach(element => {
            data.push(element.count);
            labelArr.push(moment(element._id).format('DD-MMM'));
          });
          setLable(labelArr);
          setGraphVal(data);
          console.log('exlabel========', labelArr);
          console.log('value======', data);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('graphErr========', error);
      });
  };

  const onSelectDropValue = value => {
    if (value == 'Last 7 Days') {
      console.log('SelectedValue=======', value);
      let date = new Date();
      let firstDay = moment().subtract(7, 'days').format('YYYY-MM-DD');
      let FromDate = moment(firstDay).format('YYYY-MM-DD');
      let EndDate = moment(date).format('YYYY-MM-DD');
      console.log('first and last...', FromDate, EndDate);
      HabitGraph(FromDate, EndDate);
    } else {
      let date = new Date();
      let firstDay = moment().subtract(30, 'days').format('YYYY-MM-DD');
      let FromDate = moment(firstDay).format('YYYY-MM-DD');
      let EndDate = moment(date).format('YYYY-MM-DD');
      console.log('Last_30Days=========', FromDate, EndDate);
      HabitGraph(FromDate, EndDate);
    }
  };

  const MyChart = () => {
    // console.log('graphData ', graphData);
    const data = {
      labels: lable,
      datasets: [
        {
          data: graphVal,
        },
      ],
    };
    const screenWidth = Dimensions.get('window').width;
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
          style={{borderRadius: 10, marginVertical: 10}}
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

  const MyLineChart = () => {
    return (
      <>
        {lable.length > 0 && graphVal.length > 0 ? (
          // <Text style={styles.header}>Line Chart</Text>
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: lable,
                // [
                //     'day 1',
                //     'day 2',
                //     'day 3',
                //     'day 4',
                //     'day 5',
                //     'day 6',
                //     'day 7',
                // ],
                datasets: [
                  {
                    data: graphVal,
                    // [20, 45],
                    strokeWidth: 2,
                  },
                ],
              }}
              bezier
              fromZero={true}
              width={lable.length < 6 ? screenWidth - 16 : lable.length * 100}
              height={250}
              // yAxisLabel={'$'}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
        ) : (
          <EmptyComponent Heading={'No Data Found!'} />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader Heading="Habit Progress" onPress={() => navigation.goBack()} />
      <View>
        <DropDown
          data={data}
          setSelected={val => onSelectDropValue(val)}
          defaultOption={{key: '1', value: 'Last 7 Days'}}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View>
            {/* <MyLineChart />
                        
                        */}
            <MyChart />
            {/*Example of Progress Chart*/}
          </View>
        </View>
      </ScrollView>
      {loader ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default ProgressHabitGraph;
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
});
