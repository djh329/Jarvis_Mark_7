import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import firebase from 'react-native-firebase';
import thunk from 'redux-thunk';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import reducers from './reducers'
import firebaseMiddleware from './middleware/firebase'

// import the different screens
import Loading from './Components/Auth/Loading'
import SignUp from './Components/Auth/SignUp'
import Login from './Components/Auth/Login'
import Main from './Components/Main'
import Initialize from './Components/Initialize'

// create our app's navigation stack
const AppContainer = createAppContainer(createSwitchNavigator({
  Loading,
  SignUp,
  Login,
  Main
},
{
  initialRouteName: 'Loading'
}));

const store = createStore(reducers, applyMiddleware(firebaseMiddleware, thunk));
global.store = store

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Initialize />
        <AppContainer />
      </Provider>
    );
  }
}

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//
//   async componentDidMount() {
//     // TODO: You: Do firebase things
//     // const { user } = await firebase.auth().signInAnonymously();
//     // console.warn('User -> ', user.toJSON());
//
//     // await firebase.analytics().logEvent('foo', { bar: '123'});
//   }
//
//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
//           <Text style={styles.welcome}>
//             Welcome to {'\n'} React Native Firebase
//           </Text>
//           <Text style={styles.instructions}>
//             To get started, edit App.js
//           </Text>
//           {Platform.OS === 'ios' ? (
//             <Text style={styles.instructions}>
//               Press Cmd+R to reload,{'\n'}
//               Cmd+D or shake for dev menu
//             </Text>
//           ) : (
//             <Text style={styles.instructions}>
//               Double tap R on your keyboard to reload,{'\n'}
//               Cmd+M or shake for dev menu
//             </Text>
//           )}
//           <View style={styles.modules}>
//             <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
//             {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
//             {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
//             {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
//             {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
//             {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
//             {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
//             {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
//             {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
//             {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
//             {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
//             {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
//             {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
//             {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
//             {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   logo: {
//     height: 120,
//     marginBottom: 16,
//     marginTop: 64,
//     padding: 10,
//     width: 135,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   modules: {
//     margin: 20,
//   },
//   modulesHeader: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   module: {
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   }
// });
