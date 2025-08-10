import { Advice, Faq } from "@/db/schema";

export interface ISupportService {
    getAdvices(): Promise<Array<Advice>>;

    getFaqs(): Promise<Array<Faq>>;
}