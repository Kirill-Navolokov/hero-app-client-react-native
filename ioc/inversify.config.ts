import 'reflect-metadata';
import { TYPES } from "./TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import { WodService } from "@/services/Wods/WodService";
import { IRestService } from "@/api/IRestService";
import { RestService } from "@/api/RestService";
import { Container } from "inversify";
import { ISecureStorage } from '@/services/ISecureStorage';
import { SecureStorage } from '@/services/SecureStorage';
import { IAuthService } from '@/services/Auth/IAuthService';
import { AuthService } from '@/services/Auth/AuthService';
import { IPreferencesService } from '@/services/Preferences/IPreferencesService';
import { PreferencesService } from '@/services/Preferences/PreferencesService';
import { UnitsService } from '@/services/Units/UnitsService';
import { IUnitsService } from '@/services/Units/IUnitsService';

const iocContainer = new Container();
iocContainer.bind<IWodService>(TYPES.WodService).to(WodService).inSingletonScope();
iocContainer.bind<IRestService>(TYPES.RestService).to(RestService).inSingletonScope();
iocContainer.bind<ISecureStorage>(TYPES.SecureStorage).to(SecureStorage).inSingletonScope();
iocContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
iocContainer.bind<IPreferencesService>(TYPES.PreferencesService).to(PreferencesService).inSingletonScope();
iocContainer.bind<IUnitsService>(TYPES.UnitsService).to(UnitsService).inSingletonScope();

export { iocContainer };