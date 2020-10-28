import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { textState, charCountState } from './recoil'
import TodoList from './TodoList'

export default function CharacterCounter() {
  return <div>
    <TextInput />
    <CharacterCount />
    <TodoList />
  </div>
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const onChange = useCallback((event) => {
    setText(event.target.value)
  }, [setText])

  return <div>
    <input type="text" value={text} onChange={onChange}/>
    <br/>
    Echo: {text}
  </div>
}

function CharacterCount() {
  const count = useRecoilValue(charCountState)
  return <>Character Count: {count}</>
}