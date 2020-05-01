import React from 'react';
import {connect} from 'react-redux';
import {completeToDo} from '../../actions';
import './styles';

class ChantComponent extends React.Component {
    handleComplete = completeTodos => {
        const {completeTodo} = this.props;
        completeTodo(completeTodos);
      };
    render() {
        const{todoId, todo} = this.props;
            return (
                <div className="App">
               <div key="toDoName">
                        <h4>{todo.title} <span onClick={() => this.handleComplete(todoId)}>
                            <i>Done</i>
                        </span>
                      </h4>
                    </div>
                </div>
            );
    }
}
export default connect(null, {completeToDo})(ChantComponent);
