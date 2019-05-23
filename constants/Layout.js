import { Dimensions } from 'react-native';
import colors from './Colors';
import fonts from './Fonts';

const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,

  styles: {
    container: {
      flex: 1,
      backgroundColor: colors.registerLight,
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      paddingVertical: 50,
      alignItems: 'stretch',
    },
    button: {
      backgroundColor: colors.white,
      color: colors.registerDark,
      alignSelf: 'center',
      marginHorizontal: 20,
      borderRadius: 15,
    },
    buttonText: {
      color: colors.registerDark,
      fontFamily: fonts.main,
      fontSize: 20,
      padding: 20,
    },
  },
};
