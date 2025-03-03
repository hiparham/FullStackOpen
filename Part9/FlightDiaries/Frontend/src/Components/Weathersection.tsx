const WeatherSection = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-[.2rem]">
      <label htmlFor={label} className="text-zinc-200 capitalize ">
        {label}
      </label>
      <input
        type="radio"
        name="weather"
        id={label}
        value={label}
        defaultChecked={label === "sunny"}
      />
    </div>
  );
};
export default WeatherSection;
