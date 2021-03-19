import React, {Component} from 'react';
import {Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import LottieView from 'lottie-react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1: [],
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
        'https://mini-project-3a.herokuapp.com/api/kategori-barang',
        {
          headers: {
            Authorization: `Bearer ${this.props.user.userReducer.user.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          data: response.data.data,
        });

        this.filter();
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  filter = () => {
    this.state.data.splice(
      this.state.data.findIndex((e) => e.nama === 'Default'),
      1,
    );
    this.setState({
      isLoading: false,
    });
  };
  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <Header title="Kategori" />
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
        <Header title="Kategori" onPress={onPress} />
        <FlatList
          style={styles.planColor}
          data={this.state.data}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate('KategoriBarang', {item: item})
              }>
              <View style={styles.containerKategori}>
                <View style={styles.containerKategori1}>
                  <Text style={styles.fontKategori}>{item.nama}</Text>
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
