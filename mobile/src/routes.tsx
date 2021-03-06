import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const { Navigator , Screen} = createStackNavigator();

import OrphanageMap from './pages/OrphanageMap';
import OrphanageDetails from './pages/OrphanageDetails';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Header'
 
export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown : false , cardStyle : {backgroundColor:'#f2f3f5'}}}>
                <Screen name="OrphanageMap" component={OrphanageMap}/>
                <Screen 
                name="OrphanageDetails" 
                component={OrphanageDetails} 
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />
                }}/>
                <Screen name="OrphanageData" component={OrphanageData} 
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os Dados"/>
                }}/>
                <Screen name="SelectMapPosition" component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa"/>
                }}/>


            </Navigator>
        </NavigationContainer>
    );
}
