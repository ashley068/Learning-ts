//.generic type

// const names: Array<string> = [];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("this is done!");
//   }, 2000);
// });

// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
//   { name: "Max", hobbies: ["swimming"] },
//   { age: 30 }
// );

// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({ name: "Max", hobbies: ["swimming"] }, { age: 30 });
// console.log(mergedObj); // { name: "Max", hobbies: ["swimming"] }
//It won't complie 30, because 30 is not a object, but js doesn't throw an error

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "got no value";
  if (element.length === 1) {
    descriptionText = "got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got" + element.length + "elements";
  }
  return [element, descriptionText];
}
console.log(countAndDescribe(["sports", "cooking"]));

//keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "value:" + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

//generic classes
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Menu");
textStorage.removeItem("Max");

const numberStorage = new DataStorage<number>();

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//partial type - it turns into a type which is also an object type where all the properties are optionals
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Mac", "May"]; //cannot be changed
