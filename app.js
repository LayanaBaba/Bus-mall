'use strict';

let imageElement=document.getElementById('images-div');

let leftImageElement=document.getElementById('left-image');
let centerImageElement=document.getElementById('center-image');
let rightImageElement=document.getElementById('right-image');

let maxAttempts=25;
let userAttempts=0;

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

function Product(name,path,shown,votes){
this.name=name;
this.path=path;
this.shown=0;
this.votes=0;

Product.allProducts.push(this)
}

Product.allProducts=[];


new Product('bag','img/bag.jpg');
new Product('banana','img/banana.jpg');
new Product('bathroom','img/bathroom.jpg');
new Product('boots','img/boots.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('bubblegum','img/bubblegum.jpg');
new Product('chair','img/chair.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('dog-duck','img/dog-duck.jpg');
new Product('dragon','img/dragon.jpg');
new Product('pen','img/pen.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('scissors','img/scissors.jpg');
new Product('shark','img/shark.jpg');
new Product('sweep','img/sweep.png');
new Product('tauntaun','img/tauntaun.jpg');
new Product('unicorn','img/unicorn.jpg');
new Product('usb','img/usb.gif');
new Product('water-can','img/water-can.jpg');
new Product('wine-glass','img/wine-glass.jpg');

//console.log(Product.allProducts);

function generatRandomIndex(){
    return Math.floor(Math.random()*Product.allProducts.length)
}

//console.log(generatRandomIndex());

function renderThreeImage(){
    leftImageIndex=generatRandomIndex();
    centerImageIndex=generatRandomIndex();
    rightImageIndex=generatRandomIndex();
    Product.allProducts[leftImageIndex].shown++
    Product.allProducts[centerImageIndex].shown++
    Product.allProducts[rightImageIndex].shown++


    while(leftImageIndex===centerImageIndex||leftImageIndex===rightImageIndex||centerImageIndex===rightImageIndex){
        centerImageIndex=generatRandomIndex();
        rightImageIndex=generatRandomIndex();
        
    }
//console.log(Product.allProducts[leftImageIndex.path]);
    leftImageElement.src=Product.allProducts[leftImageIndex].path;
    centerImageElement.src=Product.allProducts[centerImageIndex].path;
    rightImageElement.src=Product.allProducts[rightImageIndex].path;

    leftImageElement.alt=Product.allProducts[leftImageIndex].name;
    centerImageElement.alt=Product.allProducts[centerImageIndex].name;
    rightImageElement.alt=Product.allProducts[rightImageIndex].name;


   
}
renderThreeImage();



imageElement.addEventListener('click',handleUserClick);
let showResult;
let hideResult;

function handleUserClick(event){
    if(event.currentTarget!==event.target){
        userAttempts++;

let userAttemptsElement=document.getElementById('container');
  
if (maxAttempts-userAttempts===0){
    let buttonElement=document.getElementById('button');
    showResult=document.createElement('button');
    buttonElement.appendChild(showResult);
    showResult.textContent='Result';

    hideResult=document.getElementById('button');
    buttonElement.appendChild(hideResult);
    hideResult.textContent='Hide';

    showResult.addEventListener('click', renderShowResult);
    hideResult.addEventListener('click', renderHideResult);
}


if (maxAttempts-userAttempts>=0){

    userAttemptsElement.textContent=maxAttempts-userAttempts;
}else{
    userAttemptsElement.textContent=0;
}

if(userAttempts<=maxAttempts){
            if(event.target.Id==='left-image'){
                Product.allProducts[leftImageIndex].votes++
            }else if(event.target.Id==='center-image'){
                Product.allProducts[centerImageIndex].votes++
            }else{
                Product.allProducts[rightImageIndex].votes++
            }
            
            renderThreeImage();
            
        }
        else{
           imageElement.removeEventListener('click',handleUserClick)
    
            }
    }
}


function renderShowResult(){
    let list=document.getElementById('results-list');
    let productResult;
   
    for (let i=0; i< Product.allProducts; i++){
        productResult=document.createElement('li');
        list.appendChild(productResult);
        productResult.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} and was seen ${Product.allProducts[i].shown} times.`;
    }    

}



function renderHideResult(){
    let list=document.getElementById('results-list');
    list.textContent='';
}

