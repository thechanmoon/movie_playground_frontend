import React from 'react'

const ActorDetail = ({ username, watch_date, text }) => {
  console.log('ActorDetail')
  return (
    <div>
      <div className="journal">
        ActorDetails        
        <section>
        <h5>{watch_date}</h5>
        {/* <span className="date" class="active">{watch_date}</span> */}
        <p className="comment">{text}</p>
        <p>{"\n"}</p>
        </section>
      </div>
      <div style={{ flexGrow: 0, flexBasis: '33.333%', }} >
        {/* <button> Delete</button> */}
      </div>
    </div>
  )
}

export default ActorDetail