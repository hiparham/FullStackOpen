export default function CountryWrapper({ list,ChooseCountry }) {
  return (
    <ul>
      {list.map((country) => {
        return (
          <li key={country.name.common}>
            <span>{country.name.common.toUpperCase()}</span> | <button onClick={()=>ChooseCountry(country.name.common)}>Show</button>
          </li>
        );
      })}
    </ul>
  );
}
