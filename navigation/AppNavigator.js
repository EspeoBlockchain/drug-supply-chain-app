import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import VendorScreen from '../screens/VendorScreen';
import CarrierScreen from '../screens/CarrierScreen';
import VerifierScreen from '../screens/VerifierScreen';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    QRCode: QRCodeScreen,
    Vendor: {
      screen: VendorScreen,
    },
    Carrier: CarrierScreen,
    Verifier: VerifierScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: colors.white,
      headerTitle: 'Home',
      headerStyle: {
        backgroundColor: colors.verifyLight,
        fontFamily: fonts.main,
      },
    },
  },
);

export default createAppContainer(AppNavigator);
