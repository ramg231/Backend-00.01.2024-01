let firstName: string = "Dylan";
let lastName = "Lopez";

//firstName = 33;

let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type

let w: unknown = 1;
w = "string"; // no error
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void}
// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}

const names: readonly string[] = ["Dylan"];
//names.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?


// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple);

// define our readonly tuple
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
// throws error as it is readonly.
//ourReadonlyTuple.push('Coding God took a day off');


const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
  };

  //car.year = "2007";

  const car2: { type: string, mileage?: number } = { // Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.
    type: "Toyota",
  };
  car2.mileage = 2000;


  enum CardinalDirections {
    North = 1,
    East,
    South,
    West
  }
  // logs 1
  console.log(CardinalDirections.North);
  // logs 4
  console.log(CardinalDirections.West);


  interface Rectangle {
    height: number,
    width: number
  }
  
  const rectangle: Rectangle = {
    height: 20,
    width: 10
  };


  function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
  }
  printStatusCode(404);
  printStatusCode('404');

  function getTime(): number {
    return new Date().getTime();
  }

  function printHello(): void {
    console.log('Hello!');
  }


  function multiply(a: number, b: number) {
    return a * b;
  }

  multiply(2,4)


let x: unknown = 'hello';
console.log((<string>x).length);

class Person {
    private name: string;
  
    public constructor(name: string) {
      this.name = name;
    }
  
    public getName(): string {
      return this.name;
    }
  }
  
  const person = new Person("Jane");
  console.log(person.getName()); // person.name isn't accessible from outside the class since it's private
