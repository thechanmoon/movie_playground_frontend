import React from 'react'

// const Review = ({ username, created_at, comment }) => {

//   console.log(comment)
//   return (
//     <div className="review">
//       <h5>{username}</h5>
//       <span className="date">{created_at}</span>
//       <p className="comment">{comment}</p>
//     </div>
//   )
// }

const Review = (props) => {

  console.log(props)
  return (
    <div className="review">
      <h5>{props.table.author}</h5>
      {/* <span className="date">{props.table.url}</span> */}
      <span className="comment"><a href={props.table.url}class="active">{props.table.url}</a></span>
      {/* <p className="comment">{props.table.content}</p> */}
    </div>
  )
}

export default Review