import React, { useState } from 'react';
import Statistics from './Statistics/statistics';
import Notification from './Notification/notification';
import FeedbackOptions from './Feedback/feedback';
import Section from './Section/section';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((feedback.good / total) * 100) : 0;
  };

  const { good, neutral, bad } = feedback;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const btnOptions = ['good', 'neutral', 'bad'];

  return (
    <>
      <Section title="Please leave a feedback">
        <FeedbackOptions options={btnOptions} onLeaveFeedback={handleClick} />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
