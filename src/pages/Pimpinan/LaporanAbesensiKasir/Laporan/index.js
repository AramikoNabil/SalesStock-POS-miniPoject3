import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import Header from '../../../../component/header';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {person1} from '../../../../assets';
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
        `https://mini-project-3a.herokuapp.com/api/laporan-absen-bulan/${this.props.route.params.item.bulan}`,
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
    return (
      <>
        <Header title="Laporan Umum" onPress={onPress} />
        <FlatList
          style={styles.planColor}
          data={this.state.data}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={styles.containerKategori}>
                <View style={styles.containerKategori2}>
                  <Image source={person1} style={styles.iconItem} />
                  <Text style={styles.fontKategori}>
                    {item.nama} {'\n'}
                    <Text> Presentase absen : {item.presentase_absen}</Text>
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