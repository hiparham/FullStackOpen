const RadioWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-[.5rem]">
      <h2 className="text-white font-semibold capitalize text-[1.02rem]">
        {label} :
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-[.5rem]">{children}</div>
    </div>
  );
};
export default RadioWrapper