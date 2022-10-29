import React from 'react';
import './SearchForm.css'

const SearchForm = () => {
  return (
    <div className="search-form">
       <input type="text" name="q"/>
       <button>Search</button>
    </div>
  )
}

export default SearchForm;