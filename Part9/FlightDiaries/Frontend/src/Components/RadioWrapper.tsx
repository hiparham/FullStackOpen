const RadioWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-[.5rem]">
      <h2 className="text-white font-semibold capitalize text-[1.02rem]">
        {label} :
      </h2>
      <div className="flex items-center gap-[.5rem]">{children}</div>
    </div>
  );
};
export default RadioWrapper