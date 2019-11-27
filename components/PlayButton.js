import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Dimens from '../constants/dimens';
import Colors from '../constants/colors';

export default class PlayButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          borderRadius: Dimens.playButtonBorderRadius,
          width: Dimens.playButtonWidth,
          height: Dimens.playButtonHeight,
          backgroundColor: Colors.playButtonBg,
          marginVertical: Dimens.playButtonMarginVertical,
          justifyContent: 'center',
        }}
        onPress={this.props.click}>
        <View>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontSize: Dimens.playButtonFontSize,
            }}>
            Play Again
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
