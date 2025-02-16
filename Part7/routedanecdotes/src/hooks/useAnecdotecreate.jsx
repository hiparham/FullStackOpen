import { useState } from "react";

export default function useField(name, type) {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const onReset = () => {
    setValue("");
  };
  return { value, onChange, name, onReset, type };
}
