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
    let foo = false;
    let attacked = new Set([]);
    
    
    let targetoptions = "";
    for (let t of targets) {
        targetoptions += `<option value=${t.id}>${t.name}</option>`;
    }
    let dialogTemplate = `
    <h1> Choose target </h1>
    <div style="display:flex">
    <div><select id="tar">${targetoptions}</select>
    </div>
    </div>`;
    //console.log(targetoptions)
    let d = new Dialog({
        title: "Steel Wind Strike",
        content: dialogTemplate,
        buttons: {
            next: {
                label: `Attack`,
                callback: (html) => {
                    let tar = canvas.tokens.get(html.find("#tar")[0].value);
                    if (attacked.has(tar)) {
                        ui.notifications.warn("You have already attacked this token");
                        d.render(true);
                        return;
                    }
                    game.user.targets = new Set([tar]);
                    attacked.add(tar);
                    item.roll();
                    count += 1;
                    console.log(count);
                    foo = true;
                    
                    ChatMessage.create({
                        speaker: {
                            alias: token.name
                        },
                        content: `<p>Attack number ${count} to ${tar.name}!</p>`,
                    });
                       
                    if (count > 4) {
                        
                        Hooks.once('midi-qol.RollComplete', () => {
                            game.user.targets = new Set(targets);
                        });
                    } else {
                        Hooks.once('midi-qol.RollComplete', () => {
                            foo = false;
                            d.render(true)});
                    }
                }
            }
        },
        close: () =>  {
            if (!foo) {
                game.user.targets = new Set(targets);
            }
        }
    }).render(true);

}

if (targets.length != 0) {
    main(targets);
} else {
    ui.notifications.info("Choose at least 1 target");
}
