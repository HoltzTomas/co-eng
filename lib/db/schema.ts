import { pgTable, serial, text, timestamp, real, integer } from 'drizzle-orm/pg-core';

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const files = pgTable('files', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  subjectId: integer('subject_id').notNull().references(() => subjects.id),
  size: real("size").notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const chunk = pgTable("chunk", {
  id: serial("id").primaryKey().notNull(),
  fileId: serial("file_id").notNull().references(() => files.id),
  chunkNumber: integer("chunk_number").notNull(),
  content: text("content").notNull(),
  embedding: real("embedding").array().notNull(),
});

