import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {styles} from '../../../styles';
import {member, paper, boss, person1} from '../../../assets';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const RenderNavBar = (navigation) => {
  // const [show, setShow] = useState(true);
  const handleBackButton = () => {
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
            navigation.replace('Lobby');
          },
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        {/* <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Text style={styles.fontHeader5}> Pimpinan </Text>
        </TouchableOpacity> */}

        <TouchableWithoutFeedback
          style={styles.iconRight}
          onPress={() => handleBackButton()}>
          <Image source={boss} style={styles.iconHeaderHome} />
        </TouchableWithoutFeedback>

        {/* <View
              style={{
                width: 60,
                height: 40,
                backgroundColor: '#cdcbcb',
                // position: 'absolute',
                zIndex: 100,
                // position: 'absolute',
                marginTop: 100,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                onPress={() => handleBackButton()}
                style={{fontWeight: '900'}}>
                LogOut
              </Text>
            </View> */}
      </View>
    </View>
  );
};

const RenderContent = (navigation) => {
  return (
    <ScrollView style={[styles.planColor, styles.flex1]}>
      <View style={styles.board}>
        <View style={styles.flexDirectionRow}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ListBulan')}>
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
            onPress={() => navigation.navigate('ListBulanHari')}>
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
              onPress={() => navigation.navigate('ListBulanBeli')}>
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
              onPress={() => navigation.navigate('ListBulanJual')}>
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
                onPress={() => navigation.navigate('ListBulanStok')}>
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
                onPress={() => navigation.navigate('Fusion')}>
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
                onPress={() => navigation.navigate('IndukSupplier')}>
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
                onPress={() => navigation.navigate('IndukKategori')}>
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
                onPress={() => navigation.navigate('ListBulanAbsen')}>
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
                onPress={() => navigation.navigate('Absen')}>
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
      {/* <View >
        <Text>{'  '}</Text>
      </View> */}
    </ScrollView>
  );
};

const Title = (props) => {
  const {user} = useSelector((state) => state.userReducer);
  console.log(user);
  return (
    <View style={styles.body}>
      <Text style={styles.fontHeader2}>Hi, {user.name} </Text>
    </View>
  );
};

const Index = ({navigation}) => {
  return (
    <>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor="transparent"
        titleStyle={styles.titleStyle}
        alwaysShowTitle={false}
        // alwaysShowNavBar={false}
        title={Title()}
        backgroundImage={require('../../../assets/image/image1.jpg')}
        backgroundImageScale={1.2}
        renderNavBar={() => RenderNavBar(navigation)}
        renderContent={() => RenderContent(navigation)}
        containerStyle={styles.container1}
        contentContainerStyle={styles.contentContainer}
        // innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
    </>
  );
};

export default Index;
