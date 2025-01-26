export default function FilterResult({ SetFilteredResults }) {
  return (
    <input
      type="text"
      placeholder="Search For Contacts"
      className="shadow-lg  rounded-md  border-sky-500 border py-2 px-5 block mx-auto w-full max-w-sm my-[2.5rem]"
      onChange={(e) => SetFilteredResults(e.target.value)}
    />
  );
}
