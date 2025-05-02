import React, { useEffect, useState } from "react";

export default function CountdownComponent({ endDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return <span className="expired-text">აქცია დასრულდა</span>;
  }

  return (
    <div className="countdown mainfont">
      <span>{timeLeft.days} დღე : </span>
      <span>{timeLeft.hours} სთ : </span>
      <span>{timeLeft.minutes} წთ : </span>
      <span>{timeLeft.seconds} წმ </span>
    </div>
  );
}
