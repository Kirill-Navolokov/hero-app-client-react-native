import 'reflect-metadata';
import { TYPES } from "./TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import { WodService } from "@/services/Wods/WodService";
import { IRestService } from "@/api/IRestService";
import { RestService } from "@/api/RestService";
import { Container } from "inversify";

const iocContainer = new Container();
iocContainer.bind<IWodService>(TYPES.WodService).to(WodService).inSingletonScope();
iocContainer.bind<IRestService>(TYPES.RestService).to(RestService).inSingletonScope();

export { iocContainer };