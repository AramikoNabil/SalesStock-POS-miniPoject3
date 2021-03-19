import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../../styles';

import LinearGradient from 'react-native-linear-gradient';
import Carousel from '../../../component/Swiper';

class GetStarted extends React.Component {
  render() {
    return (
      <>
        <Carousel />
        {/* <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text>Ini Nanti Swiper</Text>
        </View> */}
        <View style={styles.viewButtonAtas}>
          <LinearGradient
            start={{x: 0.0, y: 0.8}}
            end={{x: 1, y: 0.9}}
            colors={['#3B1D30', '#3B1D46', '#4c669f']}
            style={styles.viewButton}>
            <View>
              <Text style={styles.fontIntro}>
                Sales<Text style={styles.ColorWhite}>Stock</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonIntro}
              onPress={() => this.props.navigation.replace('Login')}>
              <Text
                style={styles.buttonText1}
                onPress={() => this.props.navigation.replace('Login')}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </>
    );
  }
}

export default GetStarted;
