import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  team: z.string().trim().max(150).optional().or(z.literal("")),
});

export const submitEarlyAccess = createServerFn({ method: "POST" })
  .inputValidator((input) => Schema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("early_access_signups").insert({
      name: data.name,
      email: data.email,
      team: data.team ? data.team : null,
    });
    if (error) {
      if (error.code === "23505") {
        return { ok: true, duplicate: true as const };
      }
      console.error("early access insert error", error);
      throw new Error("Could not save your signup. Please try again.");
    }
    return { ok: true, duplicate: false as const };
  });
