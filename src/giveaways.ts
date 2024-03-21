import { PassThrough } from "node:stream";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";
import { Giveaway, User } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";
import { types } from "node:util";

export const loginUser = (email: string, password: string): void => {
  programData.users.some(
    (user) => user.email === email && user.password === password
  )
    ? ((programData.userEmail = email), console.log("¡Bienvenido!"), saveData())
    : (console.log("Lo sentimos los datos no son correctos ¡BYE!"),
      process.exit(0));
};

export const createGiveaway = (): void => {
  //...
  saveData();
  console.log("Se ha añadido un nuevo sorteo");
};
