export const environment = {
  production: true,
  apiUrlEndpoint: 'https://hivarium.herokuapp.com',
  googleAnalytics: {
    web: 'UA-107304143-2',
    ios: 'UA-102909242-3',
    chromeExtension: 'UA-102909242-2'
  },
  hostUrlForSharingToWeb: 'https://hivarium.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyBwmXj52--PyL9lihDTSp9A4E5k4sg1giI',
    authDomain: 'hivarium.firebaseapp.com',
    databaseURL: 'https://hivarium.firebaseio.com',
    projectId: 'hivarium',
    storageBucket: 'gs://hivarium.appspot.com/',
    messagingSenderId: '3364304688'
  },
  stripe: {
    publishableKey: 'pk_live_ee9MNzGQ4YeBswQ2dt8p4e9k'
  }
};
