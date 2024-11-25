const PaginationScroll = ({ title, description, num }: { title: string; description: string; num: string }) => {
  return (
    <div className="pagination mt-4 flex  text-black items-start">
      <div className=" flex flex-col items-center  mr-5">
        <span className=" text-xs  lg:text-[10px] font-general mt-[0.6px] ">{num}</span>
        <span className="lineContainer bg-gray-300/80 relative overflow-hidden rounded-xl mt-4 w-1  h-24">
          <span className=" bg-gray-800/80 absolute line -translate-y-full top-0 rounded-xl mt-4 w-1  h-24"></span>
        </span>
      </div>
      <div className=" flex pagination2 flex-col gap-2  relative font-robert-regular">
        <h4 className="title">{title}</h4>
        <div className=" h-auto">
          <p className=" max-w-64 absolute top-7  text-xs lg:text-sm font-circular-web">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaginationScroll;
