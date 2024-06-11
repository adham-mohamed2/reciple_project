

// ****************************************************************

//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

let serach_input = document.querySelector(".serach_input");
let content = document.querySelector(".content-result");
let btn_search = document.querySelector(".search-icon");


btn_search.addEventListener("click" , get_product)

function get_product(){
    search_term = serach_input.value.trim();
    let api_url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search_term}`
    show_product(api_url);
}

async function show_product(reciple){
    const responseve =  await fetch(reciple);
    const data = await responseve.json();
    if(data.meals == null){
        content.innerHTML = "Product Not Found";
        return;
    }
    content.innerHTML = '';
    data.meals.forEach(reciple => {
        content.innerHTML += `
            <div class="card">
                <img src="${reciple.strMealThumb}" class="card-img" alt="">
                <div class="card-body text-center">
                    <div class="card-title text-capitalize">${reciple.strMeal}</div>
                    <button onclick="get_id(this.id)" id="${reciple.idMeal}" class="text-capitalize">get reciple</button>
                </div>
            </div>
        `
    });
}

function get_id(id){
    let url_id = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    product_details(url_id);
}

let popap = document.querySelector(".popap-details");

async function product_details(details){
    let content_popap = document.querySelector(".content-popap");
    const response = await fetch(details);
    const data = await response.json();

    data.meals.forEach((details)=>{
        content_popap.innerHTML = `
            <h2 class="header text-capitalize">${details.strMeal}</h2>
            <p class="Instructions">Instructions :</p>
            <p class="pragraph-content-details mb-4">${details.strInstructions}</p>
            <a href="${details.strYoutube}">Watch video</a>
        `
    })
    popap.style.left = "0";

}
let close_popap = document.getElementById("close-icon");
close_popap.addEventListener("click" , ()=>{
    popap.style.left="-100%";
})


