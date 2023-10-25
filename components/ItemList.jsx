

export default function ItemList({name,lat,lon,state,chooseCity}) {
  return (
    <>
      <li >
          <button onClick={()=> chooseCity({name:name,lat:lat,lon:lon,state:state})} className="w-full text-zinc-300 flex justify-between py-2 px-5 cursor-pointer hover:text-white">
            <span>{name}</span>
            <span>{state}</span>
          </button>
      </li>
    </>
  )
}