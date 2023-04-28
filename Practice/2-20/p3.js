const redB = document.getElementById("RED")
const photoChange = document.getElementById("photoz")

redB.addEventListener('click',function() {
    photoChange.setAttribute('src','https://picsum.photos/id/237/200/300')
})