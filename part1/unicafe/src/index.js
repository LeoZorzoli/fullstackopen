import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const title = 'give feedback'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      
      <h1>{title}</h1>

      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics allClicks={allClicks} good={good} bad={bad} neutral={neutral} average={average}/>

    </div>
  )

}

const Statistics = (props) => {
  const subTitle = 'statistics'
  const average = props.average / props.allClicks
  const positive = (props.good / props.allClicks) * 100

  if (props.allClicks > 0){
    return (
      <div>
        <h1>{subTitle}</h1>
        <table>
          <tbody>
            <Statistic text='good' statistic={props.good}/>
            <Statistic text='neutral' statistic={props.neutral}/>
            <Statistic text='bad' statistic={props.bad}/>
            <Statistic text='history' statistic={props.allClicks}/>
            <Statistic text='average' statistic={average} />
            <Statistic text='positive' statistic={positive}/>
          </tbody>
        </table>
      </div>
    )
  } else {
      return(
        <div>
          <h1>{subTitle}</h1>
          <p>No feedback given</p>
        </div>
      )
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text} {props.statistic}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

ReactDOM.render(<App />,
  document.getElementById('root')
);
