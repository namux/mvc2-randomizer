// This file contains the character data
export const characters = [
  // 5 points
  { name: 'Cable', ratio: 5, image: '/images/characters/cable.png' },
  { name: 'Iron Man', ratio: 5, image: '/images/characters/ironman.png' },
  { name: 'Magneto', ratio: 5, image: '/images/characters/magneto.png' },
  { name: 'Sentinel', ratio: 5, image: '/images/characters/sentinel.png' },
  { name: 'Storm', ratio: 5, image: '/images/characters/storm.png' },
  { name: 'Doctor Doom', ratio: 5, image: '/images/characters/doom.png' },
  
  // 4 points
  { name: 'Blackheart', ratio: 4, image: '/images/characters/blackheart.png' },
  { name: 'Cammy', ratio: 4, image: '/images/characters/cammy.png' },
  { name: 'Captain Commando', ratio: 4, image: '/images/characters/captain-commando.png' },
  { name: 'Cyclops', ratio: 4, image: '/images/characters/cyclops.png' },
  { name: 'Dhalsim', ratio: 4, image: '/images/characters/dhalsim.png' },
  { name: 'Psylocke', ratio: 4, image: '/images/characters/psylocke.png' },
  { name: 'Ruby Heart', ratio: 4, image: '/images/characters/ruby-heart.png' },
  { name: 'Spiral', ratio: 4, image: '/images/characters/spiral.png' },
  { name: 'Strider', ratio: 4, image: '/images/characters/strider.png' },
  { name: 'Tron Bonne', ratio: 4, image: '/images/characters/tron.png' },
  { name: 'War Machine', ratio: 4, image: '/images/characters/warmachine.png' },
  
  // 3 points
  { name: 'Anakaris', ratio: 3, image: '/images/characters/anakaris.png' },
  { name: 'B.B. Hood', ratio: 3, image: '/images/characters/bb-hood.png' },
  { name: 'Charlie', ratio: 3, image: '/images/characters/charlie.png' },
  { name: 'Colossus', ratio: 3, image: '/images/characters/colossus.png' },
  { name: 'Gambit', ratio: 3, image: '/images/characters/gambit.png' },
  { name: 'Guile', ratio: 3, image: '/images/characters/guile.png' },
  { name: 'Hulk', ratio: 3, image: '/images/characters/hulk.png' },
  { name: 'Iceman', ratio: 3, image: '/images/characters/iceman.png' },
  { name: 'Jill', ratio: 3, image: '/images/characters/jill.png' },
  { name: 'Jin', ratio: 3, image: '/images/characters/jin.png' },
  { name: 'Mega Man', ratio: 3, image: '/images/characters/megaman.png' },
  { name: 'Omega Red', ratio: 3, image: '/images/characters/omega-red.png' },
  { name: 'Rogue', ratio: 3, image: '/images/characters/rogue.png' },
  { name: 'Silver Samurai', ratio: 3, image: '/images/characters/silver-samurai.png' },
  { name: 'Spider-Man', ratio: 3, image: '/images/characters/spiderman.png' },
  
  // 2 points
  { name: 'Akuma', ratio: 2, image: '/images/characters/akuma.png' },
  { name: 'Captain America', ratio: 2, image: '/images/characters/captain-america.png' },
  { name: 'Felicia', ratio: 2, image: '/images/characters/felicia.png' },
  { name: 'Juggernaut', ratio: 2, image: '/images/characters/juggernaut.png' },
  { name: 'Ken', ratio: 2, image: '/images/characters/ken.png' },
  { name: 'M. Bison', ratio: 2, image: '/images/characters/mbison.png' },
  { name: 'Sabretooth', ratio: 2, image: '/images/characters/sabretooth.png' },
  { name: 'Sakura', ratio: 2, image: '/images/characters/sakura.png' },
  { name: 'SonSon', ratio: 2, image: '/images/characters/sonson.png' },
  { name: 'Wolverine (Adamantium)', ratio: 2, image: '/images/characters/wolverine.png' },
  
  // 1 point
  { name: 'Hayato', ratio: 1, image: '/images/characters/hayato.png' },
  { name: 'Marrow', ratio: 1, image: '/images/characters/marrow.png' },
  { name: 'Morrigan', ratio: 1, image: '/images/characters/morrigan.png' },
  { name: 'Ryu', ratio: 1, image: '/images/characters/ryu.png' },
  { name: 'Shuma-Gorath', ratio: 1, image: '/images/characters/shuma.png' },
  { name: 'Thanos', ratio: 1, image: '/images/characters/thanos.png' },
  { name: 'Venom', ratio: 1, image: '/images/characters/venom.png' },
  { name: 'Zangief', ratio: 1, image: '/images/characters/zangief.png' },
  
  // 0 points
  { name: 'Amingo', ratio: 0, image: '/images/characters/amingo.png' },
  { name: 'Chun-Li', ratio: 0, image: '/images/characters/chunli.png' },
  { name: 'Dan', ratio: 0, image: '/images/characters/dan.png' },
  { name: 'Wolverine (Bone)', ratio: 0, image: '/images/characters/bone-wolverine.png' },
  
  // -1 point
  { name: 'Roll', ratio: -1, image: '/images/characters/roll.png' },
  { name: 'Servbot', ratio: -1, image: '/images/characters/servbot.png' },
];

export const getRandomCharacter = (excludeList = [], availableCharacters = characters) => {
  const filteredCharacters = availableCharacters.filter(char => !excludeList.includes(char.name));
  return filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
};

export const getCharactersByRatio = (ratio) => {
  return characters.filter(char => char.ratio === ratio);
};
