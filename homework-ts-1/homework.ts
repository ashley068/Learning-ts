//elements
let fullname = document.querySelector(".fullname")! as HTMLElement;
let age = document.querySelector(".age")! as HTMLElement;
let role = document.querySelector(".role")! as HTMLElement;
const btn_person01 = document.querySelector(".person01");
const btn_person02 = document.querySelector(".person02");
const imageChange = document.querySelector(".profile_pic")! as HTMLImageElement;

type PersonCard = { name: string; age: number; role: string; img: string };

const person01: PersonCard = {
  name: "Jonas Smith",
  age: 30,
  role: "Software Engineer",
  img: "./img/jonas-pic.jpg",
};

const person02: PersonCard = {
  name: "Jay Lee",
  age: 27,
  role: "Designer",
  img: "./img/may-pic.jpg",
};

btn_person01?.addEventListener("click", () => {
  fullname.innerText = person01.name;
  age.innerText = person01.age.toString();
  role.innerText = person01.role;
  imageChange.src = person01.img;
});

btn_person02?.addEventListener("click", () => {
  fullname.innerText = person02.name;
  age.innerText = person02.age.toString();
  role.innerText = person02.role;
  imageChange.src = "./img/may-pic.jpg";
});
