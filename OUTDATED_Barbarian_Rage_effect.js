//NO LONGER WORKS ON FOUNDRY V10

// Allows swapping between two different .png images.
// Token sides should have "a" and "b" at the end of the name like "name-a.png" and "name-b.png".
// If you have a different ending, change aName and bName respectively.
// Author: Phenomen. Source: Foundry VTT Community Macros
//I had to modify this macro because it didn't work originally. I then also added a small breathing effect to the token with TokenMagicFX

//Dependencies: TokenMagicFX

// IMPORTANT. These two values MUST be the same length.
let aName = 'tokens/pc/kronk-a.png'
let bName = 'tokens/pc/kronk-b.png'

let tok = canvas.tokens.controlled[0];
let img = tok.data.img;
var currentSide = img[img.length - 5];
img = img.slice(0,-Math.abs(aName.length)) + (currentSide == 'a' ? bName: aName);
tok.update({ img });

let params =
[{
    filterType: "bulgepinch",
    filterId: "resp",
    padding: 150,
    strength: 0,
    zIndex: 1,
    radiusPercent: 110,
    animated:
    {
        strength: 
        { 
           active: true, 
           animType: "cosOscillation", 
           loopDuration: 4000, 
           val1: -0.02, 
           val2: 0.07
        }
    }
}];

if (img == bName) {
   TokenMagic.addUpdateFiltersOnSelected(params);
}  else if (img == aName) {
   TokenMagic.deleteFiltersOnSelected('resp');
}
