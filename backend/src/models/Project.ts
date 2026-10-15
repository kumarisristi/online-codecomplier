import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  owner: Types.ObjectId;
  language: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    language: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema);
