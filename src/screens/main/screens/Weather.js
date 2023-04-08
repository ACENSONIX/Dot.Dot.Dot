import React, {useEffect} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../styles/colors';
import constants from '../../../utility/constants';
import global from '../../../utility/global';

const data = [
  {
    id: 1,
    day: 'Monday',
    temp: 20,
    weather: 'Sunny',
  },
  {
    id: 2,
    day: 'Tuesday',
    temp: 21,
    weather: 'Sunny',
  },
  {
    id: 3,
    day: 'Wednesday',
    temp: 22,
    weather: 'Sunny',
  },
  {
    id: 4,
    day: 'Thursday',
    temp: 23,
    weather: 'Sunny',
  },
  {
    id: 5,
    day: 'Friday',
    temp: 24,
    weather: 'Sunny',
  },
  {
    id: 6,
    day: 'Saturday',
    temp: 25,
    weather: 'Sunny',
  },
  {
    id: 7,
    day: 'Sunday',
    temp: 26,
    weather: 'Sunny',
  },
];

export default function Weather() {
  const [weatherData, setWeatherData] = React.useState({"time": 1674235744, "lat": 12, "lng": 77, "summary": "Clear", "icon": "clear-night", "temperature": 63.32, "apparentTemperature": 63.32, "dewPoint": 54.38, "humidity": 0.73, "pressure": 1015.4, "windSpeed": 4.51, "windGust": 4.75, "windBearing": 117, "cloudCover": 0.31, "uvIndex": 0, "precipIntensity": 0, "precipProbability": 0, "visibility": 10, "ozone": 248.3});
  const [flag, setFlag] = React.useState(0);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'x-api-key',
      'ad05e637d0b003f45a2f9053cf0de277be05f945e7c415f99754d1b220f5dc8a',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        var temp=JSON.parse(result)
        setWeatherData(temp.data);
        setFlag(1);
      })
      .catch(error => console.log('error', error));
  };

  const backgroundColorIs = () => {
    if (weatherData.summary == 'Sunny') {
      return '#FFD700';
    } else if (weatherData.summary == 'Partly Cloudy') {
      return '#808080';
    } else if (weatherData.summary == 'Rainy') {
      return '#0000FF';
    } else if (weatherData.summary == 'Snowy') {
      return '#FFFFFF';
    } else if (weatherData.summary == 'Windy') {
      return '#FFA500';
    } else if (weatherData.summary == 'Foggy') {
      return '#808080';
    } else if (weatherData.summary == 'Hazy') {
      return '#808080';
    } else {
      return '#0000FF';
    }
  };

  const getWeatherIcon = () => {
    if (weatherData.summary == 'Sunny') {
      return 'sun';
    } else if (weatherData.summary == 'Partly Cloudy') {
      return 'cloud';
    } else if (weatherData.summary == 'Rainy') {
      return 'cloud-rain';
    } else if (weatherData.summary == 'Snowy') {
      return 'cloud-snow';
    } else if (weatherData.summary == 'Windy') {
      return 'cloud-drizzle';
    } else if (weatherData.summary == 'Foggy') {
      return 'cloud-lightning';
    } else if (weatherData.summary == 'Hazy') {
      return 'cloud-off';
    } else {
      return 'cloud';
    }
  };

  const getKeyValue = (key, value) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColorIs(),
          padding: 10,
          margin: 10,
          borderRadius: 10,
          opacity: 0.6,
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
          {key}
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={[backgroundColorIs(), '#FFFFFF']}
        style={{flex: 1, height: 300}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>
            Location
          </Text>
          {global.drawIcon(constants.IC_FEATHER, getWeatherIcon(), 100, '#FFFFFF')}
          <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>
            {weatherData.summary}
          </Text>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
            {weatherData.temperature}°C
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
          marginTop: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>
          Weather Details:
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {getKeyValue('Humidity', weatherData.humidity)}
        {getKeyValue('Pressure', weatherData.pressure)}
        {getKeyValue('Visibility', weatherData.visibility)}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {getKeyValue('Wind', weatherData.windSpeed)}
        {getKeyValue('UV', weatherData.uvIndex)}
        {getKeyValue('Dew', weatherData.dewPoint)}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>
          Crop Care Tips:
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
          backgroundColor: colors.WHITE,
          elevation: 2,
          padding: 5,
          paddingHorizontal: 10,
          margin: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'justify',
          }}>
          Proper soil preparation: Ensure the soil is well-drained and has the appropriate pH level for the type of crop you are growing.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
          backgroundColor: colors.WHITE,
          elevation: 2,
          padding: 5,
          paddingHorizontal: 10,
          margin: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'justify',
          }}>
          Fertilization: Use the appropriate type and amount of fertilizer for your crop, and follow the recommended application schedule.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
          backgroundColor: colors.WHITE,
          elevation: 2,
          padding: 5,
          paddingHorizontal: 10,
          margin: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'justify',
          }}>
          Proper storage : to maintain the quality and prolong the shelf life of your crops, store them properly to prevent spoilage.
        </Text>
      </View>
    </ScrollView>
  );
}
