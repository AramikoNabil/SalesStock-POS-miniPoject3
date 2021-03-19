import React, {Component} from 'react';
import {styles} from '../../../../styles';
import Header from '../../../../component/header';
import Tab1 from '../../../Pimpinan/PosKategori/InputKategori';
import Tab2 from '../../../Pimpinan/PosKategori/Kategori';
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
            heading="Pos Kategori"
            tabStyle={styles.planColor}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab1 navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading="Data Kategori"
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
