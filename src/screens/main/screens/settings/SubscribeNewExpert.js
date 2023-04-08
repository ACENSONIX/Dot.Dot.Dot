import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Header from '../../../../components/Header';
import colors from '../../../../styles/colors';
import styles from '../../../../styles/styles';

const data = [
  {
    id: 1,
    name: 'Dr. A. K. Singh',
    phone: '1234567890',
    image: require('../../../../assets/images/logo.jpg'),
    stars: 5,
    reviews: 10,
    location: 'Kanpur',
  },
  {
    id: 2,
    name: 'Dr. A. K. Singh',
    phone: '1234567890',
    image: require('../../../../assets/images/logo.jpg'),
    stars: 5,
    reviews: 10,
    location: 'Kanpur',
  },
];

export default function SubscribeNewExpert({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={'Subscribe New Expert'}
          showBackButton={true}
          navigation={navigation}
        />
      ),
    });
  }, []);

  const onclick = () => {
    console.log('clicked');
  };

  const renderCard = item => {
    return (
      <Ripple style={internalStyles.card} onPress={() => onclick()}>
        <View style={{flexDirection: 'row', width: '75%'}}>
          <Image source={item.image} style={internalStyles.image} />
          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={internalStyles.name}>{item.name}</Text>
              <Text style={{fontSize: 14, color: colors.GREY, marginLeft: 5}}>
                {' '}
                · {item.location}
              </Text>
            </View>
            <Text style={internalStyles.phone}>{item.phone}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={internalStyles.stars}>Stars : {item.stars}</Text>
              <Text style={internalStyles.reviews}>
                Positive Review : {item.reviews}
              </Text>
            </View>
          </View>
        </View>
      </Ripple>
    );
  };

  return (
    <View
      style={[
        styles.styleFull,
        {
          marginTop: 10,
          paddingHorizontal: 15,
        },
      ]}>
      <FlatList
        data={data}
        renderItem={({item}) => renderCard(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const internalStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  phone: {
    fontSize: 14,
    color: colors.BLACK,
  },
  stars: {
    fontSize: 14,
    color: colors.BLACK,
  },
  reviews: {
    fontSize: 14,
    color: colors.BLACK,
    marginLeft: 5,
  },
});
