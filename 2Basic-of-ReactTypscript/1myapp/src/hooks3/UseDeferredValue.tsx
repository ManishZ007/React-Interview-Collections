import { useDeferredValue, useState } from "react";

const bigDataArray: string[] = [
  "amitkumar",
  "riyasharma",
  "rohitverma",
  "sonalipatil",
  "vikramsingh",
  "priyamehta",
  "arjunrao",
  "nehagupta",
  "karanjoshi",
  "poojaiyer",
];

function UseDeferredValue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // lags behind 'query' slightly under heavy load

  // filtering uses the deferred value, not the instant one
  const filtered = bigDataArray.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase()),
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default UseDeferredValue;
