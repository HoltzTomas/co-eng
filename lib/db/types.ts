import type { subjects, files, chunk } from './schema';
import type { InferInsertModel } from 'drizzle-orm';

export type Subject = InferInsertModel<typeof subjects>;

export type File = InferInsertModel<typeof files>;

export type Chunk = InferInsertModel<typeof chunk>;
