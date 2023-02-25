//Literally https://fantasycomputer.works/FoundryVTT-Sequencer/#/tutorials/basic-transformation 
//but with an added extra animation

let notTransformed = 'tokens/pc/images.jpg';
let transformed = 'tokens/pc/kitsune-card.png';

let token = canvas.tokens.controlled[0]

if (token.document.texture.src == notTransformed || token.document.texture.src == transformed) {

let img = token.document.texture.src === notTransformed ? transformed : notTransformed;

new Sequence()
    .effect()
        .file("modules/jb2a_patreon/Library/2nd_Level/Misty_Step/MistyStep_02_Regular_Blue_400x400.webm")
        .atLocation(token)
        .scaleToObject(2.5)
        .randomRotation()
    .wait(1500)
    .effect()
        .file("modules/jb2a_patreon/Library/Generic/Nature/PlantGrowthRingPulse01_01_Regular_BluePurple_500x500.webm")
        .atLocation(token)
        .scaleToObject(2.5)
        .randomRotation()
    .thenDo(() => {
        token.document.update({ img });
    })
    .play()

}
