import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Header from '../../../../components/Header';
import colors from '../../../../styles/colors';
import styles from '../../../../styles/styles';
import constants from '../../../../utility/constants';
import global from '../../../../utility/global';

const accountInfo = {
  name: 'Nihal Gupta',
  location: 'Location',
  image: require('../../../../assets/images/logo.jpg'),
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  redFlag: 2,
  yellowFlag: 1,
  orangeFlag: 0,
};

const workDetails = [
  {
    id: 1,
    name: "Company's Name",
    location: 'Location',
    image: require('../../../../assets/images/logo.jpg'),
    startDate: '01/01/2020',
    endDate: '01/01/2020',
    description:
      'Your Idea should be based on the problem statements which will be released by the Hackanova 2.0 Organizing team.',
  },
  {
    id: 2,
    name: "Company's Name",
    location: 'Location',
    image: require('../../../../assets/images/logo.jpg'),
    startDate: '01/01/2020',
    endDate: '01/01/2020',
    description:
      'Your Idea should be based on the problem statements which will be released by the Hackanova 2.0 Organizing team',
  },
  {
    id: 3,
    name: "Compay's Name",
    location: 'Location',
    image: require('../../../../assets/images/logo.jpg'),
    startDate: '01/01/2020',
    endDate: '01/01/2020',
    description:
      'Your Idea should be based on the problem statements which will be released by the Hackanova 2.0 Organizing team',
  },
];

const redFlagDetails = [
  {
    id: 1,
    title: 'Title',
    date: '01/01/2020',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: 2,
    title: 'Title',
    date: '01/01/2020',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
];

export default function EmployeeDetails({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={'Nihal Gupta'}
          showBackButton={true}
          navigation={navigation}
        />
      ),
    });
  }, []);

  const renderComments = item => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: colors.BACKGROUND2,
          marginBottom: 5,
          elevation: 1,
          borderRadius: 3,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Image
            source={item.image}
            style={internalStyles.logoOfComment}
            resizeMode="contain"
          />
          <View style={{marginLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={internalStyles.name}>{item.name}</Text>
              <Text style={{fontSize: 12, color: colors.GREY}}>
                {'  '}· {item.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, color: colors.BLACK}}>
                {item.startDate}
              </Text>
              <Text style={{fontSize: 12, color: colors.BLACK}}>
                {'  '}·{'  '}
                {item.endDate}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            marginTop: 10,
            color: colors.GREY,
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.styleFull]}>
      <Image
        source={require('../../../../assets/sample/late_blight.jpg')}
        style={{height: 200, width: '100%'}}
      />
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={accountInfo.image}
            style={internalStyles.logo}
            resizeMode="contain"
          />
          <View style={{marginLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={internalStyles.name}>{accountInfo.name}</Text>
              <Text style={{fontSize: 12, color: colors.GREY}}>
                {'  '}· {accountInfo.location}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {global.drawIcon(
            constants.IC_MATERIAL_COMMUNITY,
            'flag',
            20,
            colors.RED,
          )}
          <Text style={{color: 'red'}}>
            {' '}
            : {accountInfo.redFlag}
            {'  '}
          </Text>
          {global.drawIcon(
            constants.IC_MATERIAL_COMMUNITY,
            'flag',
            20,
            'yellow',
          )}
          <Text style={{color: 'yellow'}}>
            {' '}
            : {accountInfo.yellowFlag}
            {'  '}
          </Text>
          {global.drawIcon(
            constants.IC_MATERIAL_COMMUNITY,
            'flag',
            20,
            'orange',
          )}
          <Text style={{color: 'orange'}}> : {accountInfo.orangeFlag}</Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: colors.BLACK,
          }}>
          {accountInfo.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ripple
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
              onPress={() => {
                console.log('Share');
              }}>
              {global.drawIcon(
                constants.IC_MATERIAL_COMMUNITY,
                'share',
                20,
                colors.BLACK,
              )}
            </Ripple>
          </View>
        </View>
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 5}}>
        <FlatList
          data={workDetails}
          renderItem={({item}) => renderComments(item)}
          keyExtractor={item => item.id}
          scrollEnabled={true}
        />
      </View>

      {accountInfo.redFlag > 0 && (
        <View style={{paddingHorizontal: 5}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.BLACK,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Red Flags
            </Text>
          </View>
          <FlatList
            data={redFlagDetails}
            renderItem={({item}) => (
              <View
                style={{
                  paddingHorizontal: 15,
                  backgroundColor: colors.BACKGROUND2,
                  marginBottom: 5,
                  elevation: 1,
                  borderRadius: 3,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                    color: colors.BLACK,
                  }}>
                  {item.title} - {item.date}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                    color: colors.GREY,
                  }}>
                  {item.description}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
            scrollEnabled={true}
            style={{paddingBottom: 60}}
          />
        </View>
      )}
    </ScrollView>
  );
}

const internalStyles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'relative',
    top: -15,
    borderColor: colors.BLACK,
    borderWidth: 0.5,
  },
  name: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  logoOfComment: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
