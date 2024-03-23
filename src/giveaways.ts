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
    console.log(`Éstos son los ${programData.giveaways.length} sorteos disponibles:
    `);
    for (let index = 0; index < programData.giveaways.length; index++) {
      console.log(
        `${index + 1}. ${programData.giveaways.at(index)?.name} en ${
          programData.giveaways.at(index)?.socialNetwork
        }.`
      );
    }
  }
};

export const deleteGiveaway = (giveawayNumber: number): void => {
  const selectedGiveaway = programData.giveaways[giveawayNumber - 1];
  selectedGiveaway
    ? programData.giveaways.splice(giveawayNumber - 1, 1) &&
      console.log("Se ha borrado el sorteo")
    : console.log("El sorteo no existe");
  saveData();
};

export const enterGiveaway = (giveawayNumber: number): void => {
  const selectedGiveaway = programData.giveaways[giveawayNumber - 1];
  const currentUser = programData.users.find(
    (user) => user.email === programData.userEmail
  );
  if (!currentUser) {
    console.log("Error:algo fallo");
    return;
  }

  selectedGiveaway
    ? programData.giveaways.at(giveawayNumber - 1)?.participants.push({
        name: currentUser?.name,
        email: programData.userEmail,
        password: currentUser?.password,
        isAdmin: programData.isAdmin,
      }) && console.log("Te has inscrito con éxito")
    : console.log("No existe ese sorteo");

  saveData();
};

export const listUserGiveaways = (): void => {
  const userGiveaways: Giveaway[] = programData.giveaways.filter((giveaway) =>
    giveaway.participants.find(
      (participant) => participant.email === programData.userEmail
    )
  );
  if (userGiveaways.length >= 1) {
    console.log(`Estás inscrito en los siguientes ${userGiveaways.length} torneos:
  `);
    userGiveaways.forEach((giveaway) =>
      console.log(
        `${userGiveaways.indexOf(giveaway) + 1}. ${giveaway.name} en ${
          giveaway.socialNetwork
        }.`
      )
    );
  } else {
    console.log("No estas inscrito en ningún sorteo");
  }
};
