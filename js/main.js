var productNameInput=document.getElementById("ProductName");
var productPriceInput=document.getElementById("ProductPrice");
var productCategoryInput=document.getElementById("ProductCategory");
var productDescInput=document.getElementById("ProductDesc");
var productImgInput=document.getElementById("ProductImg");
var addBtn=document.getElementById("addBtn");
var updateBtn=document.getElementById("UpdateBtn")
var productContainer=[];
if (localStorage.getItem("product")!==null) {
    productContainer=JSON.parse(localStorage.getItem("product"))
    display()
}
function addProduct() {
    console.log(productImgInput.files[0]?.name);
    
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
        img:productImgInput.files[0]?`./images/${productImgInput.files[0]?.name}` : 'images/header-bg.jpg'
    }
    productContainer.push(product)
    console.log(productContainer);
    localStorage.setItem("product",JSON.stringify(productContainer))
    display()
    clearForm()
}
function clearForm() {
    productNameInput.value=null;
    productPriceInput.value=null;
    productCategoryInput.value=null;
    productDescInput.value=null;
    productImgInput.value=null;
}

function display(){
    var details='';
    for(var i=0;i<productContainer.length;i++){
    details+=`
    <div class="col-lg-2 col-sm-6">
        <img src="${productContainer[i].img}" alt="Product image" class="w-100 d-block">
        <h3>${productContainer[i].name}</h3>
        <p class="text-secondary">${productContainer[i].desc}</p>
        <h4 class="h5"><span class="text-info">Category: </span> ${productContainer[i].category} </h4>
        <h4 class="h5"><span class="text-danger">Price: </span> ${productContainer[i].price} </h4>
        <button onclick="deleteItem (${i})" class="btn btn-outline-danger w-100">Delete</button>
        <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning mt-2 w-100">Update</button>
    </div>
    `
    }
    document.getElementById("row").innerHTML=details;
}
function deleteItem(index){
    productContainer.splice(index,1)
    console.log(productContainer);
    
    display()
    localStorage.setItem("product",JSON.stringify(productContainer))
}
var updatedindex;
function setFormForUpdate(i){
    updatedindex=i;
    productNameInput.value=productContainer[i].name;
    productPriceInput.value=productContainer[i].price;
    productCategoryInput.value=productContainer[i].category;
    productDescInput.value=productContainer[i].desc;
    // productImgInput.files[0]?.name=productContainer[i].img;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
}

function UpdateProduct(){
    productContainer[updatedindex].name=productNameInput.value;
    productContainer[updatedindex].price=productPriceInput.value;
    productContainer[updatedindex].category=productCategoryInput.value;
    productContainer[updatedindex].desc=productDescInput.value;
    // productContainer[updatedindex].img=productImgInput.files[0]?.name;
    display()
    clearForm()
    localStorage.setItem("product",JSON.stringify(productContainer))
    updateBtn.classList.add("d-none")
    addBtn.classList.remove("d-none");
}