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
      <section className="min-h-screen m-2">
        <Paragraph_1 />
        <FathersAndFigures />
      </section>
      <Paragraph_2 />
      <section className="min-h-screen flex flex-col justify-evenly">
        <Paragraph_3 />
        <MarathiWritings />
      </section>
      <Paragraph_4 />
      <Paragraph_5 />
      <Paragraph_6 />
      <Paragraph_7 />
    </div>
  )
}

export default AllSections
