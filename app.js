console.log("app.js loaded successfully");
const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
fromCurr.value = "USD";
toCurr.value = "PKR";

for (let select of dropdowns){
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD") {
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "PK"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateflag(evt.target);
    });
};

const updateExchangeRate = async () => {
    let amount = document.querySelector("#amount");
    let amtVal = Number(amount.value);
    if (amtVal === "" || amtVal < 1){
        amtVal =1;
        amount.value = "1";
    }

    let from=fromCurr.value.toLowerCase();
    let to=toCurr.value.toLowerCase();
    const URL = `${Base_URL}/${from}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from][to];

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateflag = (element) => {
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateflag(fromCurr);
    updateflag(toCurr);
    updateExchangeRate();
});
