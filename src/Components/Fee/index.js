import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const style = StyleSheet.create({});

const PricePolicy = ({}) => {
  return (
    <View style={[style.headerBg, {backgroundColor: bgColor}]}>
      {leftNav}
      {rightNav}
      <Text style={[style.headerText, {color: titleColor}]}>{title}</Text>
    </View>
  );
};

export default PricePolicy;
