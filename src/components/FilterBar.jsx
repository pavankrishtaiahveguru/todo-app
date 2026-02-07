const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center gap-3 mb-4">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full capitalize text-sm cursor-pointer ${
            filter === f
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;