import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nama: '',
      alamat: '',
    };
  }

  postItem = () => {
    this.setState({isLoading: true});
    const {nama, alamat} = this.state;
    if (nama !== '' && alamat !== '') {
      Axios.post(
        'https://mini-project-3a.herokuapp.com/api/input-supplier',
        {
          nama: nama,
          alamat: alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      )
        .then((responseJson) => {
          const api = responseJson.data;

          if ((api.status = 'success')) {
            this.setState({
              nama: '',
              alamat: '',
              isLoading: false,
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } else {
            this.setState({isLoading: false});
            // console.log(response.data);
            ToastAndroid.show(
              'Terjadi Kesalahan,Coba Lagi',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
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
          <LottieView
            source={require('../../../../assets/icon/loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    return (
      <>
        <ScrollView style={styles.containerUpdateModal}>
          <View style={[styles.container]}>
            <Text style={styles.fontInputData}>Nama Supplier</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Nama* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              onChangeText={(nama) => this.setState({nama: nama})}
            />
            <View>
              <Text style={styles.fontInputData}>Alamat</Text>
            </View>
            <TextInput
              style={styles.formInputData}
              placeholder={'Alamat* '}
              maxLength={20}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              onChangeText={(alamat) => this.setState({alamat: alamat})}
            />

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.postItem()}>
                {this.state.isLoading ? (
                  <ActivityIndicator
                    color="white"
                    style={styles.ActivityIndicator}
                  />
                ) : (
                  <Text
                    style={styles.buttonText}
                    onPress={() => this.postItem()}>
                    Tambah
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text>{''}</Text>
            </View>
          </View>
        </ScrollView>
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
