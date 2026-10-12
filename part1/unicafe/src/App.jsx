import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ feedbacks }) => {
  const getTotal = () => {
    return feedbacks.good + feedbacks.bad + feedbacks.neutral;
  };

  const getAverage = () => {
    return (feedbacks.good - feedbacks.bad) / getTotal();
  };

  const getPositives = () => {
    return (feedbacks.good / getTotal()) * 100;
  };

  if (getTotal() === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={feedbacks.good} />
          <StatisticLine text="neutral" value={feedbacks.neutral} />
          <StatisticLine text="bad" value={feedbacks.bad} />
          <StatisticLine text="all" value={getTotal()} />
          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="positive" value={getPositives() + " %"} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ name, setFeedbacks }) => {
  return (
    <button
      type="button"
      onClick={() => {
        setFeedbacks((prev) => ({
          ...prev,
          [name]: prev[name] + 1,
        }));
      }}
    >
      {name}
    </button>
  );
};

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" setFeedbacks={setFeedbacks} />
      <Button name="neutral" setFeedbacks={setFeedbacks} />
      <Button name="bad" setFeedbacks={setFeedbacks} />
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;
