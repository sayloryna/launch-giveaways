import { programData, saveData } from "./storage.js";
import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const user = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user === undefined) {
    console.log(
      `
Lo sentimos los datos no son correctos ¡BYE!`
    );
    process.exit(1);
  } else {
    programData.userEmail = email;
    programData.isAdmin = user.isAdmin;
    console.log(
      `
¡Bienvenido!`
    );
    saveData();
  }
};

export const createGiveaway = (): void => {
  const newGiveaway = askUserNewGiveawayData();

  if (
    programData.giveaways.some(
      (giveaway) =>
        giveaway.name === newGiveaway.giveawayName &&
        giveaway.socialNetwork === newGiveaway.giveawaySocialNetwork
    )
  ) {
    console.log(
      `
Ese sorteo ya existe`
    );
  } else {
    programData.giveaways.push({
      name: newGiveaway.giveawayName,
      socialNetwork: newGiveaway.giveawaySocialNetwork,
      participants: [],
    });
    saveData();
    console.log(
      `
Se ha añadido un nuevo sorteo`
    );
  }
};

export const listGiveaways = (): void => {
  if (programData.giveaways.length === 0) {
    console.log(
      `
En este momento no hay sorteos disponibles.`
    );
  } else {
    console.log(
      `
Éstos son los ${programData.giveaways.length} sorteos disponibles:
      `
    );

    programData.giveaways.forEach((giveaway, index) =>
      console.log(
        `${index + 1}. ${giveaway.name} en ${giveaway.socialNetwork}.`
      )
    );
  }
};

export const deleteGiveaway = (giveawayNumber: number): void => {
  const selectedGiveaway = programData.giveaways[giveawayNumber - 1];
  if (selectedGiveaway) {
    programData.giveaways.splice(giveawayNumber - 1, 1);
    console.log(
      `
Se ha borrado el sorteo`
    );
    saveData();
  } else {
    console.log(
      `
El sorteo que intentas borrar no existe`
    );
  }
};

export const enterGiveaway = (giveawayNumber: number): void => {
  const selectedGiveaway = programData.giveaways[giveawayNumber - 1];

  const currentUser = programData.users.find(
    (user) => user.email === programData.userEmail
  );

  if (!currentUser) {
    console.log(
      `
ups!Algo ha pasado con tu cuenta,inicia sesion por favor`
    );
    askUserNewGiveawayData();
  } else if (giveawayNumber > programData.giveaways.length) {
    console.log(
      `
No existe ese sorteo`
    );
  } else if (
    selectedGiveaway.participants.some(
      (user) => user.email === currentUser.email
    )
  ) {
    console.log(
      `
Ya  estabas inscrito en ese sorteo`
    );
  } else {
    programData.giveaways.at(giveawayNumber - 1)?.participants.push({
      name: currentUser.name,
      email: programData.userEmail,
      password: currentUser.password,
      isAdmin: programData.isAdmin,
    });
    console.log(
      `
Te has inscrito con éxito`
    );
    saveData();
  }
};

export const listUserGiveaways = (): void => {
  const userGiveaways: Giveaway[] = programData.giveaways.filter((giveaway) =>
    giveaway.participants.find(
      (participant) => participant.email === programData.userEmail
    )
  );
  if (userGiveaways.length >= 1) {
    console.log(
      `
Estás inscrito en los siguientes ${userGiveaways.length} sorteos:
  `
    );
    userGiveaways.forEach((giveaway) =>
      console.log(
        `${programData.giveaways.indexOf(giveaway) + 1}. ${giveaway.name} en ${
          giveaway.socialNetwork
        }.`
      )
    );
  } else {
    console.log(
      `
No estas inscrito en ningún sorteo`
    );
  }
};
