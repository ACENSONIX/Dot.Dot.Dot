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
import Header from '../../../components/Header';
import colors from '../../../styles/colors';
import styles from '../../../styles/styles';
import constants from '../../../utility/constants';
import global from '../../../utility/global';
import PrimaryButton from '../../../components/PrimaryButton';

export default function DashboardUser({navigation, route}) {
  const {item} = route.params;
  const [redFlag, setRedFlag] = React.useState(0);
  const [yellowFlag, setYellowFlag] = React.useState(0);
  const [orangeFlag, setOrangeFlag] = React.useState(0);
  const [redFlagDetails, setRedFlagDetails] = React.useState([]);
  const [yellowFlagDetails, setYellowFlagDetails] = React.useState([]);
  const [orangeFlagDetails, setOrangeFlagDetails] = React.useState([]);

  useEffect(() => {
    item.works.map(unit =>
      unit.flags.map(subunit => {
        if (subunit.type === 'Red') {
          setRedFlag(redFlag + 1);
          setRedFlagDetails([...redFlagDetails, subunit]);
        }
        if (subunit.type === 'yellow') {
          setYellowFlag(yellowFlag + 1);
          setYellowFlagDetails([...yellowFlagDetails, subunit]);
        }
        if (subunit.type === 'orange') {
          setOrangeFlag(orangeFlag + 1);
          setOrangeFlagDetails([...orangeFlagDetails, subunit]);
        }
      }),
    ),
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
            source={require('../../../assets/images/cafe.jpg')}
            style={internalStyles.logoOfComment}
            resizeMode="contain"
          />
          <View style={{marginLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={internalStyles.name}>
                {item.company ? item.company : 'Ettarra'}
              </Text>
              <Text style={{fontSize: 12, color: colors.GREY}}>
                {'  '}· {item.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, color: colors.BLACK}}>
                {new Date(item.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              <Text style={{fontSize: 12, color: colors.BLACK}}>
                {'  '}·{'  '}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Present'}
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
    );
  };

  const renderFlags = (title, list) => {
    return (
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
            {title}
          </Text>
        </View>
        <FlatList
          data={list}
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
                {item.reason} -{' '}
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
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
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.styleFull]}>
      <Image
        source={require('../../../assets/images/cafe.jpg')}
        style={{height: 200, width: '100%'}}
      />
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../../assets/images/employee.jpg')}
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
              <Text style={internalStyles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{fontSize: 12, color: colors.GREY}}>
                {'  '}· {item.location}
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
            : {redFlag}
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
            : {yellowFlag}
            {'  '}
          </Text>
          {global.drawIcon(
            constants.IC_MATERIAL_COMMUNITY,
            'flag',
            20,
            'orange',
          )}
          <Text style={{color: 'orange'}}> : {orangeFlag}</Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: colors.BLACK,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
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
          data={item.works}
          renderItem={({item}) => renderComments(item)}
          keyExtractor={item => item.id}
          scrollEnabled={true}
        />
      </View>

      {redFlag > 0 && renderFlags('Red Flags', redFlagDetails)}
      {yellowFlag > 0 && renderFlags('Yellow Flags', yellowFlagDetails)}
      {orangeFlag > 0 && renderFlags('Orange Flags', orangeFlagDetails)}

      <PrimaryButton
        style={{
          marginTop: 10,
          marginBottom: 5,
          width: '95%',
        }}
        title={`+ Add New Flag`}
        onPress={() => {
          // navigate to add new flag screen and send userInfo as param
          navigation.navigate('AddFlag', {userInfo: item});
        }}
      />
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
