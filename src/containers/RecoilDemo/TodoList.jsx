import React, { useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { todoListState } from './recoil'
import { getId, removeItemAtIndex, replaceItemAtIndex } from './util'

export default function TodoList() {
  const todoList = useRecoilValue(todoListState)

  return <>
    {/* <TodoListStats /> */}
    {/* <TodoListFilters /> */}
    <TodoItemCreator />
    {
      todoList.map((todoItem => {
        return <TodoItem key={todoItem.id} item={todoItem} />
      }))
    }
  </>
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const onChange = useCallback(({ target: { value } }) => {
    setInputValue(value);
  }, [setInputValue]);

  const addItem = useCallback(() => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      }
    ]);
    setInputValue('');
  }, [inputValue, setTodoList, setInputValue])


  return <div>
    <input type="text" value={inputValue} onChange={onChange} />
    <button onClick={addItem}>Add</button>
  </div>
}

function TodoItem(props) {
  const { item } = props
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex(listItem => listItem === item);

  const editItemText = useCallback(({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, text: value })
    setTodoList(newList)
  }, [index, todoList, item, setTodoList])

  const toggleItemCompletion = useCallback(() => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item, isComplete: !item.isComplete
    })
    setTodoList(newList)
  }, [index, todoList, item, setTodoList])

  const deleteItem = useCallback(() => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList)
  }, [index, todoList, setTodoList])

  return <div>
    <input type="text" value={item.text} onChange={editItemText} />
    <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
    <button onClick={deleteItem}>Delete</button>
  </div>
}

