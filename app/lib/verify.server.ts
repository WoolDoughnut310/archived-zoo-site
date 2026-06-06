import { eq } from "drizzle-orm";
import { licenses } from "./schema";
import { getDb } from "./db";

export async function isLicensed(email: string, env: Env): Promise<boolean> {
  const db = getDb(env);
  const record = await db
    .select()
    .from(licenses)
    .where(eq(licenses.email, email.toLowerCase()))
    .get();
  return !!record;
}
