import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const CustomText = (props) => {
  const [loaded] = useFonts({
    'Hensa': require('./assets/fonts/Hensa.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Text style={{ fontFamily: 'Hensa', ...props.style }}>
      {props.children}
    </Text>
  );
};

export default CustomText;
