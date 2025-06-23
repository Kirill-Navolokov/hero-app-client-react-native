import { Wod } from "@/models/Wod";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type WodsStackNavigationList = {
    Wods: undefined, // undefined because you aren't passing any params to the home screen
    WodDetailsScreen: { 
        wod: Wod,
        title: string
    }; 
  };

export type WodsNavigationProp = NavigationProp<
    WodsStackNavigationList,
    'Wods'
>;

export type WodDetailsNavigationProp = NavigationProp<
    WodsStackNavigationList,
    'WodDetailsScreen'
>

export type WodDetailsRouteProp = RouteProp<
    WodsStackNavigationList,
    'WodDetailsScreen'
>