// This file contains the character data
export const characters = [
  // 5 points
  { name: 'Cable', ratio: 5 },
  { name: 'Iron Man', ratio: 5 },
  { name: 'Magneto', ratio: 5 },
  { name: 'Sentinel', ratio: 5 },
  { name: 'Storm', ratio: 5 },
  { name: 'Doctor Doom', ratio: 5 },
  
  // 4 points
  { name: 'Blackheart', ratio: 4 },
  { name: 'Cammy', ratio: 4 },
  { name: 'Captain Commando', ratio: 4 },
  { name: 'Cyclops', ratio: 4 },
  { name: 'Dhalsim', ratio: 4 },
  { name: 'Psylocke', ratio: 4 },
  { name: 'Ruby Heart', ratio: 4 },
  { name: 'Spiral', ratio: 4 },
  { name: 'Strider', ratio: 4 },
  { name: 'Tron Bonne', ratio: 4 },
  { name: 'War Machine', ratio: 4 },
  
  // 3 points
  { name: 'Anakaris', ratio: 3 },
  { name: 'B.B. Hood', ratio: 3 },
  { name: 'Charlie', ratio: 3 },
  { name: 'Colossus', ratio: 3 },
  { name: 'Gambit', ratio: 3 },
  { name: 'Guile', ratio: 3 },
  { name: 'Hulk', ratio: 3 },
  { name: 'Iceman', ratio: 3 },
  { name: 'Jill', ratio: 3 },
  { name: 'Jin', ratio: 3 },
  { name: 'Mega Man', ratio: 3 },
  { name: 'Omega Red', ratio: 3 },
  { name: 'Rogue', ratio: 3 },
  { name: 'Silver Samurai', ratio: 3 },
  { name: 'Spider-Man', ratio: 3 },
  
  // 2 points
  { name: 'Akuma', ratio: 2 },
  { name: 'Captain America', ratio: 2 },
  { name: 'Felicia', ratio: 2 },
  { name: 'Juggernaut', ratio: 2 },
  { name: 'Ken', ratio: 2 },
  { name: 'M. Bison', ratio: 2 },
  { name: 'Sabretooth', ratio: 2 },
  { name: 'Sakura', ratio: 2 },
  { name: 'SonSon', ratio: 2 },
  { name: 'Wolverine (Adamantium)', ratio: 2 },
  
  // 1 point
  { name: 'Hayato', ratio: 1 },
  { name: 'Marrow', ratio: 1 },
  { name: 'Morrigan', ratio: 1 },
  { name: 'Ryu', ratio: 1 },
  { name: 'Shuma-Gorath', ratio: 1 },
  { name: 'Thanos', ratio: 1 },
  { name: 'Venom', ratio: 1 },
  { name: 'Zangief', ratio: 1 },
  
  // 0 points
  { name: 'Amingo', ratio: 0 },
  { name: 'Chun-Li', ratio: 0 },
  { name: 'Dan', ratio: 0 },
  { name: 'Wolverine (Bone)', ratio: 0 },
  
  // -1 point
  { name: 'Roll', ratio: -1 },
  { name: 'Servbot', ratio: -1 },
];

export const getRandomCharacter = (excludeList = [], availableCharacters = characters) => {
  const filteredCharacters = availableCharacters.filter(char => !excludeList.includes(char.name));
  return filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
};

export const getCharactersByRatio = (ratio) => {
  return characters.filter(char => char.ratio === ratio);
};
