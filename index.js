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

    static generateField (row, col, hole=5) {
        let resultArray = []

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

        for (let h=0; h<hole; h++) {
            const ranX = Math.floor(Math.random() * col);
            const ranY = Math.floor(Math.random() * row);
            if(ranX !== 0 && ranY !== 0) {
                resultArray[ranY][ranX] = 'O'
            
            } 
            if(ranX !== hatX && ranY !== hatY) {
                resultArray[ranY][ranX] = 'O'
            }

            
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

    const temp = Field.generateField(5,5)
    console.log({temp})

    // const game = new Field([
    //     ['*','░','O'],
    //     ['░','O','░'],
    //     ['░','^','░']
    // ])

    const game = new Field(temp)
    
    while (true) {
   
        game.printField()

        const direction = prompt('Which direction? Please enter U,D,L,R or Q to quit  ');
        if(direction === 'Q')
            break;
        if(direction !== 'L' && direction !== 'R' && direction !== 'U' && direction !== 'D' ) {
            console.log("Wrong input. Try again");
            continue;
        }
        console.log(`Your direction is ${direction}`);
    
    
        game.updatePosition(direction);
        if(!game.isPositionWithinField()) {
            console.log("Out of field. Game Over")
            break;
        }
        if(game.isHitAHole()) {
            console.log("You Hit A Hole. Game Over")
            break;
        }
        if(game.isFoundTheHat()) {
            console.log("You Found The Hat. You are the winner")
            break;
        }
        game.updateField();

    }
  
}

main();