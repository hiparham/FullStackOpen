import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function useResource(url) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(url).then(({ data }) => setItems(data));
  }, []);

  async function postContent(content) {
    const response = await axios.post(url, content);
    setItems([...items, response.data]);
  }
  return [items, { create: postContent }];
}
