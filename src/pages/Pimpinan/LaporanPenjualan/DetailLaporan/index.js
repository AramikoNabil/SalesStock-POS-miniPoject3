import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {share, download} from '../../../../assets';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        `https://mini-project-3a.herokuapp.com/api/laporan-penjualan-detail/${this.props.route.params.val.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );
      // console.log(response.data.data, '====');
      if (response) {
        this.setState({
          data: response.data.data,

          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  saveImage = async () => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await this.getPermissionAndroid();
      if (!granted) {
        return;
      }
    }

    let urlString = this.state.url;

    CameraRoll.save(urlString, 'photos');
    ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT);
  };

  share = () => {
    let urlString = this.state.url;
    let options = {
      title: 'Share ',
      url: urlString,
      type: 'image/jpeg',
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  onCapture = (uri) => {
    console.log('do something with ', uri);
    this.setState({url: uri});
  };

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Detail transaksi " />
          <LottieView
            source={require('../../../../assets/icon/loading.json')}
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
    const {val} = this.props.route.params;
    return (
      <>
        <Header title="Detail transaksi" onPress={onPress} />

        <ScrollView style={styles.iconInput3}>
          <View style={styles.containerMedia}>
            <TouchableWithoutFeedback onPress={this.saveImage}>
              <Image source={download} style={styles.iconDownload} />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.share}>
              <Image source={share} style={styles.iconShare} />
            </TouchableWithoutFeedback>
          </View>
          <ViewShot
            style={styles.iconInput5}
            onCapture={this.onCapture}
            captureMode="mount">
            <View style={styles.Struk1}>
              <Text style={styles.Struk2}>Borneo Sakti</Text>
              <Text>Jl.Pasar Baru 1 No.1</Text>
            </View>
            <View>
              <Text style={styles.line}>
                - - - - - - - - - - - - - - - - - - - - -{' '}
              </Text>
            </View>
            <View style={styles.Struk3}>
              <Text style={styles.fontStruk}>
                {val.tanggal}, {'\n'}
              </Text>

              <Text style={styles.fontKategori3}>{val.kasir}</Text>
            </View>
            <View>
              <Text style={styles.line}>
                - - - - - - - - - - - - - - - - - - - - -{' '}
              </Text>
            </View>

            <FlatList
              style={styles.strukContainer}
              data={this.state.data}
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
                        {'                            '}{' '}
                        <Text>Rp {item.harga}</Text> {'\n'}
                        <Text> Diskon : {item.diskon}-%</Text>
                      </Text>
                    </Text>
                  </Text>
                </View>
              )}
            />

            <View>
              <Text style={styles.line}>
                - - - - - - - - - - - - - - - - - - - - -{' '}
              </Text>
            </View>
            <View style={styles.Struk4}>
              <View style={styles.Struk5}>
                <Text style={styles.fontInputStruk1}>Total</Text>
                <Text style={styles.fontStruk3}>Rp {val.total_harga}</Text>
              </View>
              <View style={styles.Struk5}>
                <Text style={styles.fontStruk4}>Bayar</Text>
                <Text style={styles.fontStruk4}>Rp {val.dibayar}</Text>
              </View>
              <View style={styles.Struk6}>
                <Text style={styles.fontStruk4}>Kembali</Text>
                <Text style={styles.fontStruk4}>Rp {val.kembalian}</Text>
              </View>
            </View>
          </ViewShot>
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
