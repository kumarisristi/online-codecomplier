import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IFile extends Document {
  project: Types.ObjectId;
  name: string;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema<IFile>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    name: { type: String, required: true },
    content: { type: String, default: "" },
    language: { type: String, required: true },
  },
  { timestamps: true }
);

export const File: Model<IFile> = mongoose.model<IFile>("File", fileSchema);
