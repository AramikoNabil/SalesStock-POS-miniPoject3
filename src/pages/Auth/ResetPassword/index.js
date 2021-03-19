import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {mail} from '../../../assets';
import {styles} from '../../../styles';
// import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  //   Get Api Users
  forgetPass = async () => {
    this.setState({isLoading: true});
    if (this.state.email !== '') {
      this.setState({
        email: '',
      });
      this.setState({isLoading: false});

      Linking.openURL('https://mini-project-3a.herokuapp.com/password/reset');
    } else {
      ToastAndroid.show('Isi Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.setState({isLoading: false});
    }
  };

  render() {
    return (
      <>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 1, y: 0.9}}
          colors={['#3B1D30', '#3B1D46', '#4c669f']}
          style={styles.Header}>
          <Text style={styles.fontHeader}> Kamu Lupa Password? </Text>
        </LinearGradient>
        <View style={styles.container}>
          <View>
            <Text style={styles.fontBody1}>
              Eh tenang saja, kamu bisa masukin email buat Reset password
            </Text>
          </View>
          <View>
            <Text style={styles.fontEmail}>Email</Text>
          </View>
          <View style={styles.iconInput}>
            <Image style={styles.iconinput1} source={mail} />
            <TextInput
              style={styles.fontInput}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.forgetPass()}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  color="white"
                  style={styles.ActivityIndicator}
                />
              ) : (
                <Text
                  style={styles.buttonText}
                  onPress={() => this.forgetPass()}>
                  Reset Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default ResetPassword;
