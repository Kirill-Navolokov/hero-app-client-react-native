import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Main'
                component={MainScreen}
                options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}