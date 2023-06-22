/*fetch("http://localhost:5678/api/works")
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
*/
const works = fetch("http://localhost:5678/api/works").then(response => response.json())

const buttonObjects = document.querySelector(".Objects")
const buttonApartements = document.querySelector(".Apartements")
const buttonHotels = document.querySelector(".Hotels")
const buttonAll = document.querySelector(".All")


buttonObjects.addEventListener("click", function () {
    const filterObjects = works.filter(work => work.category.name === "Objets")
    
    console.log(filterObjects)
})

const fetchWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works")

    return response.json()
}

const init = async () => {
    const works2 = await fetchWorks()
    renderWorks(works2)
    console.log({works2})
}

init()



const renderWorks = (works) => {
    let template= ''
      works.forEach(work => {
        template += `
        <figure>
             <img alt="${work.title}" src="${work.imageUrl}"/>
        <figcaption>${work.title}</figcaption>
        </figure>
             `
       } )
    
      document.getElementById('gallery').innerHTML = template
      
    }