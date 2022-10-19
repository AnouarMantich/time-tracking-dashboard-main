const daily=document.querySelector(".select-daily");
const weekly=document.querySelector(".select-weekly");
const mounthly=document.querySelector(".select-mounthly");
const time=document.querySelectorAll(".time");
const dailyDisplay=document.querySelectorAll(".daily");
const weeklyDisplay=document.querySelectorAll(".weekly");
const mounthlyDisplay=document.querySelectorAll(".mounthly");
const titles=document.querySelectorAll(".title");
const itemContainers=document.querySelectorAll(".item-container");



const sortby=[daily,weekly,mounthly];
let classSort=''

const getData=async function(){
    const res=await fetch('./data.json');
    const data=await res.json();
   return data;

}


const displayData=function(data){
    data.forEach((d,index)=>{
        const {title}=d;
        titles[index].textContent=title;
        const dailyh1=dailyDisplay[index].querySelector("h1");
        const dailyp=dailyDisplay[index].querySelector("p");
        const weeklyh1=weeklyDisplay[index].querySelector("h1");
        const weeklyp=weeklyDisplay[index].querySelector("p");
        const mounthlyh1=mounthlyDisplay[index].querySelector("h1");
        const mounthlyp=mounthlyDisplay[index].querySelector("p");



        const {timeframes}=d;

        dailyh1.textContent=`${timeframes.daily.current}hrs`;
        dailyp.textContent=`Previous -${timeframes.daily.previous}hrs`;
        weeklyh1.textContent=`${timeframes.weekly.current}hrs`;
        weeklyp.textContent=`Previous -${timeframes.weekly.previous}hrs`;
        mounthlyh1.textContent=`${timeframes.monthly.current}hrs`;
        mounthlyp.textContent=`Previous -${timeframes.monthly.previous}hrs`;

        
       })
}

const distinguichSelect=function(sortBy){
    sortBy.style.fontWeight='500';
    sortBy.style.color='white';
    if(sortBy===daily)
        classSort='daily';
    else if (sortBy==weekly)
    classSort='weekly'
    else if (sortBy==mounthly)
    classSort='mounthly'

              time.forEach(t=>{
        if(t.classList.contains(classSort)){
            if(t.classList.contains('hidden')){
                t.classList.remove('hidden')
            }
        }
        else{
            if(!t.classList.contains('hidden')){
                t.classList.add('hidden')
            }
        }
    })
}



const init=async function(){
    daily.style.fontWeight='500';
    daily.style.color='white';
    const data=await getData();
    displayData(data);

}


sortby.forEach(sb=>{   
    sb.addEventListener('click',async function(){
    // getting data from JSON file

       const data=await getData();

    // displaying data 

    displayData(data);

    //    initiate all sort 

         sortby.forEach(sort=>{
            sort.style.color='var(--Pale-Blue)';
            sort.style.fontWeight='300';
         })

    // distangwish the select 
    distinguichSelect(sb);
    })
})

init();