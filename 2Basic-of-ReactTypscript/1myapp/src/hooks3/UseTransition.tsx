import { useState, useTransition, type ChangeEvent } from "react";

const userCollection: string[] = [
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
  "manishtiwari",
  "snehareddy",
  "ravindraNaik",
  "ankitaDesai",
  "sureshpillai",
  "deepakyadav",
  "kavitanair",
  "rahulchopra",
  "meenakshiIyer",
  "vijaykhanna",
  "anjalirao",
  "harshvardhan",
  "tanviagarwal",
  "gauravmalhotra",
  "ishitajain",
  "manojpandey",
  "swatikapoor",
  "nikhilbansal",
  "ritikagoel",
  "sandeepshah",
];

function UseTransition() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    startTransition(() => {
      const filtered = userCollection.filter((item) =>
        item.includes(e.target.value),
      );
      setList(filtered);
    });
  };

  return (
    <>
      <h1>Hello</h1>
      <input type="text" value={query} onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </>
  );
}

export default UseTransition;
