import React, {Component} from 'react';
import {
  Text,
  View,
  DeviceEventEmitter,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Beacons from 'react-native-beacons-manager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    //fontSize: 20,
    paddingTop: 20,
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
  },
  row: {
    padding: 8,
    paddingBottom: 16,
  },
  smallText: {
    fontSize: 11,
  },
});

class BleTest extends Component {
  /*
  state = {
  // Target Lang to translate to
    uuidRef: this.props.uuidRef,
    identifier: 'TEST BEACON 1',
    dataSource: []
  };*/
  constructor(props) {
    super(props);
    this.state = {
      //region information
      uuidRef: null,
      identifier: 'TEST BEACON 1',
      //React Native ListView datasource initialization
      dataSource: [],
    };
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          //The user is prompted why you want this permission after the first request is rejected
          title: 'I want the address query permission' ,
          message: 'I cant have permission Work, just agree' ,
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You have obtained the address query permission' );
      } else {
        console.log('Get address query failed' );
      }
    } catch (err) {
      console.log(err.toString());
    }
  }

  componentWillMount() {
    //ONLY non component state aware here in componentWillMount
    Beacons.detectIBeacons();

    const {identifier, uuid} = this.state;
    const FBeacons = {identifier, uuid};
    Beacons.startRangingBeaconsInRegion(FBeacons)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );
  }
  componentDidMount() {
    //component state aware here - attach events
    //surrounding data acquisition beacon
    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      var dataArr = [];
      dataArr = data.beacons;
      console.log(data.beacons);
      this.setState({
        dataSource: dataArr,
      });
    });
    //Beacons.stopRangingBeaconsInRegion('TEST BEACON 1');
  }
  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  renderItem = (item, index) => {
    const list = item.item;
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID:{list.uuid ? list.uuid : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major:{list.major ? list.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor:{list.minor ? list.minor : 'NA'}
        </Text>
        <Text>RSSI:{list.rssi ? list.rssi : 'NA'} </Text>
        <Text>Proximity: {list.proximity ? list.proximity : 'NA'}</Text>
        <Text>Distance: {list.distance ? list.distance : 'NA'}</Text>
      </View>
    );
  };
  render() {
    const {dataSource} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>All beacons in the area</Text>
        <FlatList data={dataSource} renderItem={this.renderItem} />
        <TouchableOpacity
          style={styles.button_view}
          onPress={this.requestLocationPermission.bind(this)}>
          <Text> Apply for access address permissions </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BleTest;