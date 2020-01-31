import React, { useState } from "react";
import ErrorList from './ErrorList'
import _ from "lodash"

const QuestionForm = props => {
  const [formInput, setFormInput] = useState({
    question: "",
    answer: ""
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = event => {
    setFormInput({
      ...formInput,
      [event.currentTarget.id]:event.currentTarget.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    if (validFormSubmission()) {
    props.onSubmit(formInput)
    setFormInput({
      question:"",
      answer:""
      })
    }
  }

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = [ "question", "answer" ]
    requiredFields.forEach(field => {
      if (formInput[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }




  return (
    <div>
      <ErrorList
      errors={errors}
      />
      <form onSubmit={onSubmit}>


      <label htmlFor="question">QUESTION</label>
        <input
          type="text"
          value={formInput.question}
          name="question"
          id="question"
          onChange={handleInputChange}
        />

      <label htmlFor="answer">ANSWER</label>
        <input
          type="text"
          value={formInput.answer}
          name="answer"
          id="answer"
          onChange={handleInputChange}
        />

        <input
          type="submit"
          value="Submit"
          className="button"
          />

      </form>
    </div>
  )
}

export default QuestionForm
