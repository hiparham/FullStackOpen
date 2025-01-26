import { useEffect, useState } from "react";
import axios from "axios";
import CountryWrapper from "./CountryWrapper";
import SingleCountry from "./SingleCountry";
import ErrorComponent from "./ErrorC";
//
const URL = "https://studies.cs.helsinki.fi/restcountries/api/name";
//
export default function App() {
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  //
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(({ data }) => {
        setCountries(data);
      });
  }, []);
  //
  const LookForCountries = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSingleCountry("");
    setErr("");
    //
    if (value.length < 1) {
      return;
    }
    //
    const filtered = countries.filter((x) =>
      x.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filtered.length > 20) {
      setCountriesToShow([]);
      setErr("Too Many Matches, narrow down your search.");
    } else if (filtered.length <= 10 && filtered.length > 0) {
      setErr("");
      setCountriesToShow(filtered);
    } else {
      setCountriesToShow([]);
      setErr("Nothing Found");
    }
  };
  //
  const chooseCountry = (qu) => {
    const itemFind = countries.find((x) => x.name.common === qu);
    setSingleCountry(itemFind);
    // Clean Up
    setCountriesToShow([]);
    setQuery("");
    setErr("");
  };
  //
  return (
    <div>
      <form>
        <input
          disabled={!countries.length > 0}
          type="text"
          placeholder="Search For Country"
          value={query}
          onChange={LookForCountries}
        />
      </form>
      <CountryWrapper list={countriesToShow} ChooseCountry={chooseCountry} />
      <SingleCountry country={singleCountry} />
      <ErrorComponent err={err} />
    </div>
  );
}
