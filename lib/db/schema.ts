import { pgTable, text, timestamp, real, integer, uuid, AnyPgColumn } from 'drizzle-orm/pg-core';

export const folders = pgTable('folders', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  parentId: uuid('parentId').references((): AnyPgColumn => folders.id),
  userId: text('userId').notNull(),  // User id
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const files = pgTable('files', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  folderId: uuid('folderId').notNull().references(() => folders.id),
  size: integer("size").notNull(),
  userId: text('userId').notNull(),  // User id
  createdBy: text('createdBy').notNull(),  // Email address
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const chunks = pgTable("chunks", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  fileId: uuid("fileId").notNull().references(() => files.id),
  chunkNumber: integer("chunkNumber").notNull(),
  content: text("content").notNull(),
  embedding: real("embedding").array().notNull(),
});

