import { Unit } from "@/db/schema";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type UnitsStackNavigationList = {
    Units: undefined, // undefined because you aren't passing any params to the home screen
    UnitDetailsScreen: { 
        unit: Unit,
        title: string
    }; 
  };

export type UnitsNavigationProp = NavigationProp<
    UnitsStackNavigationList,
    'Units'
>;

export type UnitDetailsNavigationProp = NavigationProp<
    UnitsStackNavigationList,
    'UnitDetailsScreen'
>

export type UnitDetailsRouteProp = RouteProp<
    UnitsStackNavigationList,
    'UnitDetailsScreen'
>