import { Request, Response } from "npm:express@4.18.2";
import { ModeloCita } from "../db/citas.ts";
export const getCitas = async (req: Request, res: Response) => {
    try {
        
        const {day,month, year } = req.query;
        const query = {
            year: parseInt(year as string, 10),
            month: parseInt(month as string, 10),
          };
     if (!year || !month) {
         res.status(406).send("Debe especificar año y mes.");
        return;
     }
    if(!day){
        const availableSlots = await ModeloCita.find({month,year,avileable:true}).exec();
        const citasdisponibles = availableSlots.map((avileableSlots) => ({
            day: avileableSlots.day,
            month:avileableSlots.month,
            year:avileableSlots.year,
            hour:avileableSlots.hour,
            avileable: avileableSlots.avileable

          }));
        res.status(200).send(citasdisponibles);
    }
    const availableSlots = await ModeloCita.find({day,...query,avileable:true}).exec();
    const citasdisponibles = availableSlots.map((avileableSlots) => ({
        day: avileableSlots.day,
        month:avileableSlots.month,
        year:avileableSlots.year,
        hour:avileableSlots.hour,
        avileable: avileableSlots.avileable
      }));
    res.status(200).send(citasdisponibles);
      } catch (error) {
        res.status(500).send(error.message);
      }
    };