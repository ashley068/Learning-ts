// function Logger(constructor: Function) {
//   console.log("Logging ...");
//   console.log(constructor);
// }

function Logger(logstring: string) {
  return function (constructor: Function) {
    console.log("Logging ...");
    console.log(constructor);
  };
}

// function WithTemplate(template: string, hookId: string) {
//   return function (constructor: any) {
//     const hookEl = document.getElementById(hookId);
//     const p = new constructor();
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector("h1")!.textContent = p.name;
//     }
//   };
// }

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: any
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("rederring template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}
// @Logger("LOGGING -PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("creating person object...");
  }
}

const pers = new Person();

console.log(pers);

//
function Log(target: any, propertyNanme: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyNanme);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDecorator
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

function Autobind(
  target: any,
  methodNamge: string,
  descriptor: PropertyDescriptor
) {
  const origianlMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = origianlMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "this works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;

button.addEventListener("click", p.showMessage);

///////////////
//validation with decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['require','positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          return !!obj[prop];

        case "positive":
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("click", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
