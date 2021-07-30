/* Global Variables */
const api_key = "a1bc522478322c40ad104448d43305b3";
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear()

// postData function it is an asyncrouse function which post the given data to the route which will be saved by the server side to an array 
const postData= async (url='',data)=>
{
    const req = await fetch(url ,{
        method:'POST',
        Credentials:'semi-origin',
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(data)
    });
    try{
        const postedData = req.json();
        return postData;
    }
    catch(error){
        console.log(error)
    }

}

//  getWeatherData function to the weather data from the the weatheropenapp
const getWeatherData = async(url)=>
{
    const res = await fetch(url)
    try{

        const newRes = res.json()
        console.log(newRes)

    }
    catch(error){

        console.log(error)
    }

}

// a temp handling function
const kToC = (kel)=>
{
    const cel = kel-273
    return (`${cel} C` )
};

// generator function

const gen = (baseURL,code,api_key)=>
{
    const url = `${baseURL}&zip=${code}&appid${api_key}`
    return url
};

// update function to update the UI of the user dynamiclly
const updateUI = async ()=>{
    // fetching  the data from the /all route  and assignning it to request const
    const request = await fetch("/all")
    try
    {
        //interpreting the fetched data using json to a readable javascript data and assigning it to allData const
        const  allData = req.json();
        // assginning the html divs values to the updated data 
        document.getElementById("city").innerHTML = allData[0].city;
        document.getElementById("date").innerHTML = allData[0].date;
        document.getElementById("temp").innerHTML = kToC(allData[0].temp);
        document.getElementById("content").innerHTML = allData[0].content;
        document.getElementById("description").innerHTML = allData[0].description;
    }

    catch(error){
        console.log(error);
    }

}
// get function to get all the data from and the endpoint after posting  all needed data 

const postGet = ()=>
{
    const url = gen;
    const content = document.getElementById('feelings').value;
    // get the data from the weather app it can be posted using postData function to another route
     getWeatherData(url)

    .then(function(data){
        postData('/add',
        {
            // basically a pair of key and value data to be able to post to /add route and get any of it by calling its key
            city:data.city,
            date:Date,
            temp:data.temp,
            content:data.content,
            description:data.description
        })
        .then(
            // then after posting the data ,update the data by getting the data from the '/all'route which sends back the whole url  
            // which is saved after being interpreted as json file to an array , which the json file is the first element in that array  
            updateUI()
            )

    } )
}


// error handler function to handle whenever the user doesnt provide data that will affect on the running project especially the zipCode  
const handling = (n='',m='')=>
{
    if(n===''){
        const msgZ = "please enter a valid Zip Code!"
        document.getElementById("zip").value=msgz
    }

    if(m ===''){
        const msgD = "please enter how you feel !"
        document.getElementById("feelings").value = msgD;
    } 
}


