import { z } from "zod";

export const onboardingSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),

  country: z.string().min(1, "Country is required"),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
