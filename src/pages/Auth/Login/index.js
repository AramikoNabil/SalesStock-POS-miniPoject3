import React from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {styles} from '../../../styles';
import {eyeopen, ecyeclose, mail, keyy} from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      email: '',
      password: '',
      isLoading: false,
      rememberMe: false,
      role: '',
      data: '',
    };
  }

  Login = () => {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    if (email !== '' && password !== '') {
      Axios.post('https://mini-project-3a.herokuapp.com/api/login', {
        email: email,
        password: password,
      })
        .then((responseJson) => {
          const api = responseJson.data;
          // console.log(api);
          // // send to redux
          this.props.userLogin(api);

          if (api.token) {
            if (api.role[0] === 'kasir') {
              this.setState({
                isLoading: false,
              });

              let data = {
                role: api.role[0],
                dataUser: api,
              };
              let datajson = JSON.stringify(data);
              if (this.state.rememberMe === true) {
                //user wants to be remembered.
                AsyncStorage.setItem('data', datajson);
              }

              ToastAndroid.show(
                'Login berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              this.props.navigation.replace('Cashier');
            } else if (api.role[0] === 'staff') {
              this.setState({
                isLoading: false,
              });

              let data = {
                role: api.role[0],
                dataUser: api,
              };
              let datajson = JSON.stringify(data);
              if (this.state.rememberMe === true) {
                //user wants to be remembered.
                AsyncStorage.setItem('data', datajson);
              }

              ToastAndroid.show(
                'Login berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              this.props.navigation.replace('Staff');
            } else if (api.role[0] === 'pimpinan') {
              this.setState({
                isLoading: false,
              });

              let data = {
                role: api.role[0],
                dataUser: api,
              };
              let datajson = JSON.stringify(data);
              if (this.state.rememberMe === true) {
                //user wants to be remembered.
                AsyncStorage.setItem('data', datajson);
              }

              ToastAndroid.show(
                'Login berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              this.props.navigation.replace('Pimpinan');
            }
          } else {
            this.setState({isLoading: false});
            // console.log(response.data);
            ToastAndroid.show(
              'Login Gagal Email atau Password Salah',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log(error);
          ToastAndroid.show(
            'Network Error',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        });
    } else {
      this.setState({isLoading: false});
      ToastAndroid.show(
        'Terjadi kesalahan',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  toggleRememberMe = (value) => {
    this.setState({rememberMe: value});
  };

  render() {
    return (
      <ScrollView>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 1, y: 0.9}}
          colors={['#3B1D30', '#3B1D46', '#4c669f']}
          style={styles.Header}>
          <Text style={styles.fontHeader}> Masuk ke Akun Kamu </Text>
        </LinearGradient>
        <View style={styles.container}>
          <View>
            <Text style={styles.fontBody1}>
              Masukkan email dan password akun kamu.{' '}
            </Text>
          </View>
          <KeyboardAvoidingView behavior="position">
            <View>
              <Text style={styles.fontEmail}>Masukkan Email</Text>
            </View>
            <View style={styles.iconInput}>
              <Image style={styles.iconinput1} source={mail} />
              <TextInput
                style={styles.fontInput}
                placeholder="example@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>
            <View>
              <Text style={styles.fontPassword}>Masukkan Password</Text>
            </View>
            <View style={styles.eyePassword}>
              <Image style={styles.iconinput1} source={keyy} />

              <TextInput
                style={styles.fontInputPass}
                underlineColorAndroid="transparent"
                placeholder="Password"
                secureTextEntry={this.state.show}
                onChangeText={(text) => this.setState({password: text})}
              />
              <TouchableWithoutFeedback
                onPress={() => this.setState({show: !this.state.show})}
                style={styles.eyePassword}>
                <Image
                  style={styles.eye}
                  source={this.state.show ? ecyeclose : eyeopen}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.switch}>
              <Text>Remember Me</Text>
              <Switch
                value={this.state.rememberMe}
                onValueChange={(value) => this.toggleRememberMe(value)}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.Login()}>
                {this.state.isLoading ? (
                  <ActivityIndicator
                    color="white"
                    style={styles.ActivityIndicator}
                  />
                ) : (
                  <Text style={styles.buttonText} onPress={() => this.Login()}>
                    Masuk
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={styles.fontForgetPass}
                onPress={() => this.props.navigation.navigate('ResetPassword')}>
                Lupa Password ?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (api) => dispatch({type: 'SET_USER', payload: api}),
  };
};

export default connect(null, mapDispatchToProps)(Login);
