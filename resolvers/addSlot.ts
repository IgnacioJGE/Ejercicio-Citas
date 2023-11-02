import { Request, Response } from "npm:express@4.18.2";
import { ModeloCita } from "../db/citas.ts";




export const addSlot = async (req: Request, res: Response) => {
  try {
    const { day, month, year, hour } = req.body;
    if(!day || !year || !month || !hour) {
      res.status(406).send("Día, hora , mes, año , son necesarios");
      return;
    }
    if((day< 0) || (day > 32) || ( month<0) || (month > 13) || ( hour<0) || (hour > 24)) {
      res.status(406).send("Datos incorrectos");
    }

    if(typeof day !== "number" || typeof month !== "number" || typeof year !== "number" || typeof hour !== "number") {
      res.status(407).send("Invalid datatype");

    }
    const alreadyExists = await ModeloCita.findOne({ day, month, year, hour }).exec();
    if(alreadyExists?.avileable == true) {
      res.status(200).send("Cita ya existente, libre");
      return;
    }
    if(alreadyExists?.avileable == false) {
      res.status(403).send("Cita ya existente, ocupada");
      return;
    }

    const nuevaCita = new ModeloCita({ day, month, year, hour,avileable:true });
    await nuevaCita.save();

    res.status(200).send({
      day: nuevaCita.day,
      month: nuevaCita.month,
      year: nuevaCita.year,
      hour: nuevaCita.hour,
      avileable: nuevaCita.avileable,
    });
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }
};



