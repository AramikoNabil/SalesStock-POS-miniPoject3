import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
import {styles} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import {member, paper, signOut, kasir, person1} from '../../../assets';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

class index extends Component {
  handleBackButton = () => {
    Alert.alert(
      'Log Out?',
      'Log Out this account from the phone!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: async () => {
            AsyncStorage.clear();
            this.props.navigation.replace('Lobby');
          },
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  render() {
    return (
      <>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 1, y: 0.9}}
          colors={['#3B1D30', '#3B1D46', '#4c669f']}
          style={styles.HeaderComponentKasir}>
          <View style={styles.HeaderComponentHome}>
            <Text style={styles.fontHeader4}> Pimpinan </Text>
            <Image source={kasir} style={styles.iconHeaderHome} />
          </View>
          <Text style={styles.fontHeader2}>
            Hi, {this.props.user.userReducer.user.name}{' '}
          </Text>
        </LinearGradient>
        <ScrollView>
          <View style={styles.board}>
            <TouchableWithoutFeedback onPress={() => this.handleBackButton()}>
              <View style={styles.viewSignout}>
                <Image source={signOut} style={styles.Signout} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.flexDirectionRow}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('coba')}>
                <View style={styles.viewiconListSampah}>
                  <View style={styles.viewiconListSampah1}>
                    <Image style={styles.iconBoard4} source={paper} />
                  </View>
                  <Text style={styles.fontIconHome1}>
                    {' '}
                    Laporan {'\n'} {'  '}Bulan{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('ListBulanHari')}>
                <View style={styles.viewiconListSampah}>
                  <View style={styles.viewiconListSampah1}>
                    <Image style={styles.iconBoard3} source={paper} />
                  </View>
                  <Text style={styles.fontIconHome1}>
                    {' '}
                    Laporan {'\n'} {'   '}Hari{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.marginTop20}>
              <View style={styles.flexDirectionRow}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate('ListBulanBeli')
                  }>
                  <View style={styles.viewiconListSampah}>
                    <View style={styles.viewiconListSampah1}>
                      <Image style={styles.iconBoard3} source={paper} />
                    </View>
                    <Text style={styles.fontIconHome1}>
                      {'   '}
                      Laporan {'\n'} Pembelian{' '}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate('ListBulanJual')
                  }>
                  <View style={styles.viewiconListSampah}>
                    <View style={styles.viewiconListSampah1}>
                      <Image style={styles.iconBoard4} source={paper} />
                    </View>
                    <Text style={styles.fontIconHome1}>
                      {'  '}
                      Laporan {'\n'} Penjualan{' '}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.marginTop20}>
                <View style={styles.flexDirectionRow}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('ListBulanStok')
                    }>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard4} source={paper} />
                      </View>
                      <Text style={styles.fontIconHome1}>
                        {'  '}
                        Laporan {'\n'} {'   '} Stok{' '}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Fusion')}>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard3} source={paper} />
                      </View>
                      <Text style={styles.fontIconHome1}>
                        {'         '}
                        Pos {'\n'} Pengeluaran{' '}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.marginTop20}>
                <View style={styles.flexDirectionRow}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('IndukSupplier')
                    }>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard3} source={paper} />
                      </View>
                      <Text style={styles.fontIconHome1}>
                        {'    '}
                        Pos {'\n'} Supplier{' '}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('IndukKategori')
                    }>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard4} source={paper} />
                      </View>
                      <Text style={styles.fontIconHome1}>
                        {'  '}
                        Produk{'\n '}Kategori
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.marginTop20}>
                <View style={styles.flexDirectionRow}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('ListBulanAbsen')
                    }>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard5} source={person1} />
                      </View>
                      <Text style={styles.fontIconHome1}>
                        {' '}
                        Laporan {'\n'} Absensi{' '}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Absen')}>
                    <View style={styles.viewiconListSampah}>
                      <View style={styles.viewiconListSampah1}>
                        <Image style={styles.iconBoard4} source={member} />
                      </View>
                      <Text style={styles.fontIconHome1}>Absen</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text>{'  '}</Text>
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
