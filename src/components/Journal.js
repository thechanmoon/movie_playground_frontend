import React from 'react'

const Journal = ({ username, watch_date, text }) => {
  return (
    <div>
      <div className="journal">
        <section>
        <h5>{watch_date.slice(0,10)}</h5>
        {/* <span className="date" class="active">{watch_date}</span> */}
        <p className="comment">{text}</p>
        <p>{"\n"}</p>
        </section>
      </div>
    <div>
      <button> Edit</button>
      <button> Delete</button>
    </div>
    </div>
  )
}

export default Journal