import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// Convert prisma object into a regular JS Object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
/**
  converts a Prisma object into a regular JavaScript 
  object by serializing it to JSON and then parsing it back.

  JSON.stringify(value): Converts the object into a JSON string.
  JSON.parse(...): Parses the string back into a JavaScript object.
  This removes any additional properties or prototype methods that Prisma may have added.

  The T in convertToPlainObject<T>(value: T): T is a TypeScript generic type parameter. 
  It allows the function to be flexible and work with any type while preserving the input type in the output.

  <T>: Declares a generic type T. This means T can be any type.
  value: T: The function accepts a parameter value of type T, making it type-safe.
  return JSON.parse(JSON.stringify(value)): Converts the object into JSON and back, stripping any additional metadata.
  : T: The function returns the same type T, ensuring type consistency.


  EG: If you call the function with Product object, then typscrpt knows 
  that the return value will also be the type of Product
* 
*/




// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split('.');
    return decimal ? `${int}.${decimal.padEnd(2, '0')}`: `${int}.00`

    // eg: if it's 49.8 add 0 to it: 49.90

}



// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
    if (error.name === 'ZodError') {
      // handle zod error
      const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message );
      return fieldErrors.join('. ')
    } else if (error.name === 'PrismaClientKnownRequestError' || error.code === 'P2004') {
      // Handle prisma error
      const field = error.meta?.target ? error.meta.target[0] : 'Field';
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist`;
    } else {

      return typeof error.message === 'string' ? error.message: JSON.stringify(error.message)

    }
}



// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === 'number') {
    /**
       eg, : 12.345 --> 12.35
     */
    return Math.round((value +  Number.EPSILON) * 100 / 100)

  } else if (typeof value === 'string') {
    return Math.round((Number(value) +  Number.EPSILON) * 100 / 100)

  } else {
    
    throw new Error('Value is not a number or string')
  }



}

