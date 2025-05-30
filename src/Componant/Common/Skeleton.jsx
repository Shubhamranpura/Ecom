
const Skeleton = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 bg-gray-50 dark:bg-gray-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-500 shadow rounded-2xl p-4 animate-pulse "
          >
            <div className="bg-gray-300 dark:bg-gray-600  rounded-lg h-[240px] w-full mb-6"></div>

            <div className="bg-gray-300 dark:bg-gray-600   mb-2 h-6 rounded"></div>

            <div className="bg-gray-300 h-4 w-1/2 mb-3 dark:bg-gray-600 rounded"></div>

            <div className="bg-gray-300 h-4 w-1/3 mb-2 dark:bg-gray-600 rounded"></div>

            <div className="bg-gray-300 h-16 w-full dark:bg-gray-600 rounded-lg"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skeleton;
