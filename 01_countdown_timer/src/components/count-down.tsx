"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

// 2- adding state for timer: state variables
export default function CountDown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  //   3- Handle input changes

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDuration(Number(e.target.value) || "");
  };

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
    }
  };

  //   4- implementing Start and Pause

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
    }
  };

  //  5- adding timer countdown logic: decrement the time left every second if the timer is active, by using useEffect and setInterval

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, isPaused]);

  //   6- reset timer to its initial state

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
  };

  // 7- format the time display
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}: ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    // basic structure
    <div>
      <h2>Countdown Timer</h2>

      {/* 3.1- adding funtion to button */}
      <input
        type="number"
        id="duration"
        placeholder="Enter duration in seconds"
        value={duration}
        onChange={handleDurationChange}
      />
      <button onClick={handleSetDuration}>Set</button>

      {/* 4.1- updating buttons */}
      <button onClick={handleStart}>{isPaused ? "Resume" : "Start"}</button>
      <button onClick={handlePause}>Pause</button>
      {/* 6.1- attach it to reset button */}
      <button onClick={handleReset}>Reset</button>
      <div>Time Left: {formatTime(timeLeft)}</div>
    </div>
  );
}
