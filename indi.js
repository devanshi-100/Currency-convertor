const URL="https://v6.exchangerate-api.com/v6/ce348a0589fee3322f3b2b34/pair";

let conversion=document.querySelectorAll(".conversion-box select");
const btn=document.querySelector("button");
let FROM=document.querySelector(".from select");
let TO=document.querySelector(".to select");


for(let select of conversion){
    for(code in countryList){
        let option=document.createElement("option");
        option.innerText=code;
        option.value=code;
        if(select.name==="from" && code==="USD"){
            option.selected="selected";
        }else if(select.name==="to" && code==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        update_flag(evt.target);
    })
}

const update_flag=(ele)=>{
    let curr_code=ele.value;
    let con_code=countryList[curr_code];
    let urlo=`https://flagsapi.com/${con_code}/flat/64.png`;
    let conversion_img=ele.parentElement.querySelector("img");
    conversion_img.src=urlo;
}

const updateExchangeRate=async()=>{
    let amount_box=document.querySelector(".amount-box input");
    let amt_value=amount_box.value;
    if(amt_value==="" || amt_value<=0){
        amt_value=1;
        amount_box.value="1";
    }

    let response= await fetch(`${URL}/${FROM.value}/${TO.value}/${amt_value}`);
    let answer=await response.json();
    let message=document.querySelector(".message");
    message.innerText= `${amt_value}${FROM.value} = ${answer.conversion_result}${TO.value}`;

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();

})

window.addEventListener("load",()=>{
    updateExchangeRate();
})

