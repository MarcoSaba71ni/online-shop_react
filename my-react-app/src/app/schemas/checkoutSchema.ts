import { z } from 'zod';

export const checkoutSchema = z.object({

  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  lastName: z.string()
    .min(3)
    .max(50),

  email: z.string()
    .email("Please enter a valid email address"),

  address: z.string()
    .min(5)
    .max(100),

  city: z.string()
    .min(3)
    .max(100),

  county: z.string()
    .min(3)
    .max(100),

  zip: z.string()
    .regex(/^\d{5}$/, "Zip must be 5 digits"),

  cardName: z.string()
    .min(3, "Cardholder name is required"),

  cardNumber: z.string()
    .regex(/^\d{16}$/, "Card number must be 16 digits"),

  expirationDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),

  cvv: z.string()
    .regex(/^\d{3}$/, "CVV must be 3 digits")

});

export default checkoutSchema;
export type checkoutFormData = z.infer<typeof checkoutSchema>;