/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */


class Kitchen {

    constructor() {
        this.pancake = new Array(3);
        this.iteration = 1;
        var i;
        for (i = 0; i < 3; i++) {
            this.pancake[i] = {};
            this.pancake[i].rawSideCount = 2;
            this.pancake[i].fryOneSide = function (){
                    this.rawSideCount -= 1;
            };
        }
    }

    fryPancakes() {
        if (this.iteration > 3) {
            return 'You fried them all!';
        } else {
            switch (this.iteration) {
                case 1:
                    this.pancake[0].fryOneSide();
                    this.pancake[1].fryOneSide();
                    break;
                case 2:
                    this.pancake[0].fryOneSide();
                    this.pancake[2].fryOneSide();
                    break;
                case 3:
                    this.pancake[1].fryOneSide();
                    this.pancake[2].fryOneSide();
                    break;
            }
            this.iteration++;
            return 'You just fried a pancake.';
        }
    }
}


var kitchen = new Kitchen();
var i;
for (i = 0; i < 3; i++) {
    console.log(kitchen.fryPancakes());
    console.log('raw sides of pancake №1: '+kitchen.pancake[0].rawSideCount+
                                 '    №2: '+kitchen.pancake[1].rawSideCount+
                                 '    №3: '+kitchen.pancake[2].rawSideCount);
}
