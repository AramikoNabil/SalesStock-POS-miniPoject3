//This is an example code to Scan QR code//
import React, {Component} from 'react';
//import react in our code.
import {
  Text,
  View,
  ToastAndroid,
  Image,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import all basic components
import {CameraKitCameraScreen} from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
import Axios from 'axios';
import Header from '../../../component/header';
import {styles} from '../../../styles';
import {connect} from 'react-redux';
import {mesin} from '../../../assets';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      openScanner: false,
      jumlah_barang: 1,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.onOpenScanner();
  }
  // onBarcodeScan(qrvalue) {
  //   //called after te successful scanning of QRCode/Barcode
  //   this.setState({qrvalue: qrvalue});
  //   this.postItem();
  //   this.setState({openScanner: false});
  // }
  onOpenScanner() {
    var that = this;
    //To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App Camera Permission',
              message: 'CameraExample App needs access to your camera ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({openScanner: true});
            that.setState({qrvalue: ''});
          } else {
            Alert('CAMERA permission denied');
          }
        } catch (err) {
          Alert('Camera permission err', err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    } else {
      that.setState({qrvalue: ''});
      that.setState({openScanner: true});
    }
  }

  postItem = (value) => {
    this.setState({isLoading: true});
    this.setState({qrvalue: value});
    const {qrvalue, jumlah_barang} = this.state;
    if (jumlah_barang !== '' && qrvalue !== '') {
      Axios.post(
        'https://mini-project-3a.herokuapp.com/api/kasir',
        {
          kode: qrvalue,
          jumlah_barang: jumlah_barang,
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
              qrvalue: '',
              jumlah_barang: 1,
              isLoading: false,
            });

            // ToastAndroid.show(
            //   'Berhasil',
            //   ToastAndroid.SHORT,
            //   ToastAndroid.BOTTOM,
            // );
            this.setState({openScanner: false});
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
          this.setState({openScanner: false});
          console.log(error);
          ToastAndroid.show('Gagal', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
    } else {
      this.setState({isLoading: false});
      ToastAndroid.show(
        'Berhasil ditambahkan ',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  render() {
    const onPress = () => {
      this.props.navigation.goBack();
    };
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Scan" />
          <LottieView
            source={require('../../../assets/icon/loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    //If qrvalue is set then return this view

    if (!this.state.openScanner) {
      return (
        <>
          <Header title="Scan" onPress={onPress} />
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Image source={mesin} style={{width: 200, height: 200}} />
          </View>
          <View style={{flex: 1, marginBottom: 60}}>
            <TouchableOpacity
              style={styles.buttonScan}
              onPress={() => this.onOpenScanner()}>
              {this.state.addLoading ? (
                <ActivityIndicator
                  color="white"
                  style={styles.ActivityIndicator}
                />
              ) : (
                <Text
                  style={styles.buttonTextScan}
                  onPress={() => this.onOpenScanner()}>
                  Again
                </Text>
              )}
            </TouchableOpacity>

            {/* <View>
              <TouchableOpacity
                style={styles.buttonScan}
                onPress={() => this.postItem()}>
                {this.state.addLoading ? (
                  <ActivityIndicator
                    color="white"
                    style={styles.ActivityIndicator}
                  />
                ) : (
                  <Text
                    style={styles.buttonTextScan}
                    onPress={() => this.postItem()}>
                    Post
                  </Text>
                )}
              </TouchableOpacity>
            </View> */}
          </View>
        </>
      );
    }
    return (
      <View style={{flex: 1}}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={(event) =>
            this.postItem(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(index);
