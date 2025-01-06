import { api } from "./ApiConstants";
import { IRestService } from "./IRestService";
import { injectable } from "inversify";

@injectable()
export class RestService implements IRestService {
    async getData<T>(url: string): Promise<T> {
        return new Promise<T>(resolve => {
            var endpointUrl = api.baseUrl + url;
            fetch(endpointUrl, )
                //.then(response => response.json())
                .then((x) => handleDates(x.json()) as Promise<T>)
                .then(body => resolve(body))
                .catch(error => console.log(error))
        })
    }
}

const handleDates = (data: unknown) => {
    console.log("Handle date")
    if (isIsoDateString(data)) {
        console.log("isIsoDateString");
        return new Date(data)
    };
    if (data === null || data === undefined || typeof data !== typeof Object){
        console.log(typeof data)
        return data;
    }
  
    for (const [key, val] of Object.entries(data)) {
      // @ts-expect-error this is a hack to make the type checker happy
      if (isIsoDateString(val)) data[key] = parseISO(val);
      else if (typeof val === "object") handleDates(val);
    }
  
    return data
  };

  const ISODateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: unknown): value is string => {
  return typeof value === "string" && ISODateFormat.test(value);
};