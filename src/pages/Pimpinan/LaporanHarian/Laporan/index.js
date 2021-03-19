import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {chart} from '../../../../assets';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        `https://mini-project-3a.herokuapp.com/api/laporan-laba/${this.props.route.params.item.tanggal}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

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
  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Laporan Umum " />
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
    const {item} = this.props.route.params;
    return (
      <>
        <Header title="Laporan Umum" onPress={onPress} />
        <ScrollView style={styles.planColor}>
          <View style={styles.AlignCenter}>
            <Text style={styles.fontHeaderLaporan}>Laporan hari ini</Text>
            <Text style={styles.fontLaporan2}>{item.nama}</Text>
          </View>
          <View style={styles.containerLaporan}>
            <View style={styles.onlyRow}>
              <View style={styles.containerChart1}>
                <Image source={chart} style={styles.chart} />
              </View>
              <View style={styles.containerLaporan2}>
                <Text style={styles.fontLaporan}>
                  {this.state.data.jumlah_penjualan}
                </Text>
                <Text style={styles.fontLaporan1}>Jml Transaksi</Text>
              </View>
            </View>
            <View style={styles.onlyRow}>
              <View style={styles.containerChart}>
                <Image source={chart} style={styles.chart} />
              </View>
              <View style={styles.containerLaporan3}>
                <Text style={styles.fontLaporan}>
                  Rp {this.state.data.pendapatan}
                </Text>
                <Text style={styles.fontLaporan1}>Pendapatan</Text>
              </View>
            </View>

            <View style={styles.onlyRow}>
              <View style={styles.containerChart}>
                <Image source={chart} style={styles.chart} />
              </View>
              <View style={styles.containerLaporan1}>
                <Text style={styles.fontLaporan}>
                  Rp {this.state.data.keuntungan}
                </Text>
                <Text style={styles.fontLaporan1}>Keuntungan</Text>
              </View>
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
