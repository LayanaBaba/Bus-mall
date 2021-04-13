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

let nameArr=[];
let votesArr=[];
let showArr=[];

function Product(name,path){
this.name=name;
this.path=path;
this.shown=0;
this.votes=0;

Product.allProducts.push(this)
nameArr.push(this.name);
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
let storeArr=[];

function renderThreeImage(){
    leftImageIndex=generatRandomIndex();
    centerImageIndex=generatRandomIndex();
    rightImageIndex=generatRandomIndex();

   
    while(leftImageIndex===centerImageIndex||leftImageIndex===rightImageIndex||centerImageIndex===rightImageIndex||storeArr.includes(leftImageIndex)||storeArr.includes(centerImageIndex)||storeArr.includes(rightImageIndex)){
        leftImageIndex=generatRandomIndex();
        centerImageIndex=generatRandomIndex();
        rightImageIndex=generatRandomIndex();
        
    }
    storeArr=[];
    storeArr.push(leftImageIndex)
    storeArr.push(centerImageIndex)
    storeArr.push(rightImageIndex)
    console.log(storeArr);
 

    leftImageElement.src=Product.allProducts[leftImageIndex].path;
    centerImageElement.src=Product.allProducts[centerImageIndex].path;
    rightImageElement.src=Product.allProducts[rightImageIndex].path;

    leftImageElement.alt=Product.allProducts[leftImageIndex].name;
    centerImageElement.alt=Product.allProducts[centerImageIndex].name;
    rightImageElement.alt=Product.allProducts[rightImageIndex].name; 
    
    Product.allProducts[leftImageIndex].shown++;
    Product.allProducts[centerImageIndex].shown++;
    Product.allProducts[rightImageIndex].shown++;
    
}
renderThreeImage();



imageElement.addEventListener('click',handleUserClick);



function handleUserClick(event){
   
    userAttempts++;
if(userAttempts<=maxAttempts){
            
            if(event.target.id==='left-image'){
                Product.allProducts[leftImageIndex].votes++;
            }else if(event.target.id==='center-image'){
                Product.allProducts[centerImageIndex].votes++;
            }else if(event.target.id==='right-image'){
                Product.allProducts[rightImageIndex].votes++;
            }else{
                console.log(userAttempts);
            }
            
            console.log(Product.allProducts[leftImageIndex].votes);
            renderThreeImage();
            
        }else{
           
            
            let button=document.getElementById('button');
            button.addEventListener('click',renderShow);
            button.hidden=false;
          
for (let i=0; i<Product.allProducts.length; i++){
    votesArr.push(Product.allProducts[i].votes);
    showArr.push(Product.allProducts[i].shown);
}
 chart ();
            imageElement.removeEventListener('click',handleUserClick);   
        }        
   }
   function renderShow(){
    let list=document.getElementById('results-list');
    let productResult;

       for (let i=0; i< Product.allProducts.length; i++){
       productResult=document.createElement('li');
       list.appendChild(productResult);
       productResult.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and was seen ${Product.allProducts[i].shown} times.`;
       }    
       button.removeEventListener('click',renderShow);
}
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let chart= new Chart(ctx,{
      // what type is the chart
     type: 'bar',
  
    //  the data for showing
     data:{
      //  for the names
        labels: nameArr,
        
        datasets: [
          {
          label: 'Goats votes',
          data: votesArr,
          backgroundColor: [
            'rgb(251, 93, 76)',
          ],
    
          borderWidth: 1
        },
  
        {
          label: 'Goats shown',
          data: showArr,
          backgroundColor: [
            'black',
          ],
    
          borderWidth: 1
        }
        
      ]
      },
      options: {}
    });
    
  }