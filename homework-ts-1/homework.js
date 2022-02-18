//elements
var fullname = document.querySelector(".fullname");
var age = document.querySelector(".age");
var role = document.querySelector(".role");
var btn_person01 = document.querySelector(".person01");
var btn_person02 = document.querySelector(".person02");
var imageChange = document.querySelector(".profile_pic");
var person01 = {
    name: "Jonas Smith",
    age: 30,
    role: "Software Engineer",
    img: "./img/jonas-pic.jpg"
};
var person02 = {
    name: "Jay Lee",
    age: 27,
    role: "Designer",
    img: "./img/may-pic.jpg"
};
btn_person01 === null || btn_person01 === void 0 ? void 0 : btn_person01.addEventListener("click", function () {
    fullname.innerText = person01.name;
    age.innerText = person01.age.toString();
    role.innerText = person01.role;
    imageChange.src = person01.img;
});
btn_person02 === null || btn_person02 === void 0 ? void 0 : btn_person02.addEventListener("click", function () {
    fullname.innerText = person02.name;
    age.innerText = person02.age.toString();
    role.innerText = person02.role;
    imageChange.src = "./img/may-pic.jpg";
});
