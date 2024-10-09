import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IphotoServices extends Document {
  photoServices: {
    title: string;
    handle: string;
    description: string;
    column1: string[];
    column2: string[];
    column3: string[];
    column4: string[];
  };
}
const photoServicesSchema = new Schema({
  title: { type: String, required: true },
  handle: { type: String, required: true },
  description: { type: String, required: true },
  column1: { type: [String], required: true },
  column2: { type: [String], required: true },
  column3: { type: [String], required: true },
  column4: { type: [String], required: true },
});

// Create a Model
const IphotoServices = mongoose.model<IphotoServices>(
  "photoServices",
  photoServicesSchema
);
export default IphotoServices;
