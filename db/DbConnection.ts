import { sql } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { advices, businesses, categories, faqs, units, wods } from "./schema";

export class DbConnection {
    private initialized: boolean = false;
    private _db!: ExpoSQLiteDatabase;

    get db(): ExpoSQLiteDatabase {
        return this._db;
    }

    init(db: ExpoSQLiteDatabase): void {
        if(this.initialized)
            return;

        this._db = db;
    }

    async dropData(): Promise<void> {
        if(!this.initialized)
            return;

        await Promise.all([
            this.db.delete(wods),
            this.db.delete(units),
            this.db.delete(advices),
            this.db.delete(faqs),
            this.db.delete(businesses),
            this.db.delete(categories)
        ]);
    }
}