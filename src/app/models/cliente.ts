import { Region } from "./region";

export class Cliente {
  id:Number=0;
  nombre: string="";
  apellido: string="";
  createAt: string="";
  email:string="";
  foto:string="";
  region!:Region;
}
