import React, {Component} from 'react';
import {styles} from '../../../../styles';
import Header from '../../../../component/header';
import Tab1 from '../../../Pimpinan/LaporanPengeluaran/InputLaporan';
import Tab2 from '../../../Pimpinan/LaporanPengeluaran/Laporan';
import {Tab, Tabs} from 'native-base';

export default class index extends Component {
  render() {
    const onPress = () => {
      this.props.navigation.goBack();
    };
    return (
      <>
        <Header onPress={onPress} />

        <Tabs tabBarBackgroundColor="#2e3c48" tabStyle={styles.planColor}>
          <Tab
            heading="Pos Pengeluaran"
            tabStyle={styles.planColor}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab1 />
          </Tab>
          <Tab
            heading="Laporan Pengeluaran"
            tabStyle={styles.planColor}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab2 navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </>
    );
  }
}
