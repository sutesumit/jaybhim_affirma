import React from 'react'
import Paragraph_1 from './text_bodies/paragraph_1'
import Paragraph_2 from './text_bodies/paragraph_2'
import Paragraph_3 from './text_bodies/paragraph_3'
import Paragraph_4 from './text_bodies/paragraph_4'
import Paragraph_5 from './text_bodies/paragraph_5'
import Paragraph_6 from './text_bodies/paragraph_6'
import Paragraph_7 from './text_bodies/paragraph_7'
import FathersAndFigures from './image_bodies/fathers_and_figures'
import MarathiWritings from './image_bodies/marathi_writings'

const AllSections = () => {
  return (
    <div>
      <Paragraph_1 />
      <FathersAndFigures />
      <Paragraph_2 />
      
      <Paragraph_3 />
      <MarathiWritings />
      <Paragraph_4 />
      <Paragraph_5 />
      <Paragraph_6 />
      <Paragraph_7 />
    </div>
  )
}

export default AllSections
