import React, {Component} from 'react';
import {styles} from '../../../../styles';
import Header from '../../../../component/header';
import Tab1 from '../../../Pimpinan/PosSupplier/InputSupplier';
import Tab2 from '../../../Pimpinan/PosSupplier/Supplier';
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
            heading="Pos Supplier"
            tabStyle={styles.planColor}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab1 navigation={this.props.navigation.replace} />
          </Tab>
          <Tab
            heading="Data Supplier"
            tabStyle={styles.planColor}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab2 navigation={this.props.navigation.replace} />
          </Tab>
        </Tabs>
      </>
    );
  }
}
