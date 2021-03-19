import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {styles} from '../../../styles';
import Axios from 'axios';
import {person, call} from '../../../assets';
import Header from '../../../component/header';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      nama: '',
      no_hp: '',
      data: {},
      isLoading: false,
      showModal: false,
    };
  }

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };

  Register = () => {
    this.setState({isLoading: true});
    const {nama, no_hp} = this.state;
    if (nama !== '' && no_hp !== '') {
      Axios.post(
        'https://mini-project-3a.herokuapp.com/api/register-member',
        {
          no_hp: no_hp,
          nama: nama,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      )
        .then((responseJson) => {
          const api = responseJson.data.member;
          console.log(api);

          this.setState({data: api, nama: '', no_hp: '', isLoading: false});

          ToastAndroid.show(
            'Daftar berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this._handleButtonPress();
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log(error);
          ToastAndroid.show('Gagal', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
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

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Registrasi Member " />
          <LottieView
            source={require('../../../assets/icon/loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    const onPress = () => {
      this.props.navigation.goBack();
    };
    return (
      <>
        <Header title="Registrasi Member" onPress={onPress} />
        <View style={styles.container}>
          <View>
            <Text style={styles.fontEmail1}>Nama</Text>
          </View>
          <View style={styles.iconInput}>
            <Image style={styles.iconinput2} source={person} />
            <TextInput
              style={styles.fontInputPw}
              placeholder="example"
              keyboardType="default"
              onChangeText={(text) => this.setState({nama: text})}
            />
          </View>

          <View>
            <Text style={styles.fontPassword}>Telepon</Text>
          </View>
          <View style={styles.iconInput}>
            <Image style={styles.iconinput2} source={call} />
            <TextInput
              style={styles.fontInputPw}
              placeholder="+628"
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({no_hp: text})}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.Register()}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  color="white"
                  style={styles.ActivityIndicator}
                />
              ) : (
                <Text style={styles.buttonText} onPress={() => this.Register()}>
                  Daftar
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.fontTermofuse}>
              By clicking sign up you are agreeing to the{'          '}
              <Text style={styles.textSignUp}>
                {'               '}
                Term of use{' '}
                <Text style={styles.fontTermofuse}>
                  and the <Text style={styles.textSignUp}>Privacy policy</Text>
                </Text>
              </Text>
            </Text>
          </View>
          {/* <Text onPress={this._handleButtonPress}>xx</Text> */}
          <Modal
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setModalVisible(false)}
            animationType="fade">
            <TouchableOpacity
              style={styles.containerModal}
              onPress={this.setModalVisible.bind(this, false)}>
              <View style={styles.popupModal}>
                <View style={styles.containerOption}>
                  <Image source={call} style={styles.iconBack} />

                  <Text style={styles.fontStruk1}>
                    Nama :
                    <Text style={styles.fontStruk2}>
                      {this.state.data.nama}
                    </Text>
                  </Text>
                  <Text style={styles.fontStruk1}>
                    Telp {'  '}:{' '}
                    <Text style={styles.fontStruk2}>
                      {this.state.data.no_hp}
                    </Text>
                  </Text>
                  <Text style={styles.fontStruk1}>
                    Kode Member :{' '}
                    <Text style={styles.fontStruk2}>
                      {this.state.data.kode_member}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(index);
