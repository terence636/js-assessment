const prompt = require('prompt-sync')({sigint: true});

const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const hat = '^';

class Field {
    constructor(field=[[]]) {
        this.field = field;
        this.row = field.length;
        this.col = field[0].length;
        this.positionX = 0;
        this.positionY = 0;
    }

    static generateField (row, col, holePercentage=0.4) {
        let resultArray = []
        const holeNum = row*col*holePercentage;

        for (let i=0; i<row; i++) {
            let tempArr = [];
            for(let j=0; j<col; j++) {
                tempArr.push(fieldCharacter);
            }
            resultArray.push(tempArr)
        }
        
        resultArray[0][0] = pathCharacter

        const hatX = Math.floor(Math.random() * col);
        const hatY = Math.floor(Math.random() * row);

        resultArray[hatY][hatX] = hat
        

        for (let h=0; h<holeNum; h++) {
            let ranX = Math.floor(Math.random() * col);
            let ranY = Math.floor(Math.random() * row);
          
            while((ranX === 0 && ranY === 0) || (ranX === hatX && ranY === hatY)) {
                ranX = Math.floor(Math.random() * col);
                ranY = Math.floor(Math.random() * row);
            }
            resultArray[ranY][ranX] = hole;

            // if(ranX !== 0 && ranY !== 0) {
            //     resultArray[ranY][ranX] = hole
            
            // } 
            // if(ranX !== hatX && ranY !== hatY) {
            //     resultArray[ranY][ranX] = hole
            // }        
        }

     

        return resultArray;
    }


    printField () {
        for (let i=0; i<this.field.length; i++) {
            console.log(this.field[i].join(""))
        }
    }

    updatePosition (direction) {
        switch (direction) {
            case "L":
                this.positionX -= 1;
                break;
            case "R":
                this.positionX += 1;
                break;
            case "U":
                this.positionY -= 1;
                break;
            case "D":
                this.positionY += 1;
                break;
        }
        console.log("X,Y", this.positionX, this.positionY)
    }

    isPositionWithinField () {
        if(this.positionX < 0 || this.positionY < 0)
            return false;

        if(this.positionX > this.col-1 || this.positionY > this.row-1)
            return false;
        
        return true;
    }

    isHitAHole () {
        if(this.field[this.positionY][this.positionX] === 'O')
            return true;
        return false;
    }

    isFoundTheHat () {
        if(this.field[this.positionY][this.positionX] === '^')
            return true;
        return false;
    }

    updateField () {
        this.field[this.positionY][this.positionX] = '*' 
    }

}


const main = () => {

    const field = Field.generateField(5,5)
    // console.log({temp})

    // const game = new Field([
    //     ['*','░','O'],
    //     ['░','O','░'],
    //     ['░','^','░']
    // ])

    const game = new Field(field)
    
    while (true) {
   
        game.printField()

        const direction = prompt('Which direction? Please enter U,D,L,R or Q to quit  ');
        if(direction === 'Q') {
            console.log("Thanks for playing")
            break;
        }
        if(direction !== 'L' && direction !== 'R' && direction !== 'U' && direction !== 'D' ) {
            console.log("Wrong input. Try again");
            continue;
        }
        // console.log(`Your direction is ${direction}`);
    
    
        game.updatePosition(direction);
        if(!game.isPositionWithinField()) {
            console.log("Out of field. Game Over")
            return main();
        }
        if(game.isHitAHole()) {
            console.log("You Hit A Hole. Game Over")
            return main();
        }
        if(game.isFoundTheHat()) {
            console.log("You Found The Hat. You are the winner")
            return main();
        }
        game.updateField();

    }
  
}

main();