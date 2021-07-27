
/* Global Variables */
const api_key = "9b948de7776b6493094f6fa1a3b2a939";
const base_url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// get the data weather from the url
const getWeather = async(url)=>{
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
        document.getElementById('city').innerHTML =`City: ${allData[0].city}` ;
        document.getElementById('date').innerHTML = `City: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `City: ${allData[0].temp}`;
        document.getElementById('description').innerHTML = `City: ${allData[0].description}`;
        document.getElementById('content').innerHTML = `City: ${allData[0].content}`;
        
    }
    catch(error){
        console.error;
    }
};

// start function that generates everything
const start = ()=>{
    const zip = document.getElementById("zip").value;
    const url = `${base_url}&zip=${zip}&APPID=${api_key}`;
    let feelings = document.getElementById("feelings").value;


    getWeather(url).then((data) =>
    {
        postData('/projectData',
        {   
            city:data.city,
            date:newDate,
            temp:data.temp,
            content:feelings,
            description:data.description
        })

    })
    .then(updateUi('/projectData'))
}

// starting the start functino on click 
const button = document.getElementById('generate');
button.addEventListener('click',start);


