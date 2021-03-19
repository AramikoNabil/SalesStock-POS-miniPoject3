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
import {paper, kasir, carton, Send, car} from '../../../assets';
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
          <Image source={kasir} style={styles.iconHeaderHome} />
        </TouchableWithoutFeedback>
      </View>
    </View>
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
const RenderContent = (navigation) => {
  return (
    <ScrollView>
      <View style={styles.board}>
        <View style={styles.flexDirectionRow}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('InputDataBarang')}>
            <View style={styles.viewiconListSampah}>
              <View style={styles.viewiconListSampah1}>
                <Image style={styles.iconBoard1} source={Send} />
              </View>
              <Text style={styles.fontIconHome1}>
                {' '}
                Pos Data {'\n'} {'  '}Barang
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('DataBarang')}>
            <View style={styles.viewiconListSampah}>
              <View style={styles.viewiconListSampah1}>
                <Image style={styles.iconBoard2} source={carton} />
              </View>
              <Text style={styles.fontIconHome1}> Data Barang </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.marginTop20}>
          <View style={styles.flexDirectionRow}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('InputPembelian')}>
              <View style={styles.viewiconListSampah}>
                <View style={styles.viewiconListSampah1}>
                  <Image style={styles.iconBoard3} source={car} />
                </View>
                <Text style={styles.fontIconHome1}> Pos Pembelian </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('DataTanggalBeli')}>
              <View style={styles.viewiconListSampah}>
                <View style={styles.viewiconListSampah1}>
                  <Image style={styles.iconBoard4} source={paper} />
                </View>
                <Text style={styles.fontIconHome1}> Data Pembelian </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
      <View style={[styles.planColor, styles.flex1]}>
        <Text>{'  '} </Text>
      </View>
    </ScrollView>
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
