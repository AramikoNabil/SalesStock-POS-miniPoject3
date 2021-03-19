//This is an example code to Scan QR code//
import React, {Component} from 'react';
//import react in our code.
import {
  View,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
// import all basic components
import {CameraKitCameraScreen} from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
import Axios from 'axios';
import {connect} from 'react-redux';
import {styles} from '../../../styles';

class index extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      openScanner: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.onOpenScanner();
  }

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
    }
  }

  postItem = (value) => {
    this.setState({isLoading: true, qrvalue: value});
    const {qrvalue} = this.state;

    Axios.post(
      'https://mini-project-3a.herokuapp.com/api/absen',
      {
        kode: qrvalue,
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
            isLoading: false,
          });

          ToastAndroid.show(
            'Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this.props.navigation.replace('HomeCashier');
        } else if ((api.status = 'failed')) {
          this.setState({
            qrvalue: '',
            isLoading: false,
          });

          ToastAndroid.show('Done', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          this.props.navigation.replace('HomeCashier');
        } else {
          this.setState({isLoading: false});
          // console.log(response.data);
          ToastAndroid.show(
            'Terjadi Kesalahan,Coba Lagi',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this.props.navigation.replace('HomeCashier');
        }
      })
      .catch((error) => {
        this.setState({isLoading: false});
        console.log(error);
        ToastAndroid.show('Done', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.navigation.replace('HomeCashier');
      });
  };
  render() {
    return (
      <View style={styles.container1}>
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
