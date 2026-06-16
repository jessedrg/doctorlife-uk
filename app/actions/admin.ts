"use server"

import { db } from "@/lib/db"
import { user as userTable, doctorProfiles } from "@/lib/db/schema"
import { getSessionUser } from "@/lib/session"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const u = await getSessionUser()
  if (!u || u.role !== "admin") throw new Error("Unauthorized")
  return u
}

/** Promotes a user (by email) to the doctor role and seeds a doctor profile. */
export async function promoteToDoctor(email: string) {
  await requireAdmin()
  const [target] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email.trim().toLowerCase()))
    .limit(1)

  if (!target) return { ok: false, error: "No existe ningún usuario con ese email." }

  await db
    .update(userTable)
    .set({ role: "doctor", updatedAt: new Date() })
    .where(eq(userTable.id, target.id))

  const [existing] = await db
    .select()
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, target.id))
    .limit(1)

  if (!existing) {
    await db.insert(doctorProfiles).values({ userId: target.id, fullName: target.name })
  }

  revalidatePath("/admin")
  return { ok: true }
}

export async function listUsers() {
  await requireAdmin()
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .orderBy(userTable.createdAt)
}
