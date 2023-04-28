const existingWurdz = document.getElementById("wurdz")

const newWurdz = document.createElement("p");

newWurdz.innerHTML = "Here's a buncha bs that I'm typing out, hopefully these are enough words. Maybe not. Who knows. Anyways, it's time to move on";

existingWurdz.insertAdjacentElement("afterend",newWurdz);
    