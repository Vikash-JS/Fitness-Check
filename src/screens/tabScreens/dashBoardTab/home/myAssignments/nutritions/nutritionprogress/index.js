import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  BarChart
} from 'react-native-chart-kit';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { myWorkoutConstants } from '../WorkoutConstants';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Colors,Fonts } from '../../../../../../../utils/Constants';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
import {Nutrition_Progress_Weekly_Chart } from '../../../../../../../apiManager/nutrition/index';
import Loader from '../../../../../../commonComponents/Loader';

const NutritionProgress = () => {
  const route = useRoute()
  const navigation = useNavigation();
const [graphData,setGraphData] = React.useState({})
const [loader,setLoader] = React.useState(false)

useEffect(()=>
{
  setLoader(true)
  Nutrition_Progress_Weekly_Chart(route?.params?.progressData?.nutritionID).then(res=>
    {
  setGraphData(res?.data?.nutrition)
setLoader(false)
}).catch(err=>
  {
    setGraphData({})
    console.log(err)
    setLoader(false)
      })
},[])

  const MyLineChart = () => {

  console.log('graphData ', graphData);
  const data = {
    labels:graphData[0]?.day,
    datasets: [
      {
        data: graphData[0]?.percentage
      }
    ]
  };
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      fillShadowGradientOpacity: 0.8,
      fillShadowGradient:Colors.black,
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
  style={{borderRadius:10,marginVertical:10}}
  data={data}
  width={screenWidth*0.95}
  height={250}
  yAxisLabel=""
  chartConfig={chartConfig}
  verticalLabelRotation={0}
/>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:Colors.white}}>
      <AppHeader
        Heading="Nutrition Progress"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <View>
         {graphData&&graphData.length>0 ?
        <MyLineChart />: !loader?<EmptyComponent Heading={"No Data Found!"} />:null
          }      
          </View>
        </View>
      </ScrollView>
     
      {loader ? <Loader /> : null}

    </SafeAreaView>
  );
};

export default NutritionProgress;
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
