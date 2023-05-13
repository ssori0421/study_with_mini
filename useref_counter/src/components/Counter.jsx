import React, { useEffect, useRef, useState } from 'react';

const Counter = () => {
  const [test, setTest] = useState(true);
  const countRef = useRef(0);
  const onClickIncrease = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };
  const onClickTest = () => {
    setTest((_test) => !_test);
  };
  return (
    <div>
      {test && <h1>count: {countRef.current}</h1>}
      <button onClick={onClickIncrease}>Click me!</button>
      <button onClick={onClickTest}>test</button>
    </div>
  );
};

export default Counter;
