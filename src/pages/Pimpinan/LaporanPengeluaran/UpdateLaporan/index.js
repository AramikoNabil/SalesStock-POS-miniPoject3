import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {styles} from '../../../../styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import Header from '../../../../component/header';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      keterangan: props.route.params.item.keterangan,
      biaya: props.route.params.item.biaya,
    };
  }

  postItem = () => {
    this.setState({isLoading: true});
    const {keterangan, biaya} = this.state;
    if (keterangan !== '' && biaya !== '') {
      Axios.post(
        `https://mini-project-3a.herokuapp.com/api/input-pengeluaran/${this.props.route.params.item.id}`,
        {
          keterangan: keterangan,
          biaya: biaya,
          _method: 'put',
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
              keterangan: '',
              biaya: '',
              isLoading: false,
            });

            ToastAndroid.show(
              'Berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.replace('Fusion');
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
          console.log(error);
          ToastAndroid.show('Gagal', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
    } else {
      this.setState({isLoading: false});
      ToastAndroid.show(
        'Terjadi kesalahan',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  render() {
    const onPress = () => {
      this.props.navigation.navigate('Fusion');
    };
    // const {item} = this.props.route.params;
    return (
      <>
        <Header title="Update Laporan" onPress={onPress} />
        <ScrollView style={styles.containerUpdateModal}>
          <View style={[styles.container]}>
            <Text style={styles.fontInputData}>Keterangan</Text>
            <TextInput
              style={styles.formInputData}
              placeholder={'ket* '}
              maxLength={40}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              value={this.state.keterangan}
              editable={this.props.editable}
              autoCapitalize="sentences"
              onChangeText={(keterangan) =>
                this.setState({keterangan: keterangan})
              }
            />
            <View>
              <Text style={styles.fontInputData}>Biaya</Text>
            </View>
            <TextInput
              style={styles.formInputData}
              placeholder={'Rp* '}
              maxLength={40}
              keyboardType="numeric"
              returnKeyType="done"
              multiline={true}
              value={`${this.state.biaya}`}
              editable={this.props.editable}
              autoCapitalize="sentences"
              onChangeText={(biaya) => this.setState({biaya: biaya})}
            />

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.postItem()}>
                {this.state.isLoading ? (
                  <ActivityIndicator
                    color="white"
                    style={styles.ActivityIndicator}
                  />
                ) : (
                  <Text
                    style={styles.buttonText}
                    onPress={() => this.postItem()}>
                    Update
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text>{''}</Text>
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
