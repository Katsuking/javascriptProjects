import { AnyZodObject } from 'zod';

export default interface validatorsType {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}
