import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";

const categories = [
  "Random",
  "General",
  "Books",
  "Movies",
  "Music",
  "Television",
  "Games",
  "Sci-Fi & Nature",
  "Computer Science",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Celebrities",
  "Animals",
  "Comics",
  "Cartoon",
];

function App() {
  const [url, setUrl] = useState(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-b from-black to-white"
  );
  const [startGame, setStartGame] = useState(false);
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("Random");

  const bgForCategory = (categoryName) => {
    if (categoryName === "General") {
      setCategory(9);
      return "bg-gradient-to-b from-blue-500 to-yellow-400";
    } else if (categoryName === "Books") {
      setCategory(10);
      return "bg-gradient-to-b from-pink-500 to-yellow-400";
    } else if (categoryName === "Movies") {
      setCategory(11);
      return "bg-gradient-to-b from-blue-500 to-yellow-400";
    } else if (categoryName === "Music") {
      setCategory(12);
      return "bg-gradient-to-b from-green-500 to-yellow-400";
    } else if (categoryName === "Television") {
      setCategory(14);
      return "bg-gradient-to-b from-blue-500 to-green-400";
    } else if (categoryName === "Games") {
      setCategory(15);
      return "bg-gradient-to-b from-purple-500 to-green-400";
    } else if (categoryName === "Sci-Fi & Nature") {
      setCategory(17);
      return "bg-gradient-to-b from-blue-500 to-orange-400";
    } else if (categoryName === "Computer Science") {
      setCategory(18);
      return "bg-gradient-to-b from-gray-700 to-orange-300";
    } else if (categoryName === "Mythology") {
      setCategory(20);
      return "bg-gradient-to-b from-blue-500 to-red-400";
    } else if (categoryName === "Sports") {
      setCategory(21);
      return "bg-gradient-to-b from-green-500 to-yellow-400";
    } else if (categoryName === "Geography") {
      setCategory(22);
      return "bg-gradient-to-b from-green-500 to-blue-400";
    } else if (categoryName === "History") {
      setCategory(23);
      return "bg-gradient-to-b from-red-500 to-yellow-400";
    } else if (categoryName === "Celebrities") {
      setCategory(26);
      return "bg-gradient-to-b from-orange-500 to-green-400";
    } else if (categoryName === "Animals") {
      setCategory(27);
      return "bg-gradient-to-b from-teal-600 to-indigo-400";
    } else if (categoryName === "Comics") {
      setCategory(29);
      return "bg-gradient-to-b from-orange-600 to-teal-400";
    } else if (categoryName === "Cartoon") {
      setCategory(32);
      return "bg-gradient-to-b from-indigo-600 to-pink-400";
    } else if (categoryName === "Random") {
      setCategory("");
      return "bg-gradient-to-b from-black to-white";
    }
  };

  const handleAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const handleCategory = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  const handleDifficulty = (e) => {
    e.preventDefault();
    setDifficulty(e.target.value);
  };

  const handleStart = () => {
    setStartGame(true);
  };

  const handleReconfigure = () => {
    setStartGame(false);
  };

  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    setUrl(url);

    setBgColor(bgForCategory(categoryName));
  }, [category, difficulty, amount, categoryName]);

  console.log(url);
  return (
    <div className={`${bgColor} h-screen flex flex-col items-center`}>
      <h1 className="text-3xl font-bold text-white p-3 mt-3 border border-gray-300 text-center rounded-lg">
        Quiz App
      </h1>
      {!startGame ? (
        <div className="mt-4 flex flex-col items-center text-white text-xl font-semibold">
          <label>Number of Questions</label>
          <input
            className="rounded p-2 text-indigo-600 mb-3 w-auto"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmount}
          />
          <label>Category</label>
          <select
            className="rounded p-2 text-indigo-600 mb-3 text-center w-full"
            onChange={handleCategory}
          >
            {categories.map((_cat) => (
              <option key={_cat} value={_cat}>
                {_cat}
              </option>
            ))}
          </select>
          <label>Difficulty</label>
          <select
            className="rounded p-2 text-indigo-600 mb-3 text-center w-full"
            onChange={handleDifficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            className="rounded shadow-lg bg-green-500 hover:bg-green-600 p-3 mt-3"
            onClick={handleStart}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz
          apiUrl={url}
          category={categoryName}
          reconfigure={handleReconfigure}
        />
      )}
    </div>
  );
}

export default App;
