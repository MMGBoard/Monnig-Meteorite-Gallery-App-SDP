import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Image,
  FlatList,
  Alert
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {
  Button as PaperButton,
  Card,
  Paragraph,
  ActivityIndicator,
  Searchbar,
  List,
  Colors, 
  Divider as PaperDivider,
  Text as PaperText,
  Title,
  Modal
   } from 'react-native-paper';

import Kontakt from 'react-native-kontaktio';
import type { ColorValue } from 'react-native';
import type {
  ConfigType,
  RegionType,
  IBeaconAndroid,
} from 'react-native-kontaktio';

import { AnimatedValue, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TranslateText from '../components/TranslateText'
import i18n from 'i18n-js' ;


const {
  connect,
  configure,
  disconnect,
  isConnected,
  startScanning,
  stopScanning,
  restartScanning,
  isScanning,
  // setBeaconRegion,
  setBeaconRegions,
  getBeaconRegions,
  setEddystoneNamespace,
  IBEACON,
  EDDYSTONE,
  // Configurations
  scanMode,
  scanPeriod,
  activityCheckConfiguration,
  forceScanConfiguration,
  monitoringEnabled,
  monitoringSyncInterval,
} = Kontakt;

const region1: typeof RegionType = {
  identifier: 'BlueCharm_1',
  uuid: '426C7565-4368-6172-6D42-6561636F6E73',
  major: 3838,
  // no minor provided: will detect all minors
};

const region2: typeof RegionType = {
  identifier: 'BlueCharm_2',
  uuid: '426C7565-4368-6172-6D42-6561636F6E73',
  major: 2828,
  // no minor provided: will detect all minors
};

type State = {
  scanning: boolean;
  beacons: Array<typeof IBeaconAndroid>;
  eddystones: Array<typeof IBeaconAndroid>;
  statusText: string | null;
  isLoading: boolean;
  meteorites: Array<any>;
  qrCamera: boolean;
  playStatus: string;
  modalVisible: boolean;
  map: any;
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message:
          "Tour Assistance needs access to your location...",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location access");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA, 
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

interface Props {
  navigation: any
}

/**
 * Monitors beacons in two regions and sorts them by proximity,
 * color-coded by minors with values 1 through 5.
 *
 * Just change the values in the regions to work with your beacons.
 * Then press `Start scanning` and you should very soon see your beacons
 * in a ScrollView sorted by their 'accuracy' which reflects a measure of
 * distance from the beacons to your mobile phone in meters.
 *
 * This example makes use of regions to limit scanning to beacons
 * belonging to one of these two regions.
 * Of course regions can also be used to separately process the data later.
 * Such logic may be built inside the listeners.
 *
 * Press `Start scanning` and you should very soon see your beacons in a ScrollView
 * sorted by their RSSI which reflects a measure of distance from the beacons
 * to your mobile phone.
 */
export default class AssistanceScreen extends Component<Props,{}, State> {
  imagePathEntrance = require("../../images/entrance.png");
  imagePathTexas= require("../../images/texasMeteorites.png");
  imagePathImpacts = require("../../images/impacts.png");
  imagePathCollisions = require("../../images/collisions.png");

  state: State = {
    scanning: false,
    beacons: [],
    eddystones: [],
    statusText: null,
    isLoading: true,
    meteorites: [],
    qrCamera: false,
    playStatus: 'Stop',
    modalVisible: false,
    map: this.imagePathEntrance,
  };

  
  detailsStack = createNativeStackNavigator();

  componentDidMount() {
    requestCameraPermission();
    requestLocationPermission();
    const data = this.props.route.params;
    let displayName = "";
    if(data != null){
      displayName = data.barcodeText;
    }

    if(displayName != "") {
      if(displayName === "region1") {
        this.displayUpdate('Texas')
        this.setState({map: this.imagePathTexas})
      } else if (displayName === "region2") {
        this.displayUpdate('Mexico')
        this.setState({map: this.imagePathCollisions}) 
      }
    }
    const subscriber = firestore()
    .collection('meteorites')
    .onSnapshot(querySnapshot => {
      const meteors: React.SetStateAction<any[]> =  []

      querySnapshot.forEach(documentSnapshot => {
        meteors.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      this.setState({meteorites: meteors, isLoading: false});
    });

    // Initialization, configuration and adding of beacon regions
    const config: typeof ConfigType = {
      scanMode: scanMode.BALANCED,
      scanPeriod: scanPeriod.create({
        activePeriod: 6000,
        passivePeriod: 20000,
      }),
      activityCheckConfiguration: activityCheckConfiguration.DEFAULT,
      forceScanConfiguration: forceScanConfiguration.MINIMAL,
      monitoringEnabled: monitoringEnabled.TRUE,
      monitoringSyncInterval: monitoringSyncInterval.DEFAULT,
    };

    connect('MY_KONTAKTIO_API_KEY', [IBEACON, EDDYSTONE])
      .then(() => configure(config))
      .then(() => setBeaconRegions([region1, region2]))
      .then(() => setEddystoneNamespace(null))
      .catch((error: any) => console.log('error', error));

    // Beacon listeners
    DeviceEventEmitter.addListener(
      'beaconDidAppear',
      ({ beacon: newBeacon, region }) => {
        console.log('beaconDidAppear', newBeacon.identifier);

        this.setState({
          beacons: this.state.beacons.concat(newBeacon),
        });
      }
    );

    /**
    DeviceEventEmitter.addListener(
      'beaconDidDisappear',
      ({ beacon: lostBeacon, region }) => {
     //   console.log('beaconDidDisappear', lostBeacon, region);

        const { beacons } = this.state;
        const index = beacons.findIndex((beacon) =>
          this._isIdenticalBeacon(lostBeacon, beacon)
        );
        this.setState({
          beacons: beacons.reduce<Array<typeof IBeaconAndroid>>((result, val, ind) => {
            // don't add disappeared beacon to array
            if (ind === index) return result;
            // add all other beacons to array
            else {
              result.push(val);
              return result;
            }
          }, []),
        });
      }
    );
    DeviceEventEmitter.addListener(
      'beaconsDidUpdate',
      ({
        beacons: updatedBeacons,
        region,
      }: {
        beacons: Array<typeof IBeaconAndroid>;
        region: typeof RegionType;
      }) => {
        console.log('beaconsDidUpdate', updatedBeacons, region);

        const { beacons } = this.state;
        updatedBeacons.forEach((updatedBeacon) => {
          const index = beacons.findIndex((beacon) =>
            this._isIdenticalBeacon(updatedBeacon, beacon)
          );
          this.setState({
            beacons: beacons.reduce<Array<typeof IBeaconAndroid>>(
              (result, val, ind) => {
                // replace current beacon values for updatedBeacon, keep current value for others
                ind === index ? result.push(updatedBeacon) : result.push(val);
                return result;
              },
              []
            ),
          });
        });
      }
    );*/

    // Region listeners
    DeviceEventEmitter.addListener('regionDidEnter', ({ region }) => {
      console.log("new region" + region.major);
      if(region.major = '3838') {
        this.setState({map: this.imagePathTexas})
        this.displayUpdate('Entrance')
      } else if (region.major = '2828') {
        this.setState({map: this.imagePathCollisions})
        this.displayUpdate('Mexico')
      }
      console.log('regionDidEnter', region);
    });
    
    DeviceEventEmitter.addListener('regionDidExit', ({ region }) => {
      console.log('regionDidExit', region);
    });

    // Beacon monitoring listener
    DeviceEventEmitter.addListener('monitoringCycle', ({ status }) => {
      console.log('monitoringCycle', status);
    });
    this._startScanning();
  }

  componentWillUnmount() {
    // Disconnect beaconManager and set to it to null
    disconnect();
    DeviceEventEmitter.removeAllListeners();
  }

  _startScanning = () => {
    startScanning()
      .then(() => this.setState({ scanning: true, statusText: null }))
      .then(() => console.log('started scanning'))
      .catch((error: any) => console.log('[startScanning]', error));
  };
  _stopScanning = () => {
    stopScanning()
      .then(() =>
        this.setState({ scanning: false, beacons: [], statusText: null })
      )
      .then(() => console.log('stopped scanning'))
      .catch((error: any) => console.log('[stopScanning]', error));
  };
  _restartScanning = () => {
    restartScanning()
      .then(() =>
        this.setState({ scanning: true, beacons: [], statusText: null })
      )
      .then(() => console.log('restarted scanning'))
      .catch((error: any) => console.log('[restartScanning]', error));
  };
  _isScanning = () => {
    isScanning()
      .then((result: any) => {
        this.setState({
          statusText: `Device is currently ${result ? '' : 'NOT '}scanning.`,
        });
        console.log('Is device scanning?', result);
      })
      .catch((error: any) => console.log('[isScanning]', error));
  };
  _isConnected = () => {
    isConnected()
      .then((result: any) => {
        this.setState({
          statusText: `Device is ${result ? '' : 'NOT '}ready to scan beacons.`,
        });
        console.log('Is device connected?', result);
      })
      .catch((error: any) => console.log('[isConnected]', error));
  };
  _getBeaconRegions = () => {
    getBeaconRegions()
      .then((regions: any) => console.log('regions', regions))
      .catch((error: any) => console.log('[getBeaconRegions]', error));
  };

  /**
   * Helper function used to identify equal beacons
   */
  _isIdenticalBeacon = (b1: typeof IBeaconAndroid, b2: typeof IBeaconAndroid) =>
    b1.uniqueId === b2.uniqueId &&
    b1.uuid === b2.uuid &&
    b1.major === b2.major &&
    b1.minor === b2.minor;

  _renderBeacons = () => {
    const colors = ['#F7C376', '#EFF7B7', '#F4CDED', '#A2C8F9', '#AAF7AF'];
  };

  _renderEmpty = () => {
    const { scanning, beacons } = this.state;
    let text;
    if (!scanning) text = 'Start scanning to listen for beacon signals!';
    if (scanning && !beacons.length) text = 'No beacons detected yet...';
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  _renderStatusText = () => {
    const { statusText } = this.state;
    return statusText ? (
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: 'red' }]}>{statusText}</Text>
      </View>
    ) : null;
  };

  _renderButton = (
    text: string,
    onPress: () => void,
    backgroundColor: ColorValue
  ) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );

  displayUpdate = (displayName: string) => {
    console.log("Map state: ", this.state.map)
    this.setState({isLoading: true});
    firestore()
    .collection('meteorites')
    .where('DISPLAY_NAME', 'in', [displayName])
    .get()
    .then(querySnapshot => {
      const meteors: React.SetStateAction<any[]> =  []
  
      querySnapshot.forEach(documentSnapshot => {
        meteors.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      this.setState({meteorites: meteors, isLoading: false});
  });
  }
/*
  changeMode = () => {
    this.setState({qrCamera: true});
  }
  devices = useCameraDevices()
  device = this.devices.back
*/

content = "Most meteorites come from asteroids, space rocks that orbit the Sun in a belt between Mars and Jupiter.About 4.5 billion years ago, the nine planets in our Solar System started to take shape from a cloud of gas and dust spinning around the Sun."
  render() {
    const data = this.props.route.params;
    let displayName = "";
    if(data != null){
      displayName = data.barcodeText;
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.testButtons}>
          <PaperButton icon="qrcode"  mode="contained" onPress={() => this.props.navigation.navigate('BleTest')}>
            Use QR code scanner
          </PaperButton>
        </View>
        <Image source={this.state.map} resizeMode="cover" style={{width: "101%", height: "42%"}} />
        <View style={styles.testButtons}>
          <PaperButton mode="contained" onPress={() => this.displayUpdate('Texas')}>
          Display 2</PaperButton>
          <PaperButton mode="contained" onPress={() => this.displayUpdate('Mexico')}>
          Display 3</PaperButton>
          <PaperButton mode="contained" onPress={() => this.displayUpdate('test4')}>
          Display 4</PaperButton>
        </View>
        <Button title="request permissions" onPress={requestLocationPermission} />
        <View style={styles.buttonContainer}>
          {this._renderButton('Start scan', this._startScanning, '#84e2f9')}
          {this._renderButton('Stop scan', this._stopScanning, '#84e2f9')}
          {this._renderButton('Restart scan', this._restartScanning, '#84e2f9')}
        </View>

      { this.state.isLoading &&
        <View style={styles.activityLoaderContainer}>
          <ActivityIndicator size="large"/>
        </View>
      } 

      { !this.state.isLoading &&
      <FlatList style={{ margin: 5 }}
        data={this.state.meteorites}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, marginVertical: 25,marginHorizontal: 5, backgroundColor: '#ddd', height: 300, borderRadius: 15}}>
            <Card  onPress={() => this.props.navigation.navigate('DetailScreen' , item)}>
              <Card.Cover source={{ uri: item.PICTURES}} resizeMode='cover'/>
              <Card.Title title={item.METEORITE_} subtitle={item.CATALOG} />
              <Card.Content>
                <Paragraph>{item.LOCATION}</Paragraph>
              </Card.Content>
              <Card.Actions>
              <PaperButton onPress={() => this.props.navigation.navigate('DetailScreen' , item)}>{i18n.t('view')}</PaperButton>
              </Card.Actions>
            </Card>
          </View>
        )} />
      }
      <PaperDivider/>
        <Card style={{marginLeft: 10, marginRight: 10, marginTop:5}}>
          <Card.Content>
            <Title>
              Asteroids
             </Title>
            <PaperText>
                <TranslateText text={this.content} lang={i18n.locale} status={this.state.playStatus}/></PaperText>
          </Card.Content>
          <Card.Actions>
           <PaperButton style={{margin: 5}}
              icon="play-circle" mode="contained"
              //Make button change to pause-circle when pressed
              onPress={() => this.setState({playStatus: "Play"})}
              >Play</PaperButton>
            <PaperButton 
              icon="stop-circle" mode="contained"
              //Make button change to pause when pressed
              onPress={() => this.setState({playStatus: "Stop"})}
              >Stop</PaperButton>
          </Card.Actions>
        </Card>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 5,
  },
  activityLoaderContainer: {
    flex: 1,
    justifyContent: "center"
  },
  testButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pauseButton: {
      marginTop: 30,
      marginLeft: 30,
      alignSelf: 'flex-start',
      justifyContent: 'center'
  },
  playButton: {
      alignSelf: 'flex-start',
      justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  beacon: {
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
});

//export default withNavigation(AssistanceScreen);