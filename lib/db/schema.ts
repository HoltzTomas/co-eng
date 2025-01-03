import { pgTable, text, timestamp, real, integer, uuid } from 'drizzle-orm/pg-core';

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),  // User id
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const files = pgTable('files', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id,  { onDelete: 'cascade' }),
  size: integer("size").notNull(),
  url: text('url'),
  userId: text('user_id').notNull(),  // User id
  createdBy: text('created_by').notNull(),  // Email address
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const chunk = pgTable("chunk", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  fileId: uuid("file_id").notNull().references(() => files.id,  { onDelete: 'cascade' }),
  chunkNumber: integer("chunk_number").notNull(),
  content: text("content").notNull(),
  embedding: real("embedding").array().notNull(),
});

