//This is a macro that I use for a Way of the 4 elements Monk spells and abilities. In particular, this one is for Water Whip, but it's 
//easily adaptable to any other spell that needs upscaling with ki. 
//In the character sheet, I've configured the spells as at-will spells. The saves and attack rolls are configured as normal,
//but the spells themselves have no damage rolls. All upcasting and ki calculation is done via the macro, so the spells themselves
//also don't have a ki cost in their details.

//It will calculate the max ki that you can spend (based on your available ki and monk level) and won't let you spend an illegal amount (it will give you a warning).

//I've configured it to take evasion into account if it's a dex save. The target must have an item named "Evasion".
//Dependencies: Midi-QoL.


let kiItemName = "Ki"; //Name of Ki item in the character sheet
let damageType = 'bludgeoning';
let flavor_text = "Látigo de agua - Tirada de ataque (Contundente)";
let ki_cost = 2;
let max_ki = Math.round(game.actors.get(args[0].actor._id).data.items.find(i => i.name ==="Monk" && i.type === "class").data.levels*0.2353+1.5588); //Trust me, this formula works

let ki_item = actor.items.find(item => item.data.name == kiItemName);
let max_extra_ki = max_ki - ki_cost;
let available_ki = ki_item.data.data.uses.value;


let dialogEditor = new Dialog({
   title: `Gasto de ki: ${args[0].item.name}`,
   content: `<form>
            <div> <b>Ki disponible:</b> ${available_ki} puntos. </div>
            <div> <b>Coste base:</b> ${ki_cost} puntos de ki. </div>
            <div></div>
            <div> Puedes gastar un máximo de ${max_extra_ki} extra. </div>
            <div></div>
            <div class="form-group">
                <label for="num">Ki extra:</label>
                <input id="kipoints" name="num" type="number" min = "0" max="${max_extra_ki}" ></input>
            </div>
            <div> (Deja en blanco para no gastar ki adicional) </div>
        </form>`,
   buttons: {
      calculate: {
         label:'Calcular daño',
         callback: async (html) => {
             
            let extra_ki = Math.abs(Number(html.find("#kipoints")[0].value));
            let totalSpentKiPoints = extra_ki + ki_cost;
            
            if (totalSpentKiPoints > max_ki) {
                ui.notifications.warn(`No puedes gastar tanto ki, el máximo es ${max_ki}, incluyendo el coste base`);
                dialogEditor.render(true);
                
            } else if (totalSpentKiPoints > available_ki) {
                ui.notifications.warn(`No te queda suficiente ki, ahora mismo te quedan ${ki_item.data.data.uses.value} puntos`);
                dialogEditor.render(true);
                
            } else {
                await ki_item.update({"data.uses.value": available_ki - totalSpentKiPoints});
                let numDice = 3 + extra_ki;
                runDamage(numDice, damageType, flavor_text);
            }
         }
      },
   },
   default: 'update',
   close: () => {}
});

dialogEditor.render(true)


async function runDamage(numDice, damageType, flavor_text) {
    console.log("args",args[0]);
    let damageRoll = new Roll(`${numDice}d10`).roll();
    
    let halfDamage = Math.floor(damageRoll.total/2);
    
    await (game.dice3d.showForRoll(damageRoll));
    let target;
    if (args[0].hitTargets.length == 0) {
        doDamage([], damageRoll.total, damageType, damageRoll, flavor_text)
    }
    else {
        for (var t of args[0].hitTargets){
            target = canvas.tokens.get(t._id);
            //If it's a dex save, check for evasion
            if (args[0].item.data.save.ability == "dex" && game.actors.get(t.actorId).data.items.find(i=> i.name ==="Evasion")) {
                if (args[0].failedSaves.includes(t)) {
                doDamage(target, halfDamage, damageType, damageRoll, flavor_text);
                }
                
            } else  if (args[0].failedSaves.includes(t)) {
                doDamage(target, damageRoll.total, damageType, damageRoll, flavor_text);
            } else {
                   doDamage(target, halfDamage, damageType, damageRoll, flavor_text); 
            }
        }
    }
    
    function doDamage(target, damage, damageType, damageRoll, flavor_text) {
        new MidiQOL.DamageOnlyWorkflow(
            actor, 
            token, 
            damage, 
            damageType, 
           target ? [target] : [],
            damageRoll, 
            {
                flavor: flavor_text, 
                itemCardId: args[0].itemCardId
            }
        );
        
    }}
