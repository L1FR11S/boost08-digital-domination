import { z } from "zod";

export const blogLeadSchema = z.object({
  email: z.string().email("Ogiltig e-postadress").max(255, "E-post får vara max 255 tecken"),
  name: z.string().max(100, "Namn får vara max 100 tecken").optional(),
  company: z.string().max(200, "Företagsnamn får vara max 200 tecken").optional(),
  leadType: z.string().max(50, "Lead type får vara max 50 tecken").optional(),
  postId: z.string().uuid("Ogiltigt post ID").optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Namn krävs").max(100, "Namn får vara max 100 tecken"),
  email: z.string().email("Ogiltig e-postadress").max(255, "E-post får vara max 255 tecken"),
  company: z.string().max(200, "Företagsnamn får vara max 200 tecken").optional(),
  message: z.string().min(1, "Meddelande krävs").max(2000, "Meddelande får vara max 2000 tecken"),
});

export const roiCalculatorSchema = z.object({
  name: z.string().min(1, "Namn krävs").max(100, "Namn får vara max 100 tecken"),
  email: z.string().email("Ogiltig e-postadress").max(255, "E-post får vara max 255 tecken"),
  phone: z.string().min(1, "Telefon krävs").max(20, "Telefon får vara max 20 tecken"),
  company: z.string().min(1, "Företag krävs").max(200, "Företag får vara max 200 tecken"),
  industry: z.string().min(1, "Bransch krävs").max(100, "Bransch får vara max 100 tecken"),
  locations: z.number().int("Måste vara heltal").positive("Måste vara positivt").max(10000, "Max 10000 platser"),
  reviews: z.number().int("Måste vara heltal").min(0, "Kan inte vara negativt").max(100000, "Max 100000 recensioner"),
});

export const freeTrialSchema = z.object({
  companyName: z.string().min(1, "Företagsnamn krävs").max(200, "Företagsnamn får vara max 200 tecken"),
  fullName: z.string().min(1, "Namn krävs").max(100, "Namn får vara max 100 tecken"),
  email: z.string().email("Ogiltig e-postadress").max(255, "E-post får vara max 255 tecken"),
  phone: z.string().min(1, "Telefon krävs").max(20, "Telefon får vara max 20 tecken"),
  locations: z.number().int("Måste vara heltal").positive("Måste vara positivt").max(10000, "Max 10000 platser"),
  industry: z.string().min(1, "Bransch krävs").max(100, "Bransch får vara max 100 tecken"),
});

export const exitIntentSchema = z.object({
  email: z.string().email("Ogiltig e-postadress").max(255, "E-post får vara max 255 tecken"),
});

// HTML sanitization helper
export function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
