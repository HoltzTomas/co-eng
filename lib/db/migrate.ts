import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({ path: ".env.local" });

async function runMigrate() {
  if (!process.env.POSTGRES_URL)
    throw new Error("POSTGRES_URL is not defined");

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("Running migrattions...");

  await migrate(db, { migrationsFolder: "./migrations" });

  console.log("Migration complete");

  process.exit(0);
}

runMigrate().catch((error) => {
  console.error("Migration failed");
  console.error(error);
  process.exit(1);
})