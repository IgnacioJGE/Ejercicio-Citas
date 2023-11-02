import mongoose from "npm:mongoose@7.6.3";
import { cita } from "../types.ts";
const Schema = mongoose.Schema;

const citaSchema = new Schema(
  {
    day: { type: Number, required: true },
    month: { type: Number,required: true },
    year: { type: Number, required: true},
    hour: { type: Number, required: true},
    avileable: { type: Boolean, required: true},
    dni: { type: String, required: false},

  },
  { timestamps: true }
);

export type tipocita = mongoose.Document& (cita);// definir el ripo del modelo

export const ModeloCita= mongoose.model<tipocita>("Citas",citaSchema)

