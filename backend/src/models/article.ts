import { date } from "joi";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

interface img extends Document {
  author: {
    thumbnail: string;
    name: string;
    url: string;
  };
  metadata: {
    date: string;
    keywords: string[];
    linkedin: string;
    thumbnail: string;
    length: number;
  };
  content: string[];
  title: string;
  _id: string;
}

const articleSchema: Schema = new Schema({
  author: {
    thumbnail: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  metadata: {
    date: { type: String, required: true },
    keywords: { type: [String], required: true },
    linkedin: { type: String, required: false },
    thumbnail: { type: String, required: true },
    length: { type: Number, required: true },
  },
  content: { type: [String], required: true },
  title: { type: String, required: true },
  _id: { type: String, required: true, unique: true },
});

const article = mongoose.model<img>("Article", articleSchema);
export default article;
