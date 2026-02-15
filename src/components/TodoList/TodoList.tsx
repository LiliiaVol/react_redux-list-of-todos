/* eslint-disable */
import React from "react";
import { useAppSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from "../../types/Todo";

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);

  const filteredTodos = (() => {
    let filteredTodos = todos;
    switch (status) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;  
      default:
        filteredTodos = todos;
    }

    query !== ''
      ? filteredTodos = filteredTodos.filter(filteredTodo => filteredTodo.title.toLowerCase().includes(query.toLowerCase())) 
      : filteredTodos;

    return filteredTodos


  })();


  const checkCurrentTodo = (currentTodo: Todo) => dispatch(currentTodoSlice.actions.checkCurrentTodo(currentTodo));
  const unCheckCurrentTodo = () => dispatch(currentTodoSlice.actions.unCheckCurrentTodo());

  return (
    <>
      {filteredTodos.length === 0 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>

          {
            filteredTodos.map(todo => (
              <tr key={todo.id} data-cy="todo" className={currentTodo?.id === todo.id ? 'has-background-info-light' : ''} >
                <td className="is-vcentered">{todo.id}</td>


                <td className="is-vcentered">
                  {todo.completed &&
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  }
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={
                    () => {
                      currentTodo?.id !== todo.id ?

                        checkCurrentTodo({
                          id: todo.id,
                          title: todo.title,
                          completed: todo.completed,
                          userId: todo.userId
                        })
                        : unCheckCurrentTodo();

                    }
                  }>
                    <span className="icon">
                      <i className={"far " + (currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye')} />
                    </span>
                  </button>
                </td>
              </tr>
            ))
          }



        </tbody>
      </table>
    </>
  );
};
