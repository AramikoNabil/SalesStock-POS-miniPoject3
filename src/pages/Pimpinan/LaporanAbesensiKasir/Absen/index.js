//This is an example code to Scan QR code//
import React, {Component} from 'react';
//import react in our code.
import {Text, View, ToastAndroid} from 'react-native';

import Axios from 'axios';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //variable to hold the qr value
      data: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.postItem();
  }

  postItem = () => {
    this.setState({isLoading: true});
    try {
      const response = Axios.post(
        'https://mini-project-3a.herokuapp.com/api/kode-absen',
        null,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );
      if (response) {
        // console.log(response.data.data);
        this.getOrder();
      }
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
      ToastAndroid.show('Gagal', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  getOrder = async () => {
    // this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        'https://mini-project-3a.herokuapp.com/api/kode-absen',
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

      if (response) {
        console.log(response.data.data);
        this.setState({
          data: response.data.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
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
          <Header title="Absen Kasir" />
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
      <View style={{flex: 1}}>
        <Header title="Absen Kasir" onPress={onPress} />
        <View style={{marginTop: 60, alignItems: 'center'}}>
          <QRCode
            value={`${this.state.data.kode}`}
            size={200}
            bgColor="black"
            fgColor="white"
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 18}}>
            {' '}
            Tanggal :{' '}
            <Text style={{fontWeight: '900'}}>{this.state.data.tanggal}</Text>
          </Text>
        </View>
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
