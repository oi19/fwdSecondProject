
/* Global Variables */
const api_key = "a1bc522478322c40ad104448d43305b3";
const base_url = `http://api.openweathermap.org/data/2.5/forecast?`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// get the data weather from the url
const weather = async(url)=>{
   const res = await fetch(url);
    try{
        const newData = res.json();
        return newData
    }
    catch(error){
        console.error;
    }
   }  

// the post functino to post the data recieved from get to the url so it can be connected to the sercver throught the post function there
   const postData = async(url='', data={})=>{
    const req = await fetch(url ,{
        method:'POST',
        Credentials:'semi-origin',
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(data)
    });

    try{
        const reqData = req.json();
        return(reqData)
    }
    catch(error){
        console.error;
    }

}

// the update of userinterface functino so it can be more dynamic
const updateUi= async(url) =>
{
    const req = await fetch(url)
    try
    {
        const allData = req.json();
        document.getElementById('city').innerHTML = allData[0].city;
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('description').innerHTML = allData[0].description;
        document.getElementById('content').innerHTML = allData[0].content;
        
    }
    catch(error){
        console.error;
    }
};

// start function that generates everything
const start = ()=>{
    const zCode = document.getElementById("zip").value;
    let content = document.getElementById("feelings").value;


    const url = `${base_url}&zip=${zCode}&appid=${api_key}`;
    const data = weather(url)
    const c2 = kToC(data.temp)
    data=>
    {
        postData('/add',
        {   
            city:data.city,
            date:newDate,
            temp:c2,
            content:content,
            description:data.description
        })

    }
    (updateUi('/all'))
}

function kToC(n){
    const c = n-237
    return c
}

// starting the start functino on click 
const button = document.getElementById('generate');
button.addEventListener('click',start);


