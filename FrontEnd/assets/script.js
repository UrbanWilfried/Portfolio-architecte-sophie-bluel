fetch("http://localhost:5678/api/works")
.then(reponce=>{
    return reponce.json()
})
.then(data=>{
    for(let work of data){
        creerWok(work)
    }
})

function creerWok(work){
    let figur=document.createElement("figure")
    let image=document.createElement("img")
    image.setAttribute("src",work.imageUrl)
    image.setAttribute("alt",work.title)
    let figcaption=document.createElement("figcaption")
    figcaption.textContent=work.title
    figur.appendChild(image)
    figur.appendChild(figcaption)

    let divGallery=document.querySelector(".gallery")
    divGallery.appendChild(figur)
}
