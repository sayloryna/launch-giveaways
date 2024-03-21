import { PassThrough } from "node:stream";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";
import { Giveaway, User } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";
import { types } from "node:util";

export const loginUser = (email: string, password: string): void => {
  if (
    programData.users.some(
      (user) => user.email === email && user.password === password
    ) === false
  ) {
    console.log("lo sentimos los datos no son correctos"), process.exit(0);
  } else {
    programData.userEmail = email;
    programData.isAdmin = programData.isAdmin;
    console.log("¡Bienvenido!");
    saveData();
  }
};

export const createGiveaway = (): void => {
  const newGiveaway = askUserNewGiveawayData();
  programData.giveaways.push(newGiveaway);
  saveData();
  console.log("Se ha añadido un nuevo sorteo");
};
