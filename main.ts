
import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { addSlot } from "./resolvers/addSlot.ts";
import { removeSlot } from "./resolvers/removeSlot.ts";
import { getCitas } from "./resolvers/avileableSlots.ts";
import { bookSlot } from "./resolvers/bookSlot.ts";
const env = await load();
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")// si hay .emv lo leo si no lo lee de las variables de entorno de deno
const PORT=env.PORT||Deno.env.get("PORT")||3000
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
try{
await mongoose.connect(MONGO_URL);
console.info("Mongo Concectado")
const app= express();
app.use(express.json())
app.post("/addSlot",addSlot)
   .delete("/removeSlot",removeSlot) 
   .get("/availableSlots",getCitas)
   .put("/bookSlot",bookSlot)
    /*.get("/getPerson/:name", getPersonaje)
    .put("/updatePersonaje/:id",updatePerson)
    .get("/getAllpersonajes",getPersonajes)
    .delete("/eliminarpersonaje/:id",deletePerson)*/

app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));
}catch(e){
  console.error(e)
}


