import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../../styles';
import {iconBack} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

export default function index({title, onPress}) {
  return (
    <>
      <LinearGradient
        start={{x: 0.0, y: 0.8}}
        end={{x: 1, y: 0.9}}
        colors={['#3B1D30', '#3B1D46', '#4c669f']}
        style={styles.HeaderComponent1}>
        <TouchableOpacity onPress={onPress}>
          <Image source={iconBack} style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.fontHeader3}> {title} </Text>
      </LinearGradient>
    </>
  );
}
