import { useState,useEffect} from "react"
import {nanoid} from "nanoid"
import ItemList from "./ItemList"
import DayCard from "./DayCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import WeatherChart from "./WeatherChart"

export default function WeatherCard() {

  const [chooseCity,setchooseCityState] = useState({
    name:"",
    lat:"",
    lon:"",
    state:""
  })

  const [APIWeeklyTemperature,setAPIWeeklyTemperature] = useState({
    loading:false,
    error:false,
    data:undefined
  })


  useEffect(()=>{
    setAPIWeeklyTemperature({...APIWeeklyTemperature,loading:true})
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${chooseCity.lat}&longitude=${chooseCity.lon}&daily=weathercode,temperature_2m_max&timezone=auto`)
    .then(res=>{
      if(!res.ok)throw new Error("")
      return res.json()
    })
    .then(data=>{
      setAPIWeeklyTemperature({loading:false,error:false,data:data})
      console.log(data)
    })
    .catch(()=>{
      setAPIWeeklyTemperature({loading:false,error:true,data:undefined})
    })
  },[chooseCity])



  //////////////////////////////// 

  const [APICurrentTemperature,setAPICurrentTemperature] = useState({
    loading:false,
    error:false,
    data:undefined
  })

  useEffect(()=>{
    setAPICurrentTemperature({...APICurrentTemperature,loading:true})
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${chooseCity.lat}&longitude=${chooseCity.lon}&current=weathercode&current=temperature_2m&timezone=auto&forecast_days=1`)
    .then(res=>{
      if(!res.ok)throw new Error("")
      return res.json()
    })
    .then(data=>{
      setAPICurrentTemperature({loading:false,error:false,data:data})
    })
    .catch(()=>{
      setAPICurrentTemperature({loading:false,error:true,data:undefined})
    })
    //fonction de nettoyage pour supprimer la liste des villes
    return ()=>{
      setAPICoordinates({...APICoordinates,data:undefined})
    }
  },[chooseCity])

  /////////////////////////////////////////////
  const [city,setCity]=useState("")
  const [isSearching,setIsSearching]=useState(false)

  const [APICoordinates,setAPICoordinates] = useState({
    loading:false,
    error:false,
    data:undefined
  })

  // Appel API afin d'avoir une liste de ville avec leur longitude et leur latitude
  useEffect(()=>{
    setAPICoordinates({...APICoordinates,loading:true})
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ffabfc8eb9e48f902258697fde12df97`)
    .then(res=>{
      if(!res.ok)throw new Error("")
      return res.json()
    })
    .then(data=>{
      setAPICoordinates({loading:false,error:false,data:data})
    })
    .catch(()=>{
      setAPICoordinates({loading:false,error:true,data:undefined})
    })
  },[isSearching])

  function handleInput(e){
    setCity(e.target.value)
  }

  function handleSearch(e){
    e.preventDefault()
    setIsSearching(!isSearching)
  }

  ///////////////////////////////////////////////

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="order-2 w-full md:max-w-2xl">
        <form className="">
          <div className="bg-[#334155]">
            <header className="px-5 flex">
              <input
              className="bg-[#334155] text-zinc-200 outline-none py-5 border-b flex-grow"
              type="text"
              placeholder="Entrer une localisation"
              onChange={handleInput}
              />
              <button className="p-5 bg-[#E1F5FE] border-b" onClick={handleSearch}><FontAwesomeIcon className="text-[#334155]" icon={faMagnifyingGlass} /></button>
            </header>
            {APICoordinates.data?.length > 0 ? (
              <ul>
                {APICoordinates.data.map((item) => (
                  <ItemList
                    key={nanoid(8)}
                    name={item.name}
                    state={item.state}
                    lat={item.lat}
                    lon={item.lon}
                    chooseCity={setchooseCityState}
                  />
                ))}
              </ul>
            ) : APICoordinates.data?.length === 0 ? (
              <p>Votre requête ne correspond à aucune donnée</p>
            ) : null}
          </div>
        </form>
      </div>
      <div className="order-1 w-full md:max-w-2xl">
      {APICurrentTemperature.data && (
          <DayCard
            key={nanoid(8)}
            temperature={APICurrentTemperature.data.current.temperature_2m}
            weatherCode={APICurrentTemperature.data.current.weathercode}
            name={chooseCity.name}
            state={chooseCity.state}
          />
        )}
        {APIWeeklyTemperature.data && (
          <WeatherChart
            key={nanoid(8)}
            temperature={APIWeeklyTemperature.data.daily.temperature_2m_max}
            weatherCode={APIWeeklyTemperature.data.daily.weathercode}
            days={APIWeeklyTemperature.data.daily.time}
          />
        )}
      </div>
      
    </div>
  )
}