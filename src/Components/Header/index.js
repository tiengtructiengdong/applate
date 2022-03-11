import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

const style = StyleSheet.create({
  headerBg: {
    height: 47,
    margin: 0,
    flexDirection: 'row',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerLeftNav: {},
});

const NavArea = styled.View`
  width: 54px;
  align-items: center;
  padding-top: 7px;
`;
const NavButton = styled.TouchableOpacity``;

export function Header({
  bgColor = '#d1d1d1',
  titleColor = '#000000',
  title,
  goBack,
  goRight,
  iconRight = 'print-outline',
  bright = false,
  isLoading = false,
}) {
  return (
    <View style={[style.headerBg, {backgroundColor: bgColor}]}>
      <NavArea>
        {goBack ? (
          <NavButton style={style.headerLeftNav} onPress={goBack}>
            <Icon
              name="arrow-back-outline"
              size={30}
              color={bright ? '#ffffff' : '#000000'}
            />
          </NavButton>
        ) : (
          <></>
        )}
      </NavArea>
      <Text style={[style.headerText, {color: titleColor}]}>{title}</Text>
      <NavArea>
        {isLoading ? (
          <ActivityIndicator color="black" style={{paddingTop: 6}} />
        ) : goRight ? (
          <TouchableOpacity
            size="large"
            style={style.headerRightNav}
            onPress={goRight}>
            <Icon
              name={iconRight}
              size={30}
              color={bright ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </NavArea>
    </View>
  );
}
