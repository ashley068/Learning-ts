type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee; //conbination

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// intersection
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; //number

//type guards
function addInput(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printemployeeInformation(emp: UnknownEmployee) {
  console.log("name:" + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges:" + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Privileges:" + emp.startDate);
  }
}

printemployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("driving a car");
  }

  loadCargo(amout: number) {
    console.log("loading cargo..." + amout);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ("loadCargo" in vehicle) {
  //   vehicle.loadCargo(1000);
  // }

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//discriminated union
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;

    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log("Moving at speed" + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//type casting
// const userInput = document.querySelector('p')! as HTMLInputElement;
// const userInput = <HTMLInputElement>document.querySelector('p');

//index properties
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
};
