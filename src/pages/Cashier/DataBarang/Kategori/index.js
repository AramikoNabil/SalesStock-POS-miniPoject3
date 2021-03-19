import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {itm} from '../../../../assets';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      isLoading: true,
      showModal: false,
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        `https://mini-project-3a.herokuapp.com/api/kategori-barang/${this.props.route.params.item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          res: response.data.data,
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
        `https://mini-project-3a.herokuapp.com/api/input-data-barang/${item.id}`,
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
          <Header title="Data Barang" />
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
        <Header title="Data Barang" onPress={onPress} />
        <FlatList
          style={styles.planColor}
          data={this.state.res}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={styles.containerKategori}>
                <View style={styles.containerKategori2}>
                  <Image source={itm} style={styles.iconItem} />
                  <Text style={styles.fontKategori}>
                    {item.nama} {'\n'}
                    <Text style={styles.fontKategori1}>
                      {' '}
                      Merek = {item.merek} {'\n'}
                      <Text>
                        {' '}
                        Harga Modal = Rp.{item.harga_beli} {'\n'}
                        <Text>
                          {' '}
                          Harga Jual = Rp.{item.harga_jual} {'\n'}
                          <Text> Stok : {item.stok} pcs</Text> {'\n'}
                          <Text>
                            {' '}
                            Diskon : {item.diskon} {'\n'}
                            <Text> Kode : {item.kode}</Text>
                          </Text>
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
