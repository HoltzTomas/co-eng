ALTER TABLE "chunk" DROP CONSTRAINT "chunk_file_id_files_id_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_subject_id_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "chunk" ADD CONSTRAINT "chunk_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;