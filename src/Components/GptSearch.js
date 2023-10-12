import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { IMG_URL } from '../Utils/constants'

const GptSearch = () => {
  return (
    <>
     <div className="fixed -z-10">
        <img className="h-screen " src={IMG_URL} alt="logo" />
      </div>
    <div>
      <GPTSearchBar/>
      <GPTMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch
