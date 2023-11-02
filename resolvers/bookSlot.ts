import { Request, Response } from "npm:express@4.18.2";
import { ModeloCita } from "../db/citas.ts";

export const bookSlot = async (req: Request, res: Response) => {
  try {
    const {day,month,year,hour,dni} = req.body;
    if(!day||!month||!year||!hour||!dni){
        
        res.status(404).send("Faltan campos por rellenar");
        return;
    }

    const updateSlot = await ModeloCita.findOneAndUpdate({day,month,year,hour,avileable:true}
        ,{day,month,year,hour,avileable:false,dni},{new:true}).exec();

    if (!updateSlot) {
      res.status(404).send("Cita no encontrada");
      return;
    }

    res.status(200).send({
      day: updateSlot.day,
      month: updateSlot.month,
      year: updateSlot.year,
      hour: updateSlot.hour,
      avileable: updateSlot.avileable,
      dni:updateSlot.dni,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

