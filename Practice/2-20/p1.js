const redB = document.getElementById("RED")

const blueB = document.getElementById("BLUE")

 redB.addEventListener('click',function() {
        redB.setAttribute("style","background-color:red")
        
})


blueB.addEventListener('click',function() {
    blueB.setAttribute("style","background-color:blue")
})