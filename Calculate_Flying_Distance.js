//This function calculates the hypotenuse of a triangle when given the lengths of the other two sides.
//In other words, if you give it the horizontal and vertical distance from a flying token and a token on the ground,
//(or two flying tokens), it will display the actual distance between them with a UI notification.

function calchip(hor, ver) {
  return Math.sqrt(hor**2 + ver**2)
}

let dialogEditor = new Dialog({
   title: 'Calcular hipotenusa',
   content: `<form>
            <div class="form-group">
                <div>
                <label for="num">Distancia Horizontal</label>
                <input id="hor" name="num" type="number" min="0" style="width:100px;float:below" ></input>
                </div><div>
                <label for="num">Distancia Vertical</label>
                <input id="ver" name="num" type="number" min="0" style="width:100px;float:below"></input>
                </div>
            </div>
        </form>`,
   buttons: {
      calculate: {
         label:'Calcular Hipotenusa',
         callback: (html) => {
            let hor = Number(html.find("#hor")[0].value);
            let ver = Number(html.find("#ver")[0].value);
            //console.log(hor,ver, ' pies.');
            ui.notifications.info('Distancia: ' + calchip(hor,ver) + ' pies');
            dialogEditor.render(true)
         }
      },
   },
   default: 'update',
   close: () => {}
});

dialogEditor.render(true)
