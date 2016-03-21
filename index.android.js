/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import VoxImplant from 'react-native-voximplant';

VoxImplant.SDK.closeConnection();

var currentCallId;
DeviceEventEmitter.addListener('LoginSuccessful', (...args) => {
  console.log('LoginSuccessful', args);
  VoxImplant.SDK.createCall('test', true, null, (callId) => {
    console.log('MADE CALL', callId);
    // console.log('create call', arguments);
    currentCallId = callId;
    VoxImplant.SDK.startCall(callId, {'X-DirectCall' : 'true'});
  });
});
DeviceEventEmitter.addListener('LoginFailed', (...args) => console.log('LoginFailed', args));
DeviceEventEmitter.addListener('ConnectionSuccessful', (...args) => console.log('ConnectionSuccessful', args));
DeviceEventEmitter.addListener('ConnectionClosed', (...args) => console.log('ConnectionClosed', args));
DeviceEventEmitter.addListener('ConnectionFailed', (...args) => console.log('ConnectionFailed', args));
DeviceEventEmitter.addListener('CallConnected', (...args) => console.log('CallConnected', args));
DeviceEventEmitter.addListener('CallDisconnected', (...args) => console.log('CallDisconnected', args));
DeviceEventEmitter.addListener('CallRinging', (...args) => console.log('CallRinging', args));
DeviceEventEmitter.addListener('CallFailed', (...args) => console.log('CallFailed', args));
DeviceEventEmitter.addListener('CallAudioStarted', (...args) => console.log('CallAudioStarted', args));
// DeviceEventEmitter.addListener('IncomingCall', (...args) => console.log('IncomingCall', args));
DeviceEventEmitter.addListener('SIPInfoReceivedInCall', (...args) => console.log('SIPInfoReceivedInCall', args));
DeviceEventEmitter.addListener('MessageReceivedInCall', (...args) => console.log('MessageReceivedInCall', args));

DeviceEventEmitter.addListener('ConnectionSuccessful', () => {
  console.log('Connection successful');
  VoxImplant.SDK.switchToCamera('front');
  VoxImplant.SDK.login('test@mysterycall.vespakoen.voximplant.com', 'testing');
});
DeviceEventEmitter.addListener('IncomingCall', (incomingCall) => {
  console.log('Inbound call');
  currentCallId = incomingCall.callId;
  VoxImplant.SDK.answerCall(currentCallId);
  // answer call VoxImplant.SDK.answerCall(currentCallId);
  // or
  // reject call VoxImplant.SDK.declineCall(currentCallId);
});
VoxImplant.SDK.connect();

class MysteryCall extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VoxImplant.RemoteView style={styles.remoteview} callId={currentCallId}></VoxImplant.RemoteView>
        <VoxImplant.Preview style={styles.selfview}></VoxImplant.Preview>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  remoteview: {
    flex: 1
  },
  selfview: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 150,
    height: 200
  }
});

AppRegistry.registerComponent('MysteryCall', () => MysteryCall);
