import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'


export default function WeatherChart({temperature,weatherCode,days}) {

  
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  )

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

 
  const weatherCodeImages = weatherCode.map((code)=>{
    const { path, alt } = weatherCodeMapping[code];
  
    return (
      <img key={code} className="w-auto" src={`/assets/static/${path}`} alt={alt} />
    )

  })

   // Change le format de la date pour 'JJ-MM' exemple '24 oct'
   function formatDate(inputDate) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('fr-FR', options);
  }

  // création des propriétés du graphique
  const labels = days.map((day)=>{
    return(formatDate(day))
  })

  const data = {
    labels:labels,
    datasets:[{
      data:temperature,
      fill:true,
      color:'#E2E8F0',
      backgroundColor:'white',
      borderColor:'#E2E8F0',
      tension:0.4,
    }]
  }
  const options = {
    scales: {
      x:{
        ticks:{
          color:'#E2E8F0',
          font: {
            size:14
          }
        }
        
      },
      y:{
        ticks:{
          color:'#E2E8F0'
        }
        
      },
    }
  }


  return (
    <>
      <Line className='bg-[#334155] px-5' data={data} options={options}/>
    </>
  )
}