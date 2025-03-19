import { ObjectId } from 'mongodb';

declare module 'mongodb' {
  interface Document {
    _id?: string | ObjectId;
  }
} 