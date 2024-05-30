//images//

import Search from "./img/search.png"
import Wind from "./img/wind.png"
import Humadity from "./img/humidity.png"

//style//

import "./App.css"
import {useEffect, useState} from "react"

const WeatherDetails = ({img, temp, city, contry,lat,long,humidity,wind}) =>{
  return(
    <>
      
      <div className="temp"> {temp}°C </div>
      <div className="location">{city}</div>
      <div className="contry">{contry}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="datacontainer">
          <div className="element">
            <img src={Humadity} alt="image" width="50px" height="50px" className="icon"/>
            <div className="data">
              <div className="humiditypercent"> {humidity} %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={img} alt="image" width="50px" height="50px" className="icon"/>
            <div className="data">
              <div className="humiditypercent">{wind} km/h</div>
              <div className="text">WindSpeed</div>
            </div>
          </div>
      </div>
    </>
  )
}


function App(){
  const [img, setimg]= useState(Wind)
  const [temp, setTemp] = useState(30)
  const [city, setCity] = useState("chennai")
  const [contry, setContry] = useState("IN")
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [text, setText] =useState("Chennai")
  const [loading,setLoading] =useState(false)
  const [cityNotFound,setCityNotFound] =useState(true)
  const [error,setError]= useState(null)

  const search = async ()=>{
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=a02d50af9c1e8bf225033c1be030586f&units=Metric`

    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod === "404"){
        console.log("city not found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      else{
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name)
      setCityNotFound(false)
      setContry(data.sys.country);
      setLat(data.coord.lat)
      setLong(data.coord.lon)
      }
    }
    catch(error){
      console.log("An error occourred:", error.message)
      setError("An error occured whlie fetching data.")
    }

    finally{
      setLoading(false)
    }
  }

  const handelcity = (e)=>{
    setText(e.target.value);
  }

  const HandelKeyDown= (e)=>{
    if(e.key==="Enter"){
      search();
    }
  }

  useEffect(function (){
    search();
  }, [])
  return(
    <>
      <div className="container">
        <div className="inputcontainer">
          <input type="text" className="cityinput" placeholder="Search City"  value={text}  onKeyDown={HandelKeyDown} onChange={handelcity}/>
          <img src={Search} alt="Search" width="30px" height="30px" className="searchicon" onClick={()=>search()}/>
        </div>
        
        {loading && <div className="loadingmsg">Loading....</div>}
        {cityNotFound && <div className="loadingmsg">City Not Found...</div>}

        {!cityNotFound&& <WeatherDetails img={img}  temp={temp} city={city} contry={contry} lat={lat} long={long} humidity={humidity} wind={wind} />}
       

        
      </div>

    
    
    
    
    </>
    
  )
}

export default App;