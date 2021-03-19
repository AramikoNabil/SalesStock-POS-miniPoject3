import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Picker,
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
      nama: props.route.params.item.nama,
      harga_beli: props.route.params.item.harga_beli,
      harga_jual: props.route.params.item.harga_jual,
      kategori_id: props.route.params.item.kategori_id,
      merek: props.route.params.item.merek,
      stok: props.route.params.item.stok,
      diskon: props.route.params.item.diskon,
    };
  }

  postItem = () => {
    this.setState({isLoading: true});
    const {
      nama,
      harga_beli,
      harga_jual,
      kategori_id,
      merek,
      stok,
      diskon,
    } = this.state;
    if (
      nama !== '' &&
      harga_beli !== '' &&
      harga_jual !== '' &&
      kategori_id !== '' &&
      merek !== '' &&
      stok !== ''
    ) {
      Axios.post(
        `https://mini-project-3a.herokuapp.com/api/input-data-barang/${this.props.route.params.item.id}`,
        {
          nama: nama,
          harga_beli: harga_beli,
          harga_jual: harga_jual,
          kategori_id: kategori_id,
          merek: merek,
          stok: stok,
          diskon: diskon,
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
              nama: '',
              harga_beli: '',
              harga_jual: '',
              kategori_id: '',
              merek: '',
              stok: '',
              diskon: '',
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.navigate('DataBarang');
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
          <Header title="Edit Data Barang" />
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
        <Header title="Edit Data Barang" onPress={onPress} />

        <ScrollView style={styles.containerUpdateModal}>
          <View style={[styles.container]}>
            <Text style={styles.fontInputData}>Nama Produk</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Nama Produk* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={item.nama}
              value={this.state.nama}
              onChangeText={(nama) => this.setState({nama: nama})}
            />
            <Text style={styles.fontInputData}>Merek</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Merek* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={item.merek}
              value={this.state.merek}
              onChangeText={(merek) => this.setState({merek: merek})}
            />
            <Text style={styles.fontInputData}>Harga Beli</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Harga Beli*(Rp) '}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.harga_beli}`}
              value={`${this.state.harga_beli}`}
              onChangeText={(harga_beli) =>
                this.setState({harga_beli: harga_beli})
              }
            />
            <Text style={styles.fontInputData}>Harga Jual</Text>

            <TextInput
              style={styles.formInputData}
              placeholder={'Harga Jual *(Rp) '}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.harga_jual}`}
              value={`${this.state.harga_jual}`}
              onChangeText={(harga_jual) =>
                this.setState({harga_jual: harga_jual})
              }
            />
            <Text style={styles.fontInputData}>Kategori</Text>

            <Picker
              selectedValue={item.kategori_id}
              onValueChange={(itemValue) =>
                this.setState({kategori_id: itemValue})
              }>
              {this.props.user.userReducer.user.kategori.map((val, i) => {
                return <Picker.Item label={val.nama} value={val.id} key={i} />;
              })}
            </Picker>

            <Text style={styles.fontInputData}>Stok</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Stok*'}
              // maxLength={15}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.stok}`}
              value={this.state.merek}
              onChangeText={(stok) => this.setState({stok: stok})}
            />

            <Text style={styles.fontInputData}>Diskon</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'Diskon*'}
              // maxLength={15}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              autoCapitalize="sentences"
              editable={this.props.editable}
              //   defaultValue={`${item.diskon}`}
              value={this.state.diskon}
              onChangeText={(diskon) => this.setState({diskon: diskon})}
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
