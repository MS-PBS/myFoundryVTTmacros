//This macro cycles through slightly different TokenMagic FX every time you run it. 
//It will cycle from 4 total images, to 3, 2, remove effect, and then 4 again. Cool for a wizard with mirror image.
//Dependencies: TokenMagic FX

let numimg = token.getFlag('world','mirrorimage') == undefined ? 4 : token.getFlag('world','mirrorimage');

let params =
    [{
        filterType: "images",
        filterId: "MirrorImage",
        time: 0,
        nbImage: numimg,
        alphaImg: 1.0,
        alphaChr: 0.0,
        blend: 4,
        ampX: 0.15,
        ampY: 0.15,
        zOrder: 20,
        animated :
        {
          time: 
          { 
            active: true, 
            speed: 0.0015, 
            animType: "move" 
          }
        }
    }];

if (numimg == 1) {
    TokenMagic.deleteFiltersOnSelected('MirrorImage');
    token.setFlag('world', 'mirrorimage', 4);
}
else {
    TokenMagic.addUpdateFiltersOnSelected(params);
    token.setFlag('world', 'mirrorimage', numimg-1);
}
