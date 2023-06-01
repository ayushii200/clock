const main=document.getElementById('main');
const addUserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const showMillionaireBtn=document.getElementById('show-millionaries');
const sortBtn=document.getElementById('sort');
const calculateWealthBtn=document.getElementById('calculate-wealth');

getRandomUser();
getRandomUser();
getRandomUser();

let data=[];

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];

    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000),
    };
    addData(newUser);
}

function doubleMoney(){
    data=data.map((user)=>{
        return { ...user, money: user.money * 2};
    });
    updateDOM();
}

function showMillionaires(){
    data= data.filter((user)=> user.money>100000);
    updateDOM();
}

function sortByRichest(){
    data.sort((a,b)=> b.money - a.money);
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((acc,user)=>(acc+=user.money),0);

    const wealthE1= document.createElement('div');
    wealthE1.innerHTML=`<h3>Total money:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthE1);

}

function addData(obj){
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML=`<h2><strong>Person</strong>Wealth</h2>`;

    providedData.forEach(item=> {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,`$&,`);
} 

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionaireBtn.addEventListener('click',showMillionaires);
sortBtn.addEventListener('click',sortByRichest);
calculateWealthBtn.addEventListener('click',calculateWealth);