import React, { useState } from 'react';
import Question from './Question'; 
import Article from './Article'; 

export default function Radioexample() {
  const [value, setValue] = useState(''); 

  const handleChange = (e) => {
    setValue(e.target.value); 
  };

  return (
    <div>
      <form>
        <div>
          <b>Select Post type:</b> {value}
          <div>
            <label>
              <input
                type='radio'
                name='postType'
                value='Question'
                checked={value === 'Question'}
                onChange={handleChange}
              /> Question
            </label>
          </div>
          <div>
            <label>
              <input
                type='radio'
                name='postType'
                value='Article'
                checked={value === 'Article'}
                onChange={handleChange}
              /> Article
            </label>
          </div>
        </div>
      </form>
      {value === 'Question' && <Question />}
      {value === 'Article' && <Article />}
    </div>
  );
}
