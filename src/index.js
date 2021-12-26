
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const container = document.querySelector("#dog-image-container")
//console.log('%c HI', 'color: firebrick')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulContainer = document.querySelector("#dog-breeds")
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray = []

dropDown.addEventListener('change', handleChange)
ulContainer.addEventListener('click', handleClick)


//adds image elements to the DOM **for each** 🤔 image in the array

//- on page load, fetches the images using the url above ⬆️
function getImages(){
fetch(imgUrl)
//- parses the response as `JSON`
    .then(resp => resp.json()) //transforms it into JSON 
    .then(images => {//where we're going to receive that data and do something with it
        const imgs = images.message //what property do you need to return to get the meat of that data? then store it in a variable
        //take this array of images 
        // turn it into img elements
        let imgsArray = createImageElement(imgs)
        renderElement(imgsArray)
        // append each img element to the DOM 
       
    })
}
function createImageElement(imgs){
    return imgs.map((img) => { // map creates a new array populated with the results of calling a provided function on every element in the calling array
        let i = `<img src =${img}>`//this is template literal, it recognizes it as a string instead of an actual node
        return i //THIS LINE IS VERY IMPORTANT BECAUSE MAP NEEDS TO RETURN SOMETHING
    })
    
}

function renderImg(imgsArray){
    imgsArray.forEach(element => {
        renderElement(element)
    })

}

function renderElement(element){
    ulContainer.innerHTML += element//use inner HTML because when you use Template Literals you wont get a node, youll get text 
    //you have to use += because it adds instead of replace
    
}



//the following function returns an object instead of an array in the console if you throw a debugger
//after the second then, and go to the console, type "breeds", you will see an object with 
//"message" and "status" properties
//"message" contains an object of dog breeds (key / value pairs)
//you want to turn the keys in an object into an array 
//object.keys() keys inside a hash are properties, call it on your object and it will turn all the properties in to elemnts of an array
//create li elements using map
function getBreeds(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then (breeds => {
        breedsArray = Object.keys(breeds.message)
        const breedsLis = createLiElements(breedsArray)
        renderLis(breedsLis)

        

    })
}

//create li elements using map()
function createLiElements(breedsArray){
    return breedsArray.map((breed) => {
        let li = `<li>${breed}</li>`
        return li
    })
}


function renderLis(breedsLis){
    breedsLis.forEach(element => {
        renderElement(element)

    })
}

function handleClick(event){
    if( event.target.style.color === "pink"){
        event.target.style.color = "black"
    }else
    event.target.style.color = "pink";
}

//filter() (array) method in javascript - creates a new array with all the elements that pass the test implemented by the provided function 
function handleChange(event){
    let letter = event.target.value;
    //console.log(breedsArray)
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filteredBreedsLis = createLiElements(filteredBreeds)
    ulContainer.innerHTML = ''
    renderLis(filteredBreedsLis)
    
}



//getImages()
getBreeds()
    