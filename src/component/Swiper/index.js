import React, {Component} from 'react';
import {AppRegistry, View, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
let width = Dimensions.get('window').width;

const styles = {
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  image: {
    width: width,

    flex: 1,
    alignSelf: 'center',
  },
};
export default class Carousel extends Component {
  render() {
    return (
      <Swiper automaticallyAdjustContentInsets autoplay>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/image1.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/image2.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/image3.jpg')}
            style={styles.image}
          />
        </View>
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('myproject', () => Carousel);
