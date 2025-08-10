import { Wod } from "@/db/schema";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type BusinessesStackNavigationList = {
    Businesses: undefined, // undefined because you aren't passing any params to the home screen
  };

export type BusinessesNavigationProp = NavigationProp<
    BusinessesStackNavigationList,
    'Businesses'
>;