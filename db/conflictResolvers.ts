
import { SQLiteInsertOnConflictDoUpdateConfig } from "drizzle-orm/sqlite-core";
import { wods } from "./schema";
import { sql } from "drizzle-orm";

export default function wodConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
    return {
        target: wods.id,
        set: {
            unitId: sql.raw(`excluded.unitId`),
            name: sql.raw(`excluded.name`),
            description: sql.raw(`excluded.description`),
            scheme: sql.raw(`excluded.scheme`),
            executionDate: sql.raw(`excluded.executionDate`),
            creationDate: sql.raw(`excluded.creationDate`),
            type: sql.raw(`excluded.type`),
            imageUrl: sql.raw(`excluded.imageUrl`),
            backgroundUrl: sql.raw(`excluded.backgroundUrl`)
        }
    }
}