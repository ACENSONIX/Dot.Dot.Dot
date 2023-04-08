import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import Header from '../../../../components/Header';
import colors from '../../../../styles/colors';
import styles from '../../../../styles/styles';
import constants from '../../../../utility/constants';
import fonts from '../../../../utility/fonts';
import global from '../../../../utility/global';

const list = [
  {
    id: 1,
    title: '2 Month Expert Offer Plan',
    currentPrice: 'Rs 100',
    originalPrice: 200,
    firstBenefit: 'All Standard Plan Features',
    secondBenefit: 'All Pro Plan Features',
    thirdBenefit: 'Free Website and Android Mobile App',
    fourthBenefit: 'IOS Premium Plan At 4499 At Discounted Price For 2 Months',
    isCollapsible: true,
  },
  {
    id: 2,
    title: '4 Month Expert Offer Plan',
    currentPrice: 'Rs 100',
    originalPrice: 200,
    firstBenefit: 'All Standard Plan Features',
    secondBenefit: 'All Pro Plan Features',
    thirdBenefit: 'Free Website and Android Mobile App',
    fourthBenefit: 'IOS Premium Plan At 4499 At Discounted Price For 2 Months',
    isCollapsible: true,
  },
  {
    id: 3,
    title: '1 Year Expert Offer Plan',
    currentPrice: 'Rs 100',
    originalPrice: 200,
    firstBenefit: 'All Standard Plan Features',
    secondBenefit: 'All Pro Plan Features',
    thirdBenefit: 'Free Website and Android Mobile App',
    fourthBenefit: 'IOS Premium Plan At 4499 At Discounted Price For 2 Months',
    isCollapsible: true,
  },
  {
    id: 4,
    title: 'Only Expert Advice Plan',
    currentPrice: 'Rs 100',
    originalPrice: 200,
    firstBenefit: 'All Standard Plan Features',
    secondBenefit: 'All Pro Plan Features',
    thirdBenefit: 'Free Website and Android Mobile App',
    fourthBenefit: 'IOS Premium Plan At 4499 At Discounted Price For 2 Months',
    isCollapsible: true,
  },
];

export default function CurrentPlan({navigation}) {
  const [isCollapsible, setCollapsible] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={'Current Plan'}
          showBackButton={true}
          navigation={navigation}
        />
      ),
    });
  }, []);

  const renderBenefits = text => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 5,
        }}>
        <View style={{width: '15%', alignContent: 'flex-start'}}>
          <Image
            source={require('../../../../assets/images/greenTick.png')}
            style={internalstyles.image}
          />
        </View>
        <View style={{width: '80%'}}>
          <Text style={internalstyles.benefitText}>{text}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[
        styles.styleFull,
        {
          paddingHorizontal: 22,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={internalstyles.whiteBgView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={internalstyles.titleText}>Current Active Plan: </Text>
          <Text style={internalstyles.greenText}>2 Month Offer Plan</Text>
        </View>
        <View style={internalstyles.hrLine} />
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <Text style={internalstyles.toFromKey}>From: </Text>
            <Text style={internalstyles.toFromValue}>2021-10-12</Text>
          </View>
          <View style={{flexDirection: 'row', width: '30%'}}>
            <Text style={internalstyles.toFromKey}>To: </Text>
            <Text style={internalstyles.toFromValue}>2021-12-12</Text>
          </View>
        </View>

        <View style={internalstyles.hrLine} />
        <View style={{flexDirection: 'row'}}>
          <Text style={internalstyles.titleText}>Current Expert: </Text>
          <Text style={internalstyles.greenText}>Dr. A. K. Singh</Text>
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={internalstyles.headerText}>Available Plans</Text>
      </View>
      {list.map((item, index) => {
        return (
          <View
            style={{
              backgroundColor: colors.WHITE,
              marginBottom: 4,
              borderRadius: 4,
            }}>
            <Ripple
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 18,
                paddingVertical: 12,
              }}
              onPress={() => {
                let temp = list;
                temp[index].isCollapsible = !temp[index].isCollapsible;
                setCollapsible(!isCollapsible);
              }}>
              <View style={{width: '90%'}}>
                <Text style={internalstyles.titleText}>{item.title}</Text>
              </View>
              {item.isCollapsible ? (
                <View>
                  {global.drawIcon(
                    constants.IC_FEATHER,
                    'chevron-down',
                    20,
                    colors.BLACK,
                  )}
                </View>
              ) : (
                <View>
                  {global.drawIcon(
                    constants.IC_FEATHER,
                    'chevron-up',
                    20,
                    colors.BLACK,
                  )}
                </View>
              )}
            </Ripple>
            {!item.isCollapsible && (
              <View
                style={[
                  internalstyles.hrLine,
                  {width: '90%', alignSelf: 'center'},
                ]}
              />
            )}
            <Collapsible collapsed={item.isCollapsible}>
              <View style={internalstyles.collapsibleView}>
                <View style={{width: '80%', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={internalstyles.priceText}>
                      {item.currentPrice}{' '}
                    </Text>
                    <Text style={internalstyles.priceTextMonth}>/Monthly</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={internalstyles.originalPrice}>
                      Original Price:{'  '}
                    </Text>
                    <Text
                      style={{
                        color: colors.BLACK,
                        fontFamily: fonts.FONT_FAMILY.Medium,
                        fontSize: fonts._11,
                      }}>
                      {item.originalPrice} /Monthly
                    </Text>
                  </View>
                  <View style={internalstyles.greenHrLine} />
                  {renderBenefits(item.firstBenefit)}
                  {renderBenefits(item.secondBenefit)}
                  {renderBenefits(item.thirdBenefit)}
                  {renderBenefits(item.fourthBenefit)}
                </View>
              </View>
            </Collapsible>
          </View>
        );
      })}
    </ScrollView>
  );
}

const internalstyles = StyleSheet.create({
  whiteBgView: {
    backgroundColor: colors.WHITE,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  titleText: {
    fonstSize: 12,
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.Regular,
  },
  greenText: {
    fonstSize: 12,
    color: colors.PRIMARY,
    fontFamily: fonts.FONT_FAMILY.SemiBold,
    fontWeight: '700',
  },
  hrLine: {
    height: 0.5,
    backgroundColor: colors.GREY,
    marginVertical: 10,
  },
  toFromKey: {
    fonstSize: 10,
    color: colors.GREY,
    fontFamily: fonts.FONT_FAMILY.Regular,
  },
  toFromValue: {
    fonstSize: 10,
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.Medium,
    fontWeight: '600',
  },
  headerText: {
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.SemiBold,
    fontWeight: '700',
    fontSize: 18,
  },
  collapsibleView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  priceText: {
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.SemiBold,
    fontWeight: '700',
    fontSize: fonts._20,
  },
  priceTextMonth: {
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.Medium,
    fontWeight: '600',
    fontSize: fonts._9,
  },
  greenHrLine: {
    height: 3,
    backgroundColor: colors.PRIMARY,
    width: '65%',
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  benefitText: {
    color: colors.BLACK,
    fontFamily: fonts.FONT_FAMILY.Regular,
    fontSize: fonts._12,
  },
});
