//This function calculates the hypotenuse of a triangle when given the lengths of the other two sides.
//In other words, if you give it the horizontal and vertical distance from a flying token and a token on the ground,
//(or two flying tokens), it will display the actual distance between them with a UI notification.

function calchip(hor, ver) {
  return Math.sqrt(hor**2 + ver**2)
}

let dialogEditor = new Dialog({
   title: 'Calculate Hypotenuse',
   content: `<form>
            <div class="form-group">
                <label for="num">Horizontal Distance</label>
                <input id="hor" name="num" type="number" min="0" ></input>
                <label for="num">Vertical Distance</label>
                <input id="ver" name="num" type="number" min="0" ></input>
            </div>
        </form>`,
   buttons: {
      calculate: {
         label:'Calculate Hypotenuse',
         callback: async (html) => {
            let hor = Number(html.find("#hor")[0].value);
            let ver = Number(html.find("#ver")[0].value);
            ui.notifications.info('Distance: ' + calchip(hor,ver) + ' feet');
            dialogEditor.render(true)
         }
      },
   },
   default: 'update',
   close: () => {}
});

dialogEditor.render(true)
