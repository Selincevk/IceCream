

const Card = ({item}) => {
  return (
    <div className="bg-black/20 border border-white/50 rounded-[24px] pl-[10px] pr-[20px] py-[30px] flex gap-[15px] lg:gap-[30px]">
      <div className="flex items-center">
<img src={item.image} alt={item.name} />

      </div>
     
    </div>
  )
}

export default Card
