import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {mesin, edit} from '../../../../assets';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
        `https://mini-project-3a.herokuapp.com/api/laporan-penjualan/${this.props.route.params.item.bulan}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          isLoading: false,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({isLoading: false});
    }
  };

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Data Penjualan Barang" />
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

    return (
      <>
        <Header title="Data Penjualan Barang" onPress={onPress} />

        <FlatList
          style={styles.planColor}
          data={this.state.data}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <View style={styles.containerKategori}>
              <View style={styles.containerKategori2}>
                <Image source={mesin} style={styles.iconItem1} />
                <Text style={styles.fontKategori}>
                  {item.kasir} {'\n'}
                  <Text style={styles.fontKategori1}>
                    {' '}
                    Total Harga = {item.total_harga}. {'\n'}
                    <Text>
                      {' '}
                      Pembayaran = {item.dibayar} {'\n'}
                      <Text>
                        {' '}
                        Kembalian = Rp {item.kembalian}. {'\n'}
                        <Text> Tanggal : {item.tanggal}.</Text> {'\n'}
                        <Text> Jam : {item.jam}.</Text>
                      </Text>{' '}
                      {'\n'}
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'LaporanDetailPenjualan',
                            {
                              val: item,
                            },
                          )
                        }>
                        <Image source={edit} style={styles.iconEdit1} />
                      </TouchableOpacity>
                    </Text>
                  </Text>
                </Text>
              </View>
            </View>
          )}
        />
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
