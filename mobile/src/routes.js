import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: { 
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Github Profile'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#e84d49',
            },
        },  
    })
);

export default Routes;