import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IExecution extends Document {
  user?: Types.ObjectId;
  language: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
  createdAt: Date;
}

const executionSchema = new Schema<IExecution>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    language: { type: String, required: true },
    stdout: { type: String, default: "" },
    stderr: { type: String, default: "" },
    exitCode: { type: Number, default: null },
    durationMs: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Execution: Model<IExecution> = mongoose.model<IExecution>("Execution", executionSchema);
