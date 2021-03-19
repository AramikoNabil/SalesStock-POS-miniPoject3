import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import Header from '../../../component/header';
import {styles} from '../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {edit, erased, file} from '../../../assets';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOrder: [],
      dataTotal: '',
      cash: '',
      kodeMember: '',
      isLoading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getOrder().then(() => {
      this.setState({refreshing: false});
    });
  };

  postItem = () => {
    this.setState({isLoading: true});
    const {cash, kodeMember} = this.state;

    if (cash !== '') {
      const params = {
        dibayar: cash,
      };
      kodeMember !== '' ? (params.kode_member = kodeMember) : null;
      Axios.post(
        'https://mini-project-3a.herokuapp.com/api/kasir2',
        params,

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
              kodeMember: '',
              cash: '',
              isLoading: false,
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.navigate('TotalStruk');
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
          console.log(error.response);
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

  getOrder = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        'https://mini-project-3a.herokuapp.com/api/kuitansi1',
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          dataOrder: response.data.data,
          dataTotal: response.data.total_bayar,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  deleteOrder = async (item) => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.delete(
        `https://mini-project-3a.herokuapp.com/api/kasir/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );
      console.log(response.data.status);
      if ((response.data.status = 'success')) {
        this.setState({
          dataOrder: [],
          dataTotal: '',
          isLoading: false,
        });
        this.getOrder();
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Transaction Detail " />
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
        <Header title="Transaction Detail" onPress={onPress} />
        {this.state.dataOrder !== [] && this.state.dataTotal.length !== 0 ? (
          <ScrollView
            style={styles.iconInput3}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <View style={styles.iconInput4}>
              <FlatList
                style={styles.strukContainer}
                data={this.state.dataOrder}
                keyExtractor={({id}, idx) => idx}
                renderItem={({item}) => (
                  <View style={styles.containerStruk}>
                    <Text style={styles.fontKategori}>
                      {item.barang} {'\n'}
                      <Text style={styles.fontKategori2}>
                        {' '}
                        {item.harga_satuan} {'  '}
                        <Text>
                          x {item.jumlah_barang}
                          {'         '} <Text>{item.harga}</Text> {'\n'}
                        </Text>
                      </Text>
                    </Text>
                    <View style={styles.iconStruk}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('UpdateStruk', {
                            item: item,
                          })
                        }>
                        <Image source={edit} style={styles.iconEdit} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Delete?',
                            'Delete item',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {
                                text: 'Delete',
                                onPress: () => this.deleteOrder(item),
                              },
                            ],
                            {
                              cancelable: false,
                            },
                          )
                        }>
                        <Image source={erased} style={styles.iconErased1} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <View style={styles.totalStruk}>
                <Text style={styles.fontTotal}>
                  Total{'               '}
                  <Text style={styles.fontTotal1}>{this.state.dataTotal}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.viewInputStruk}>
              <Text style={styles.fontInputStruk1}>Rp</Text>
              <TextInput
                style={styles.fontInputStruk}
                underlineColorAndroid
                placeholder="-"
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={(text) => this.setState({cash: text})}
              />
            </View>
            <Text style={styles.fontUnderStruk}>
              Masukkan Jumlah Uang Pelanggan
            </Text>
            <View style={styles.viewInputStruk1}>
              <Text style={styles.fontInputStruk1}>No.</Text>
              <TextInput
                style={styles.fontInputStruk}
                underlineColorAndroid
                placeholder="-"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={(text) => this.setState({kodeMember: text})}
              />
            </View>
            <Text style={styles.fontUnderStruk}>
              Masukkan Kode Member Pelanggan*
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.postItem()}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  color="white"
                  style={styles.ActivityIndicator}
                />
              ) : (
                <Text style={styles.buttonText} onPress={() => this.postItem()}>
                  Selesai
                </Text>
              )}
            </TouchableOpacity>
            <View>
              <Text>{'  '}</Text>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <View style={styles.noData}>
              <Image source={file} style={styles.noDataIcon} />
              <Text style={[styles.fontStruk1]}>Belum ada transaksi</Text>
            </View>
          </ScrollView>
        )}
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
