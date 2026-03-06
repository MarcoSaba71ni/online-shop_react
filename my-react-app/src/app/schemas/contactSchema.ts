import { z } from 'zod';

export const contactSchema = z.object( {
    name: z.
        string()
        .min( 3, 'Name must be at least 3 characters long' )
        .max( 50, 'Name must be less than 50 characters long' ),
    subject: z.
        string()
        .min( 3, 'Subject must be at least 3 characters long' )
        .max( 100, 'Subject must be less than 100 characters long'),
    email: z.
        string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    message: z
        .string()
        .min( 10, 'Message must be at least 10 characters long' )
        .max( 1000, 'Message must be less than 1000 characters long' ),
});

export default contactSchema;
export type ContactFormData = z.infer<typeof contactSchema>;