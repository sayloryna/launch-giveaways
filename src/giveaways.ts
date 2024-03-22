import { PassThrough } from "node:stream";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";
import { Giveaway, User } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";
import { types } from "node:util";

export const loginUser = (email: string, password: string): void => {
  const isUser = programData.users.find(
    (user) => user.email === email && user.password === password
  );
  isUser
    ? ((programData.userEmail = email),
      (programData.isAdmin = isUser.isAdmin),
      console.log("¡Bienvenido!"),
      saveData())
    : (console.log("Lo sentimos los datos no son correctos ¡BYE!"),
      process.exit(0));
};

export const createGiveaway = (): void => {
  const newGiveaway = askUserNewGiveawayData();
  programData.giveaways.push({
    name: newGiveaway.giveawayName,
    socialNetwork: newGiveaway.giveawaySocialNetwork,
    participants: [],
  });
  saveData();
  console.log("Se ha añadido un nuevo sorteo");
};

export const listGiveaways = (): void => {
  if (programData.giveaways.length === 0) {
    console.log("En este momento no hay sorteos disponibles");
  } else {
    console.log(`
    Éstos son los ${programData.giveaways.length} sorteos disponibles:

    `);
    for (let index = 0; (index = programData.giveaways.length); index++) {
      console.log(
        `${index}. ${programData.giveaways.at(index)?.name} en ${
          programData.giveaways.at(index)?.socialNetwork
        }.`
      );
    }
  }
};

export const deleteGiveaway = (giveawayNumber: number): void => {
  //...
  saveData();
};

export const enterGiveaway = (giveawayNumber: number): void => {
  //...
  saveData();
};

export const listUserGiveaways = (): void => {
  //...
};
