//WIP
//This is for playing videos between two tokens.
//Specifically, for wide videos where DrawSpecialTowards isn't appropiate because it is a long static ray or something.
//Blatantly copied ideas and code from Automated JB2A Animations. Check that module out, it's really good.

//Dependencies: TokenMagic FX. Example video file from the Animated Spell Effects module.

let target = Array.from(game.user.targets)[0]

let ray = new Ray(token.center, target.center)

//Video file's long side dimension in pixels
let anlength = 1080;
//

let scale = ray.distance / anlength;


const data = {
  file: "modules/animated-spell-effects/spell-effects/lightning/lightning_blast_multicolour_RAY_01.webm",
  position: token.center,
  anchor: {
    x: 0,
    y: 0,
  },
  angle: -ray.angle*57.3,
  speed: 0,
  scale: {
    x: scale,
    y: 1,
  },
};

canvas.fxmaster.playVideo(data);
game.socket.emit("fxmaster", data);
