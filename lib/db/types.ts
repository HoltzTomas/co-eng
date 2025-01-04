import type { folders, files, chunks } from './schema';
import type { InferInsertModel } from 'drizzle-orm';

export type Folder = InferInsertModel<typeof folders>;

export type File = InferInsertModel<typeof files>;

export type Chunk = InferInsertModel<typeof chunks>;
