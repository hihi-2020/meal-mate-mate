import React from 'react'
import { connect } from 'react-redux'
import { fetchComments, postComment } from '../apis/comments'
import { updateComment } from '../actions'

export class Comment extends React.Component {

   state = {
      input: ''
   }
    
   componentDidMount() {
      this.props.dispatch(fetchComments(this.props.id))
   }

   handleChange = (event) => {
      this.setState({
         input: event.target.value
      })
   }

   submitComment = () => {
      //add comment to db
      this.props.dispatch(postComment(this.props.id, this.state.input))

      // create new state to pass to action
      let updatedState = this.props.comments.map(comment => ({...comment}))
      updatedState.push({id: 'new', comment: this.state.input})
      
      //add updated state to current global state
      this.props.dispatch(updateComment(updatedState))

      //reset local state to clear input
      this.setState({
         input: ''
      })
   }

    render () {
      return (
        <>
          <h3>Comments</h3>
          {this.props.comments.map((comment, key) => {
             return(
                <p key={key}>{comment.comment}</p>
             )
          })}
          <input 
            type="text" 
            placeholder='Enter new comment here' 
            onChange={this.handleChange}
            value={this.state.input} className='commentBox'/>
          <button onClick={this.submitComment} className='homebutton'>Submit comment</button>
  
        </>
      )
    }
  }
  
  function mapStateToProps (globalState) {
    return {
      comments: globalState.mealComments,
      id: globalState.activeMeal
    }
  }
  
  export default connect(mapStateToProps)(Comment)