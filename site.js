
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function

	const getNextQuestion = async () => {
		const newQuestion = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')

		//parse into variable named json
		const json = await newQuestion.json()

		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }

	}

	
	// todo: create your "renderQuestion" function

	const renderQuestion = ({ question, answers, correct}) => {

		//reset elements
		questionElement.innerHTML = ''
		answersElement.innerHTML = ''

		questionElement.textContent = decodeHtml(question)

		//answer buttons using foreach loop

		answers.forEach(answer => {
			const button = document.createElement('button') //create button
			button.textContent = decodeHtml(answer) //set answer button text
			answersElement.appendChild(button) //display in answer element


			button.addEventListener('click', function(){
				console.log(`answer chosen: ${answer}`)
				
				//check if answer is correct
				if (answer === correct) {
					button.classList.add('correct')
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
					alert('Correct!')
					return
				}
				
				button.disabled = true
				alert('Incorrect!')
				
			})
		})
	}

	
	// todo: add the event listener to the "nextQuestion" button
	
	
	
	nextQuestionElement.addEventListener('click', async () => {
        renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)

    })
	
	//const questionData = await getNextQuestion()
	//console.log(questionData)
})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
