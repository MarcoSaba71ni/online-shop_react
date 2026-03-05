import { z } from 'zod';

export const checkoutSchema = z.object({
    name: z.
        string()
        .min( 3, 'Name must be at least 3 characters long' )
        .max( 50, 'Name must be less than 50 characters long'),
    lastName: z. 
        string()
        .min( 3, 'Name must be at least 3 characters long' )
        .max( 50, 'Name must be less than 50 characters long'),
    email: z.
        string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    address: z.
        string()
        .min( 5, 'address must be at least 5 characters long' )
        .max( 1000, 'address must be less than 1000 characters long'),
    city: z.
        string()
        .min( 3, 'City must be at least 3 characters long' )
        .max( 1000, 'City must be less than 1000 characters long'),
    county: z.
        string()
        .min( 3, 'Count must be at least 3 characters long' )
        .max( 1000, 'County must be less than 1000 characters long'),
    zip: z.
        number('Zip Code must to be a 5 digits number'),
    cardNumber: z.
        number('Must to be a number'),
    expirationData: z.
        number('It must to be 6 digits'),
    cvv: z.
        number('CVV must to be 3 digits'),    
});

export default checkoutSchema;
export type checkoutFormData = z.infer<typeof checkoutSchema>;