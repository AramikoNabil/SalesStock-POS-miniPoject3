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
import {styles} from '../../../styles';
import Header from '../../../component/header';
import {connect} from 'react-redux';
import Axios from 'axios';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      jumlah_barang: props.route.params.item.jumlah_barang,
    };
  }

  postItem = () => {
    this.setState({isLoading: true});
    const {jumlah_barang} = this.state;
    if (jumlah_barang !== '') {
      Axios.post(
        `https://mini-project-3a.herokuapp.com/api/kasir/${this.props.route.params.item.id}`,
        {
          jumlah_barang: jumlah_barang,

          _method: 'put',
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
              jumlah_barang: '',
              isLoading: false,
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.replace('Struk');
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
          <Header title="Edit Jumlah Barang" />
          <LottieView
            source={require('../../../assets/icon/loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    // const {item} = this.props.route.params;
    // console.log(item.jumlah_barang);
    const onPress = () => {
      this.props.navigation.goBack();
    };

    return (
      <>
        <Header title="Edit Jumlah Barang" onPress={onPress} />

        <ScrollView style={styles.containerUpdateModal}>
          <View style={[styles.container]}>
            <Text style={styles.fontInputData}>Jumlah Barang</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Pcs* '}
              maxLength={40}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={item.nama}
              value={`${this.state.jumlah_barang}`}
              onChangeText={(jumlah_barang) =>
                this.setState({jumlah_barang: jumlah_barang})
              }
            />

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.postItem()}>
                {this.state.addLoading ? (
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
