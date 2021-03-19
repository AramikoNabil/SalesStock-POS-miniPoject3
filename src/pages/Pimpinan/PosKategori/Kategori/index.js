import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {itm, erased, edit} from '../../../../assets';
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
        'https://mini-project-3a.herokuapp.com/api/kategori',
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

  deleteOrder = async (item) => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.delete(
        `https://mini-project-3a.herokuapp.com/api/input-kategori/${item.id}`,
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
      <>
        <FlatList
          style={styles.planColor}
          data={this.state.data}
          keyExtractor={({id}, idx) => idx}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={styles.containerKategori}>
                <View style={styles.containerKategori2}>
                  <Image source={itm} style={styles.iconItem} />
                  <Text style={styles.fontKategori}>
                    {item.nama} {'\n'}
                  </Text>
                  <View style={styles.marginLeft40}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('UpdateKategoriProduk', {
                          item: item,
                        })
                      }>
                      <Image source={edit} style={styles.iconEdit} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          'Delete?',
                          'Delete this will delete data from the storage',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
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
                      <Image source={erased} style={styles.iconErased} />
                    </TouchableOpacity>
                  </View>
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
