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
import Header from '../../../../component/header';
import {connect} from 'react-redux';
import Axios from 'axios';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      supplier: props.route.params.item.supplier,
      barang: props.route.params.item.barang,
      total_barang: props.route.params.item.total_barang,
      total_bayar: props.route.params.item.total_bayar,
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
        `https://mini-project-3a.herokuapp.com/api/input-pembelian-barang/${this.props.route.params.item.id}`,
        {
          supplier: supplier,
          barang: barang,
          total_barang: total_barang,
          total_bayar: total_bayar,
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
            this.props.navigation.navigate('DataTanggalBeli');
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
          <Header title="Edit Pembelian" />
          <LottieView
            source={require('../../../../assets/icon/loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    const {item} = this.props.route.params;
    const onPress = () => {
      this.props.navigation.goBack();
    };

    console.log(item.stok);
    return (
      <>
        <Header title="Edit Pembelian" onPress={onPress} />

        <ScrollView style={styles.containerUpdateModal}>
          <View style={[styles.container]}>
            <Text style={styles.fontInputData}>Nama Supplier</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Nama Supplier* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={item.nama}
              value={this.state.supplier}
              onChangeText={(supplier) => this.setState({supplier: supplier})}
            />
            <Text style={styles.fontInputData}>Nama Barang</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Nama Barang* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={item.merek}
              value={this.state.barang}
              onChangeText={(barang) => this.setState({barang: barang})}
            />
            <Text style={styles.fontInputData}>Total Barang</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Total Barang*(Pcs) '}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.harga_beli}`}
              value={`${this.state.total_barang}`}
              onChangeText={(total_barang) =>
                this.setState({total_barang: total_barang})
              }
            />
            <Text style={styles.fontInputData}>Total Bayar</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Total Bayar *(Rp) '}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.harga_jual}`}
              value={`${this.state.total_bayar}`}
              onChangeText={(total_bayar) =>
                this.setState({total_bayar: total_bayar})
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
