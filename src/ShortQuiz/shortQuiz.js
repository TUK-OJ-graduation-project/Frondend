import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../OX_quiz/quiz.css';

function ShortQuizPage() {
  const [problemData, setProblemData] = useState({});
  const id = useParams().id;
  useEffect(() => {
    // GET request
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/blank/${id}/`)
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAnswerSubmit = () => {
    // Replace 'questions' with 'problemData'
    const isCorrect = inputValue.toUpperCase() === problemData.answer;
    setUserAnswers([...userAnswers, isCorrect]);
    setCurrentQuestion(currentQuestion + 1);
    setInputValue('');
  };

  const currentAnswer = userAnswers[currentQuestion];

  return (
    <div className='quiz-container'>
      <div className='qzproblem-container'>
        {problemData && Object.keys(problemData).length > 0 && (
          <div key={problemData.id}>
            <p>{problemData.title}</p>
            <p>{problemData.description}</p>
          </div>
        )}
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <div className='answer-container'>
        {currentAnswer !== undefined && (
          <p>Correct answer: {currentAnswer ? 'O' : 'X'}</p>
        )}
        <button className='answer-btn' onClick={handleAnswerSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ShortQuizPage;
