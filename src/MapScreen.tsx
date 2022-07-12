import React from 'react';
import {StyleSheet, Modal, View, Text, TextInput, Button} from 'react-native';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import {storage} from '../App';
import {MapScreenState, MarkerData} from './CustomTypes';

class MapScreen extends React.Component<MapScreenState> {
  state: Readonly<MapScreenState> = {
    markers: [],
    modalVisible: false,
    lastMapPressCoordinate: {latitude: 0, longitude: 0},
    newMarkerDescription: '',
  };

  fetchMarkers = async () => {
    if (storage.contains('pokemon_markers')) {
      const jsonMarkers = storage.getString('pokemon_markers');
      if (jsonMarkers !== undefined) {
        const markers = JSON.parse(jsonMarkers);
        this.setState({markers: markers});
      }
    }
  };

  componentDidMount() {
    this.fetchMarkers();
  }

  onLongPress(e: MapEvent) {
    this.setState({
      modalVisible: true,
      lastMapPressCoordinate: e.nativeEvent.coordinate,
    });
  }

  genMarkerKey(marker: MarkerData) {
    const {coordinate} = marker;
    return `key_${coordinate.latitude}_${coordinate.longitude}`;
  }

  saveMarker = () => {
    const {lastMapPressCoordinate, newMarkerDescription} = this.state;
    const marker: MarkerData = {
      coordinate: lastMapPressCoordinate,
      description: newMarkerDescription,
    };
    const markers = [...this.state.markers, marker];
    this.setState({markers});
    this.hideModal();
    storage.set('pokemon_markers', JSON.stringify(markers));
  };

  onDescriptionChange = (text: string) => {
    this.setState({newMarkerDescription: text});
  };

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.map}>
        <MapView style={styles.map} onLongPress={e => this.onLongPress(e)}>
          {this.state.markers.map(marker => {
            return (
              <Marker
                key={this.genMarkerKey(marker)}
                coordinate={marker.coordinate}
                description={marker.description}
              />
            );
          })}
        </MapView>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType={'slide'}>
          <View style={styles.modalView}>
            <View style={styles.modal}>
              <Text style={styles.modalText}>New pokemon marker</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Description"
                onChangeText={this.onDescriptionChange}
              />
              <Button title="Cancel" onPress={this.hideModal} />
              <Button title="Save" onPress={this.saveMarker} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  modal: {
    width: '70%',
    height: '30%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 24,
  },
  textInput: {
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    width: '100%',
    height: '30%',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default MapScreen;
