import React from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../../styles';
import {icon, dev} from '../../../assets';
import {connect} from 'react-redux';

class SplashScreen extends React.Component {
  componentDidMount() {
    this.splash = setTimeout(() => {
      AsyncStorage.getItem('data')
        .then((value) => {
          let res = JSON.parse(value);
          console.log(res, 'ini res');

          if (value != null) {
            if (res.role === 'kasir') {
              this.props.userLogin(res.dataUser);
              this.props.navigation.replace('Cashier');
            } else if (res.role === 'staff') {
              this.props.userLogin(res.dataUser);
              this.props.navigation.replace('Staff');
            } else if (res.role === 'pimpinan') {
              this.props.userLogin(res.dataUser);
              this.props.navigation.replace('Pimpinan');
            }
          } else {
            this.props.navigation.replace('Lobby');
          }
        })
        .catch((error) => console.log(error));
      this.splash = 0;
    }, 4000);
  }

  componentWillUnmount = () => {
    // Is our timer running?
    if (this.splash) {
      // Yes, clear it
      clearTimeout(this.splash);
      this.splash = 0;
    }
  };
  render() {
    return (
      <View>
        <View>
          <View>
            <Image source={icon} style={styles.splashscreen} />
          </View>
          <View style={styles.bg}>
            <Image source={dev} style={styles.dev} />
          </View>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (api) => dispatch({type: 'SET_USER', payload: api}),
  };
};
export default connect(null, mapDispatchToProps)(SplashScreen);
