
import { SQLiteInsertOnConflictDoUpdateConfig } from "drizzle-orm/sqlite-core";
import { advices, faqs, units, wods } from "./schema";
import { sql } from "drizzle-orm";

export function wodConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
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

export function unitConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
    return {
        target: units.id,
        set: {
            name: sql.raw(`excluded.name`),
            description: sql.raw(`excluded.description`),
            type: sql.raw(`excluded.type`),
            foundationDate: sql.raw(`excluded.foundationDate`),
            imageUrl: sql.raw(`excluded.imageUrl`),
            socialNetworks: sql.raw(`excluded.socialNetworks`)
        }
    }
}

export function adviceConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
    return {
        target: advices.author,
        set: {
            advices: sql.raw(`excluded.advices`)
        }
    }
}

export function faqConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
    return {
        target: faqs.question,
        set: {
            answer: sql.raw(`excluded.answer`)
        }
    }
}