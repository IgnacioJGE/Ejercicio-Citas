import { Request, Response } from "npm:express@4.18.2";
import { ModeloCita } from "../db/citas.ts";

export const removeSlot = async (req: Request, res: Response) => {
  try {
    const { day, month, year, hour } = req.query;
    if (!day || !month || !year || !hour) {
        res.status(406).send("Formato de solicitud incorrecto. Debe especificar day, month, year y hour.");
        return;
      }

    const Citaencontrada= await ModeloCita.findOne({day,month,year,hour }).exec();
    if (!Citaencontrada) {
      res.status(404).send("Cita no encontrada");
      return;
    }
    if(Citaencontrada.avileable){
        res.status(200).send("Cita eliminada");
        await ModeloCita.findByIdAndRemove(Citaencontrada._id);
    }
    res.status(200).send("Cita eliminada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};
