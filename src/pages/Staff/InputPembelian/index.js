import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Picker,
} from 'react-native';
import {styles} from '../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
// import RNPickerSelect from 'react-native-picker-select';
import Header from '../../../component/header';
import LottieView from 'lottie-react-native';

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      supplier: '',
      barang: '',
      total_barang: '',
      total_bayar: '',
    };
  }

  postItem = () => {
    this.setState({isLoading: true});
    const {supplier, barang, total_barang, total_bayar} = this.state;
    if (
      supplier !== '' &&
      barang !== '' &&
      total_barang !== '' &&
      total_bayar !== ''
    ) {
      Axios.post(
        'https://mini-project-3a.herokuapp.com/api/input-pembelian-barang',
        {
          supplier: supplier,
          barang: barang,
          total_barang: total_barang,
          total_bayar: total_bayar,
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
              isLoading: false,
              supplier: '',
              barang: '',
              total_barang: '',
              total_bayar: '',
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.navigate('InputPembelian');
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
          <Header title="Form Data Pembelian Barang" />
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
        <Header title="Form Data Pembelian Barang" onPress={onPress} />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.fontInputData}>Nama Supplier</Text>
            <Picker
              selectedValue={this.state.supplier}
              onValueChange={(itemValue) =>
                this.setState({supplier: itemValue})
              }>
              {this.props.user.userReducer.user.supplier.map((val, i) => {
                return (
                  <Picker.Item label={val.nama} value={val.nama} key={i} />
                );
              })}
            </Picker>

            <Text style={styles.fontInputData}>Nama barang</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Nama Barang* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              value={this.state.barang}
              onChangeText={(barang) => this.setState({barang: barang})}
            />
            <Text style={styles.fontInputData}>Total Barang</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Total Barang*(Pcs) '}
              maxLength={15}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              value={this.state.total_barang}
              onChangeText={(total_barang) =>
                this.setState({total_barang: total_barang})
              }
            />
            <Text style={styles.fontInputData}>Total Bayar</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Total Bayar *(Rp) '}
              maxLength={15}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              value={this.state.total_bayar}
              onChangeText={(total_bayar) =>
                this.setState({total_bayar: total_bayar})
              }
            />
          </View>
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
                <Text style={styles.buttonText} onPress={() => this.postItem()}>
                  Tambah
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text>{''}</Text>
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
