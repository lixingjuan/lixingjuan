import style from './app.css'
console.log({style});

const div = document.createElement("div");
div.classList.add(style.box)
document.body.appendChild(div)