const typeColor = {
bug: "#26de81",
dragon: "#ffeaa7",
electric:"#ffe34b",
fairy: "#FF0069",
fighting: "#30336b",
fire:"#f56700",
flying:"#81ecec",
grass:"#00b894",
ground:"#805220",
ghost:"#34095c",
ice:"#74b9ff",
normal:"#12c2ba",
poison:"#6c5ce7",
psychic:"#b006c8",
rock:"#2d3436",
water:"#0190ff"
}

const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById('card');
const btn = document.getElementById('btn')


let getPokeData = () =>{
    //generate a random number between 1 and 50
    let id = Math.floor(Math.random() * 150 + 1)
    //Combine the pokeapi url with pokemon id
    const finalUrl = url + id;
    console.log(finalUrl)
    //Fetch generated URL

    fetch(finalUrl)
    .then((response) => response.json())
    //proof that we have pokemon object
    //.then((data) => console.log(data))
    .then ((data)=>{
        generateCard(data)
    });
};

//Generate Card

let generateCard = (data) =>{
    //get necesary data and assing it yo variables
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1)
    const statAttack = data.stats[1].base_stat;
    const statdefense = data.stats[2].base_stat;
    const statspeed = data.stats[5].base_stat;

    //Set themeColor based on pokemon type
    const themeColor = typeColor[data.types[0].type.name]
   

   // console.log (themeColor)

    card.innerHTML = `
    <div id="card1"></div>
    <div id="card2"> </div>
    <div id="card3"> </div>
    <p class="hp"><span>HP</span>${hp}</p>
            <img src=${imgSrc} />
            <h2 class="pokemon-name">${pokeName}</h2>

            <div class="types">
           
             </div>

            <div id="stats">
                <div>
                    <h3>${statAttack}</h3>
                    <p class="text">Attack</p>
                </div>
                <div>
                    <h3>${statdefense}</h3>
                    <p class="text">Deffense</p>
                </div>
                <div>
                    <h3>${statspeed}</h3>
                    <p class="text">Speed</p>
                </div>
            </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
    colorText(themeColor);
}


let appendTypes = (types)=>{
    types.forEach((item) =>{
        let span = document.createElement("SPAN")
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span)
    })

}

let styleCard = (color)=>{
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
    card.querySelectorAll('.types span').forEach(
        (typecolor)=>{
            typecolor.style.background =color
        }
    )

}

let colorText = (color)=>{
    card.querySelectorAll('.text').forEach(
        (typecolor)=>{
            typecolor.style.color = color
        }
    )
}


btn.addEventListener('click', getPokeData);
window.addEventListener("load", getPokeData)