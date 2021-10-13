import React from 'react'
import {ContactItem} from './ContactItem'

const ContactList = (props) => {
  return (
    <div className="contact-list">
      <ul>
        {props.contacts.map(contact => <ContactItem handleToggle={props.handleToggle} checkedId={props.checkedId} key={contact.id} {...contact}/>)}
      </ul>
    </div>
  )
}

export default ContactList;