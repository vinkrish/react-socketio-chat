import React from 'react'
import {partial} from '../../lib/utils'

export const ContactItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  return (
    <li onClick={handleToggle} className={`contactsList${props.id === props.checkedId ? ' selected' : ''} contact-item`}>
      {props.firstName}
    </li>
  )
}