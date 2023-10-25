export default function DayCard({temperature,weatherCode,name,state}) {

const weatherCodeMapping = {
  0: { path: 'day.svg', alt: 'ensoleillé' },
  1: { path: 'day.svg', alt: 'ensoleillé' },
  2: { path: 'day.svg', alt: 'ensoleillé' },
  3: { path: 'day.svg', alt: 'ensoleillé' },
  45: { path: 'cloudy.svg', alt: 'brumeux' },
  48: { path: 'cloudy.svg', alt: 'brumeux' },
  51: { path: 'rainy-7.svg', alt: 'bruine' },
  53: { path: 'rainy-7.svg', alt: 'bruine' },
  55: { path: 'rainy-7.svg', alt: 'bruine' },
  56: { path: 'rainy-7.svg', alt: 'bruine' },
  57: { path: 'rainy-7.svg', alt: 'bruine' },
  61: { path: 'rainy-4.svg', alt: 'fine pluie' },
  80: { path: 'rainy-4.svg', alt: 'fine pluie' },
  63: { path: 'rainy-5.svg', alt: 'pluie modérée' },
  81: { path: 'rainy-5.svg', alt: 'pluie modérée' },
  65: { path: 'rainy-6.svg', alt: 'forte pluie' },
  82: { path: 'rainy-6.svg', alt: 'forte pluie' },
  66: { path: 'rainy-7.svg', alt: 'pluie glaçante' },
  67: { path: 'rainy-7.svg', alt: 'pluie glaçante' },
  71: { path: 'snowy-4.svg', alt: 'un peu enneigé' },
  73: { path: 'snowy-5.svg', alt: 'enneigé' },
  75: { path: 'snowy-6.svg', alt: 'très enneigé' },
  77: { path: 'snowy-6.svg', alt: 'très enneigé' },
  85: { path: 'snowy-6.svg', alt: 'très enneigé' },
  86: { path: 'snowy-6.svg', alt: 'très enneigé' },
  95: { path: 'thunder.svg', alt: 'orageux' },
  96: { path: 'thunder.svg', alt: 'orageux' },
  99: { path: 'thunder.svg', alt: 'orageux' },
};

const { path, alt } = weatherCodeMapping[weatherCode];

const weatherCodeImage = <img className="w-auto" src={`../src/assets/static/${path}`} alt={alt} />;


  let dateNow=new Date()
  let time;
  function displayTime(date){
    return date.getMinutes()<10?date.getHours()+':0'+date.getMinutes():date.getHours()+':'+date.getMinutes()
  }

  function displayDate(date){
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR',options)
  }
  time = displayTime(dateNow)
  dateNow=displayDate(dateNow)

  return (
    <div className="p-5 bg-[#334155] flex flex-col justify-center items-center">
      <p className="text-6xl py-10 font-semibold text-slate-200 md:text-8xl lg:text-10xl">{temperature}°</p>      
      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full flex">
          <p className="text-md font-light text-slate-200 mr-auto md:text-xl"><span className="text-2xl font-semibold md:text-4xl">{name}</span>, {state}</p>
          {weatherCodeImage}
        </div>
        <div className="w-full flex">
          <p className="capitalize text-zinc-200 mr-auto">{time} - {dateNow}</p>
          <p className="capitalize text-slate-200 text-md font-light">{weatherCodeImage.props.alt}</p>
        </div>
      </div>
    </div>
  )
}