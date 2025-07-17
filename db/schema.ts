import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const wods = sqliteTable('wods', {
    id: text().primaryKey(),
    unitId: text(),
    name: text().notNull(),
    description: text().notNull(),
    scheme: text().notNull(),
    executionDate: integer({mode:'timestamp'}).notNull(),
    creationDate: integer({mode:'timestamp'}).notNull(),
    type: integer().notNull(),
    imageUrl: text().notNull(),
    backgroundUrl: text()
});

export const units = sqliteTable('units', {
    id: text().primaryKey(),
    name: text().notNull(),
    description: text().notNull(),
    type: integer().notNull(),
    foundationDate: integer({mode:'timestamp'}).notNull(),
    imageUrl: text().notNull(),
    socialNetworks: text()
});

export const advices = sqliteTable('advices', {
    author: text().primaryKey(),
    advices: text('advices', { mode: 'json'})
        .notNull()
        .$type<string[]>()
        .default(sql`(json_array())`)
});

export const faqs = sqliteTable('faqs', {
    question: text().primaryKey().notNull(),
    answer: text().notNull()
});

// Export Task to use as an interface in your app
export type Wod = typeof wods.$inferSelect;
export type Unit = typeof units.$inferSelect;
export type Advice = typeof advices.$inferSelect;
export type Faq = typeof faqs.$inferSelect;