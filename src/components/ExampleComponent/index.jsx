import React from 'react';
import './index.scss';

const ExampleComponent = () => {
  return (
    <div className='main-container'>
      Example component
      <h1 className='main-container__header'>
        This is header
      </h1>
      <p className='main-container__paragraph'>
        This is paragraph
      </p>
      <p className='main-container__paragraph main-container__paragraph--gren'>
        This is paragraph with modifier
      </p>
    </div>
  )
}

export default ExampleComponent;