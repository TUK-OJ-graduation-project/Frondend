
import './quiz.css';
import React, { useEffect,useState } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';


// function OXQuizinfo(props) {


//   return (
//   <div>
//     {/* {problemData.map(problem => ( */}
//     <div key={problemData.id}>
//       <p>{problemData.title}</p>
//       <p>{problemData.description}</p>
//     </div>

//   {/*) )} */}
// </div>

//   );
// }


function QuizPage() {
  const [problemData, setProblemData] = useState({});
  const id = useParams().id;
  useEffect(() => {
    // GET 요청
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/select/${id}/`)
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

  const handleAnswerSubmit = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const currentAnswer = userAnswers[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="qzproblem-container">
      {problemData && Object.keys(problemData).length > 0 && (
        <div key={problemData.id}>
          <p>{problemData.title}</p>
          <p>{problemData.description}</p>
        </div>
)}
      </div>
      <div className="answer-container">
        {currentAnswer !== undefined && currentAnswer !== null && (
          <p>정답: {currentAnswer ? "O" : "X"}</p>
        )}
        <button className="answer-btn" onClick={() => handleAnswerSubmit(true)}>O</button>
        <button className="answer-btn" onClick={() => handleAnswerSubmit(false)}>X</button>
      </div>
    </div>
  );

}

export default QuizPage;