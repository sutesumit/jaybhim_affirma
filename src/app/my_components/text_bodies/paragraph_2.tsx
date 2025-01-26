import HomePhotobook from '../image_bodies/home_photobook';

const Paragraph_2 = () => {
  return (
    <div className='relative flex w-screen h-auto md:aspect-video md:max-h-screen py-4'>
      {/* Video Background Container */}
      <div className='absolute inset-0'>
        <HomePhotobook />
      </div>
      
      {/* Blue Overlay */}
      <div className='absolute inset-0 bg-black opacity-60'></div>
      
      {/* Dotted Pattern Overlay */}
      <div 
        className='absolute inset-0 opacity-80'
        style={{
          backgroundImage: 'radial-gradient(circle, var(--primary-blue) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      
      {/* Text Container */}
      <div className='flex items-center justify-center text-container'>
          <p className='mix-blend-difference text-[var(--primary-white)] opacity-100'>
            This perspective is deeply rooted in the revolutionary Dalit literature and folk music that profoundly shaped the angry yet joyous Dalit child within me. Over time, my intention and inspiration for creating art evolved—from building cultural capital for political revolutions to developing templates and artistic expressions of personal storytelling as a means of inspiring communal healing. In other words, <span className="accent-text">I seek to lay bare personal and familial stories for scrutiny through a political lens</span>, examining the intergenerational inheritance of emotions and experiences.
          </p>
      </div>
    </div>
  );
};

export default Paragraph_2;
