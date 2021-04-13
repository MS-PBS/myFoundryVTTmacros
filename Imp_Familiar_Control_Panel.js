//Creates a window with buttons to change certain token's image, and another button to toggle invisibility. 
//No need to select the familiar's token. This was made for a warlock's imp familiar named Yor'sa Vol. Change text as necessary.

//Dependencies: Combat Utility Belt to toggle invisibility.

let tok = game.actors.getName("Yor'Sa Vol").getActiveTokens()[0]

function toggleInv(tok) {
    let invs = 'Invisible';
    switch (game.cub.hasCondition(invs, tok)) {
        case true: 
            game.cub.removeCondition(invs, tok)
        break;
        case false:
            game.cub.addCondition(invs, tok)
        break;
    }
}



function tokenUpdate(data) {
  canvas.tokens.controlled.map(token => token.update(data));
}

let dialogEditor = new Dialog({
  title: `Panel de control de Yor'sa Vol`,
  content: `Elige en qué se transforma Yor'Sa Vol. Ten en cuenta que cambian sus velocidades. También puedes poner y quitar la invisibilidad.`,
  buttons: {
    normal: {
      label: `Forma normal`,
      callback: () => {
        var img = 'tokens/pc/imp.png'
        tok.update({ img });
        dialogEditor.render(true);
      }
    },
    rat: {
      label: `Rata`,
      callback: () => {
        var img = 'tokens/Forgotten Adventures/Creatures/CR_0/Rat_Tiny_Beast_01.png'
        tok.update({ img });
        dialogEditor.render(true);
      }
    },
    raven: {
      label: `Cuervo`,
      callback: () => {
        var img = 'tokens/Forgotten Adventures/Creatures/CR_0/Raven_Tiny_Beast_04.png'
        tok.update({ img });
        dialogEditor.render(true);
      }
    },
    spider: {
      label: `Araña`,
      callback: () => {
        var img = 'tokens/Forgotten Adventures/Creatures/CR_0/Spider_Tiny_Beast_06.png'
        tok.update({ img });
        dialogEditor.render(true);
      }
    },
    invsibile: {
      label: `Activar/Desactivar Invisibilidad`,
      callback: () => {
        toggleInv(tok);
        dialogEditor.render(true);
      }
    },
  },
  default: "close",
  close: () => {}
});

dialogEditor.render(true)
