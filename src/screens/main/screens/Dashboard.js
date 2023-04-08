import React, {useEffect} from 'react';

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  FlatList,
} from 'react-native';
import Header from '../../../components/Header';
import colors from '../../../styles/colors';
import styles from '../../../styles/styles';
import constants from '../../../utility/constants';
import fonts from '../../../utility/fonts';
import global from '../../../utility/global';
import messaging from '@react-native-firebase/messaging';
import {Dropdown} from 'react-native-element-dropdown';
import {BarChart} from 'react-native-chart-kit';
import setOfStrings from '../../../utility/screenStrings';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
var PushNotification = require('react-native-push-notification');

const recentPrecautionData = [
  {
    date: '12/12/2020',
    title: 'Precaution 1',
    crop: 'Tomato',
    disease: 'Late Blight',
    precautions: 'do this and that',
    image: require('../../../assets/sample/late_blight.jpg'),
  },
  {
    date: '12/12/2020',
    title: 'Precaution 2',
    crop: 'Tomato',
    disease: 'Late Blight',
    precautions: 'do this and that',
    image: require('../../../assets/sample/late_blight.jpg'),
  },
];

export default function Dashboard({navigation}) {

  const [checkVideo, setCheckVideo] = React.useState(false);
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={setOfStrings.hey + ' ' + 'Username'}
          showBackButton={false}
          navigation={navigation}
          endRippleIcon={'phone-call'}
          endRippleIconType={constants.IC_FEATHER}
          endRippleClick={() => openCall()}
          endRippleText={setOfStrings.tutorial}
          endRippleTextCLick={() => openTutorial()}
        />
      ),
    });
    PushNotification.createChannel(
      {
        channelId: 'com.storeinsta.com', // (required)
        channelName: 'StoreInsta_Admin', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION test:', notification);

        handleNotificationClick(notification.data);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        // process the action
      },
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    global.registerFCM();
    requestUserPermission();
    setUpFirebase();
  }, []);

  const openTutorial = () => {
    setCheckVideo(!checkVideo);
  };

  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  };

  const setUpFirebase = async () => {
    refreshTokenListener();
    onNotifyForeground();
    onNotifyInitial();
  };

  const onNotifyForeground = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('onNotifyForeground: ' + JSON.stringify(remoteMessage));
      //navigateTo('Notification')
      const {title, body} = remoteMessage.notification;
      var data = {};
      if (remoteMessage.data) data = remoteMessage.data;
      showNotification(title, body, data);
    });
  };
  const onNotifyInitial = () => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Notification caused app to open from background state:');
      handleNotificationClick(remoteMessage.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          handleNotificationClick(remoteMessage.data);
        }
      });
  };
  const handleNotificationClick = notification => {
    console.log('handleNotificationClick: ' + JSON.stringify(notification));
    return;

    // if (global.isEmptyObject(state.user)) {
    //   navigateTo('OnBoard', notification);
    //   return;
    // }

    if (notification && notification.type) {
      switch (notification.type) {
        // case "1":
        //   props.navigation.navigate("ProductDetail", {
        //     [constants.PARAM_PRODUCT]: notification.id ? {
        //       productId: notification.id
        //     } : null,
        //   })
        //   break;

        case '2':
          props.navigation.navigate('OrderDetails', {
            [constants.PARAM_ORDER_ID]: notification.id
              ? notification.id
              : null,
          });
          break;
        default:
          break;
      }
    }
  };

  const refreshTokenListener = () => {
    messaging().onTokenRefresh(fcmToken => {
      console.log('registerFCM refresh: ' + JSON.stringify(fcmToken));
    });
  };

  const showNotification = (title, message, data) => {
    PushNotification.localNotification({
      title: title,
      message: message,
      data: data,
    });
  };

  const renderRecentPrecautions = item => {
    return (
      <View style={internalStyles.recentPrecautionsItem}>
        <View style={internalStyles.recentPrecautionsItemLeft}>
          <Image
            source={item.image}
            style={internalStyles.recentPrecautionsItemImage}
          />
        </View>
        <View style={internalStyles.recentPrecautionsItemRight}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={internalStyles.title}>{item.title}</Text>
            <Text style={{fontSize: 12}}>
              {'  '}· {item.date}
            </Text>
          </View>
          <Text style={internalStyles.crop}>{item.crop}</Text>
          <Text style={{color: colors.GREY}}>{item.disease}</Text>
          <Text style={{color: colors.GREY}}>{item.precautions}</Text>
        </View>
      </View>
    );
  };

  const openCall = () => {
    Linking.openURL('tel:123456789');
  };

  const rederRectangle = (title, value, img) => {
    return (
      <View style={internalStyles.rectangle}>
        <Text style={internalStyles.rectangleTitle}>{title}</Text>
        <View style={internalStyles.imageAndValue}>
          <View style={{width: '30%'}}>
            <Image source={img} style={internalStyles.rectangleImage} />
          </View>
          <View style={{width: '70%'}}>
            <Text style={internalStyles.rectangleValue}>{value}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.styleFull, {paddingHorizontal: 15, paddingTop: 10}]}
      showsVerticalScrollIndicator={false}>
      <View>
        {checkVideo && (
          <View style={internalStyles.video}>
            <VideoPlayer
              controls={true}
              source={require('../../../assets/video/Tutorial.mp4')}
              style={internalStyles.videoplayer}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={internalStyles.home}>
          <Text style={internalStyles.header}>{setOfStrings.overview}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            {rederRectangle(
              setOfStrings.totalCrops,
              '1000',
              require('../../../assets/images/totalcrops.png'),
            )}
            {rederRectangle(
              setOfStrings.totalFarmArea,
              '1000',
              require('../../../assets/images/farmarea.png'),
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            {rederRectangle(
              setOfStrings.totalDiseasedCrop,
              '1000',
              require('../../../assets/images/diseasedcrops.png'),
            )}
            {rederRectangle(
              setOfStrings.totalProduction,
              '1000',
              require('../../../assets/images/totalproduction.png'),
            )}
          </View>
        </View>
      </View>
      <View style={internalStyles.earningAndSales}>
        <View style={internalStyles.home}>
          <Text style={internalStyles.header}>
            {setOfStrings.productionDetails}
          </Text>
        </View>
        <View style={{flex: 1, padding: 5, alignItems: 'center'}}>
          <BarChart
            style={{
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            height={180}
            data={{
              labels: [
                setOfStrings.jan,
                setOfStrings.feb,
                setOfStrings.mar,
                setOfStrings.apr,
                setOfStrings.may,
                setOfStrings.jun,
              ],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            bezier
            fromZero={true}
            yLabelsOffset={30}
            withInnerLines={false}
            svg={{fill: colors.PRIMARY}}
            chartConfig={{
              fillShadowGradient: colors.PRIMARY,
              backgroundColor: colors.WHITE,
              backgroundGradientFrom: colors.WHITE,
              barPercentage: 0.7,
              backgroundGradientTo: colors.WHITE,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForBackgroundLines: {
                stroke: colors.BLACK,
                opacity: 0.3,
              },
              propsForLabels: {
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
            width={Dimensions.get('window').width - 40}
          />
        </View>
      </View>
      <View styles={internalStyles.recentPrecaution}>
        <View
          style={[internalStyles.home, {paddingVertical: 0, paddingTop: 15}]}>
          <Text style={internalStyles.header}>
            {setOfStrings.recentPrecautions}
          </Text>
        </View>
        <FlatList
          data={recentPrecautionData}
          renderItem={({item}) => renderRecentPrecautions(item)}
          keyExtractor={item => item.id}
          style={{paddingBottom: 10}}
        />
      </View>
    </ScrollView>
  );
}

const internalStyles = StyleSheet.create({
  video: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    marginBottom: 10,
  },
  videoplayer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  header: {
    color: colors.BLACK,
    fontWeight: '700',
    fontSize: fonts._12,
  },
  earningAndSales: {
    flex: 1,
  },
  home: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rectangle: {
    padding: 10,
    width: '48%',
    height: 100,
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    elevation: 1,
  },
  rectangleTitle: {
    color: colors.BLACK,
    fontWeight: '400',
    fontSize: fonts._9,
  },
  imageAndValue: {
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  rectangleValue: {
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: fonts._22,
  },
  recentPrecaution: {
    flex: 1,
  },
  recentPrecautionsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    elevation: 1,
    marginVertical: 5,
  },
  recentPrecautionsItemLeft: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentPrecautionsItemRight: {
    width: '80%',
  },
  recentPrecautionsItemImage: {
    width: 100,
    height: 80,
    marginRight: 5,
  },
  title: {
    color: colors.BLACK,
    fontWeight: '800',
    fontSize: 14,
  },
  crop: {
    color: colors.BLACK,
    fontWeight: '500',
  },
});
