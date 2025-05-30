import React from 'react';

function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[88.5vh]">
      <div className='flex w-full'>
        <div className='bg-[#ccc] animate-pulse ml-20 mb-6 w-[80px] h-[40px] rounded-[15px]'></div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-[95%] md:w-[90%] h bg-white rounded-2xl shadow-xl h-65vh">

        {/* Image section */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-[350px] bg-gray-300 rounded-xl animate-pulse"></div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="text-gray-800 flex flex-col gap-5 justify-center">
          <div className="h-8 bg-gray-300 rounded-md w-[60%] animate-pulse"></div>
          {[1, 2, 3, 4, 5, 6].map((_, id) => (
            <div key={id} className="h-4 bg-gray-200 rounded-md w-[80%] animate-pulse"></div>
          ))}
          <div className="h-10 bg-green-200 rounded-md w-[40%] animate-pulse"></div>
        </div>

        {/* Description */}
        <div className="flex flex-col justify-between gap-4 mt-[75px] min-h-[300px] max-h-[200px] pr-2">
          <div className="h-4 bg-gray-200 w-[60%] rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 w-[40%] rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-12 bg-red-200 w-full md:w-[70%] rounded-lg animate-pulse"></div>
        </div>

      </section>
    </div>
  );
}

export default ProductDetailSkeleton;
