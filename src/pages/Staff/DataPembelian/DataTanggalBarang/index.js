import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {itmBuy, erased, edit} from '../../../../assets';
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
        `https://mini-project-3a.herokuapp.com/api/tanggal-pembelian/${this.props.route.params.item.tanggal_pembelian}`,
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
      console.log(error);
      this.setState({isLoading: false});
    }
  };

  deleteOrder = async (item) => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.delete(
        `https://mini-project-3a.herokuapp.com/api/input-pembelian-barang/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );
      // console.log(response.data.message);
      if (response) {
        this.setState({
          isLoading: false,
          data: [],
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
          <Header title="Data Pembelian Barang" />
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
        <Header title="Data Pembelian Barang" onPress={onPress} />

        <FlatList
          style={styles.planColor}
          data={this.state.data}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
            // onPress={() =>
            //   this.props.navigation.navigate('DataTanggalBarang', {
            //     item: item,
            //   })
            // }
            >
              <View style={styles.containerKategori}>
                <View style={styles.containerKategori2}>
                  <Image source={itmBuy} style={styles.iconItem1} />
                  <Text style={styles.fontKategori}>
                    {item.barang} {'\n'}
                    <Text style={styles.fontKategori1}>
                      {' '}
                      Supplier = {item.supplier}. {'\n'}
                      <Text>
                        {' '}
                        Total Barang = {item.total_barang} Pcs. {'\n'}
                        <Text>
                          {' '}
                          Total Bayar = Rp.{item.total_bayar}. {'\n'}
                          <Text> Tanggal : {item.tanggal_pembelian}.</Text>{' '}
                          {'\n'}{' '}
                          <View style={styles.onlyRow}>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'UpdateTanggalBarang',
                                  {
                                    item: item,
                                  },
                                )
                              }>
                              <Image source={edit} style={styles.iconEdit1} />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                Alert.alert(
                                  'Delete?',
                                  'Delete this will delete data from the storage',
                                  [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        console.log('Cancel Pressed'),
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
                              <Image
                                source={erased}
                                style={styles.iconErased1}
                              />
                            </TouchableOpacity>
                          </View>
                        </Text>
                      </Text>
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
