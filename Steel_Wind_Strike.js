//Steel Wind Strike is a 5th level spell in DnD5e that has you make 5 attack rolls against 5 different creatures.
//This item macro opens a dialog to select a target, then makes an attack against said target, and then reopens the dialog
//again to let you select another target, up to 5 attacks.
//It keeps track of who you have attacked and won't let you attack the same target more than once.
//It also sends a chat message with the number of attacks done and the target of the next attack
//This is useful to make the life of your GM easier, as each attack will only target one token, making it easier to apply the damage.

//Dependencies: Midi-qol

let targets = Array.from(game.user.targets);

async function main(targets) {

    let count = 0;
    let attacked = new Set([]);
    
    let targetoptions = "";
    for (let t of targets) {
        targetoptions += `<option value=${t.id}>${t.name}</option>`;
    }
    let dialogTemplate = `
    <h1> Elige objetivo </h1>
    <div style="display:flex">
    <div><select id="tar">${targetoptions}</select>
    </div>
    </div>`;
    let d = new Dialog({
        title: "Steel Wind Strike",
        content: dialogTemplate,
        buttons: {
            next: {
                label: `Siguiente`,
                callback: (html) => {
                    let tar = canvas.tokens.get(html.find("#tar")[0].value);
                    if (attacked.has(tar)) {
                        ui.notifications.warn("Ya has atacado a este objetivo");
                        d.render(true);
                        return;
                    }
                    
                    game.user.targets = new Set([tar]);
                    attacked.add(tar);
                    item.roll();
                    count += 1;
                    console.log(count);
                    
                    ChatMessage.create({
                        speaker: {
                            alias: token.name
                        },
                        content: `<p>¡Ataque nº ${count} para ${tar.name}!</p>`,
                    });
                    
                    Hooks.once('midi-qol.RollComplete', () => {
                        game.user.targets = new Set(targets);
                        if (count < 5) {
                            d.render(true);
                        }
                    });
                }
            }
        }
    }).render(true);
}

if (targets.length != 0) {
    main(targets);
} else {
    ui.notifications.info("Elige al menos un objetivo");
}
