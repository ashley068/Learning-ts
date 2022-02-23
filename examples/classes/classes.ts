abstract class Department {
  // name: string ;
  //private means is that employees is now a property which is only accessible from inside the class/ created object
  private employees: string[] = [];

  static createEmployee(name: string) {
    return { name };
  }
  // constructor(n: string){
  //     this.name = n;
  // }
  //shorthand initialization
  //add public here before the name because this now is explicit instruction for typescript that tells typescript you want to
  // not just get these arguments here in the constructor, but you want to create properties for this class with the exact same names
  constructor(private id: string, public name: string) {}
  //abstract - all the inheritence can override this method
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printemployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1);

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("itdepartment");
  }
}
const it = new ITDepartment("ds2", ["Max"]);
// it.describe();

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("No report found.");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("id123", ["report123"]);
  }

  describe() {
    console.log("accounting department");
  }
  addReport(text: string) {
    this.reports.push(text);
  }
}
// const accounting = new AccountingDepartment("d2", ["report1"]);
const accounting = AccountingDepartment.getInstance(); // singleton & private constructor
console.log(accounting); //getter method accessed as a property

// const  accountingCopy = {
//     name:"dummy", describe: accounting.describe
// };

// accountingCopy.describe();

// accounting.addEmployee("amy");
// accounting.addEmployee("may");

// accounting.printemployeeInformation();
