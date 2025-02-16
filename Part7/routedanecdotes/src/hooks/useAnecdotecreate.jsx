import { useState } from "react";

export default function useField(name) {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const onReset = () => {
    setValue("");
  };
  return { value, onChange, name, onReset };
}
