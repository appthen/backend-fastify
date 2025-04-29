import { ObjectId } from 'mongodb';

declare module 'mongodb' {
  interface Document {
    _id?: ObjectId | string;
  }

  interface Filter<T> {
    [key: string]: any;
  }
} 