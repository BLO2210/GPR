const allDishesButton = document.getElementById("all")
const starterDishesButton = document.getElementById("starters")
const entreeDishesButton = document.getElementById("entrees")
const dessertDishesButton = document.getElementById("desserts")
const menuList = document.getElementById("menuList")

//Default Display
const menu = dishes.map(function(dish) {
    return `<li>
            <img class = "dishpic" src = "${dish.imageURL}" />
            <div>${dish.title}</div>
            <div>${dish.description}</div>
            <div>${dish.price}</div>
        </li>`
})

 menuList.innerHTML = menu.join("")

 //all button
 allDishesButton.addEventListener('click',function() {
const menu = dishes.map(function(dish) {
    return `<li>
            <img class = "dishpic" src = "${dish.imageURL}" />
            <div>${dish.title}</div>
            <div>${dish.description}</div>
            <div>${dish.price}</div>
        </li>`
})
menuList.innerHTML = menu.join("")
 })

//Starters
starterDishesButton.addEventListener('click',function() {
const startersFilter = dishes.filter(function(dish) {
    return dish.course == "Starters"
})


const startersMenu = startersFilter.map(function(dish) {
    return `<li>
    <img class = "dishpic" src = "${dish.imageURL}" />
    <div>${dish.title}</div>
    <div>${dish.description}</div>
    <div>${dish.price}</div>
</li>`
})

menuList.innerHTML = startersMenu.join("")
})

entreeDishesButton.addEventListener('click',function() {
const entreesFilter = dishes.filter(function(dish) {
    return dish.course == "Entrees"
})


const entreesMenu = entreesFilter.map(function(dish) {
    return `<li>
    <img class = "dishpic" src = "${dish.imageURL}" />
    <div>${dish.title}</div>
    <div>${dish.description}</div>
    <div>${dish.price}</div>
</li>`
})

menuList.innerHTML = entreesMenu.join("")
})

dessertDishesButton.addEventListener('click',function() {
const dessertsFilter = dishes.filter(function(dish) {
    return dish.course == "Desserts"
})


const dessertsMenu = dessertsFilter.map(function(dish) {
    return `<li>
    <img class = "dishpic" src = "${dish.imageURL}" />
    <div>${dish.title}</div>
    <div>${dish.description}</div>
    <div>${dish.price}</div>
</li>`
})

menuList.innerHTML = dessertsMenu.join("")
})