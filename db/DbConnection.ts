import { sql } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export class DbConnection {
    private initialized: boolean = false;
    private _db!: ExpoSQLiteDatabase;

    init(db: ExpoSQLiteDatabase): void {
        if(this.initialized)
            return;

        this._db = db;
    }

    get db(): ExpoSQLiteDatabase {
        return this._db;
    }
}