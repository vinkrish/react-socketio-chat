import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Spacer from 'components/layout/Spacer';
import ContactList from 'components/ui/ContactList';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { fetchUsers, fetchMessages } from 'redux/actions/user';
import { fetchTags } from 'redux/actions/config';
import constants from 'config/constants';
import { getValueFromLocal, destroyLocal } from 'utils/storage';
import Loader from "components/ui/Loader";
import classnames from 'classnames';
import checkOnce from 'images/check-once.png';
import checkTwice from 'images/check-twice.png';
import checkBlue from 'images/check-blue.png';

import io from "socket.io-client";
const SOCKET_IO_URL = `http://${window.location.hostname}:8000`;
const socket = io(SOCKET_IO_URL);

function Dashboard(props) {
  const senderId = getValueFromLocal(constants['USER_ID']);
  const isAdmin = getValueFromLocal(constants['IS_ADMIN']);
  const [messages, setMessages] = useState([]);
  const [checkedUser, setCheckedUser] = useState(0);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [messageTyped, setMessageTyped] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [readMessage, setReadMessage] = useState('');
  const [typing, setTyping] = useState('');
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const { isLoading, usrs, allMessages, allTags } = props;
  const inputRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    props.fetchUsers();
    props.fetchMessages();
    props.fetchTags();

    socket.emit('join', {id: senderId});
    socket.on('new_msg', data => {
      setMessages(messages => [...messages, data.msg]);
      if (data.msg.senderId != senderId) socket.emit('messageReceived', data.msg);
    });
    socket.on('message_received_ack', data => {
      setReceivedMessage(data.msg);
    });
    socket.on('message_read_ack', data => {
      setReadMessage(data.msg);
    });
    socket.on('typing_display', data => {
      setTyping(data);
    });
  }, [])

  useEffect(() => {
    setUsers(usrs);
  }, [usrs]);

  useEffect(() => {
    setUsers(users => users.map(usr => usr.id === typing.senderId ? { ...usr, typing: 'typing...' } : usr));
    const timer = setTimeout(() => {
      setUsers(usrs);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [typing, usrs])

  useEffect(() => {
    setMessages(messages =>  messages.map(msg => msg.id === receivedMessage.id ? receivedMessage : msg));
  }, [receivedMessage]);

  useEffect(() => {
    setMessages(messages => messages.map(msg => msg.id === readMessage.id ? readMessage : msg));
  }, [readMessage]);

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages])

  useEffect(() => {
    setTags(allTags);
  }, [allTags]);

  useEffect(() => {
    setFilteredMessages(messages.filter(msg => msg.receiverId === checkedUser || msg.senderId === checkedUser));
  }, [checkedUser, messages])

  useEffect(() => {
    for(let i=(filteredMessages.length)-1; i >= 0; i--) {
      if (filteredMessages[i].readOn) break;
      else {
        if (filteredMessages[i].senderId != senderId) socket.emit('messageRead', filteredMessages[i]);
      }
    }
  }, [filteredMessages])

  const updateSelectedUser = useCallback( id => {
    if (id != 0) {
      setCheckedUser(id);
    }
  }, [checkedUser]);

  const setTag = (event) => {
    event.preventDefault();
    setSelectedTag(event.target.value)
  }

  const submitTag = (event) => {
    event.preventDefault();
    setMessageTyped(`${inputRef.current.value.substring(0,inputRef.current.selectionStart)}<${selectedTag}>${inputRef.current.value.substring(inputRef.current.selectionStart, inputRef.current.selectionEnd)}</${selectedTag}>${inputRef.current.value.substring(inputRef.current.selectionEnd)}`);
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if(checkedUser && messageTyped) {
      let msg = {
        senderId: senderId,
        receiverId: checkedUser,
        msg: messageTyped
      }
      socket.emit('sendMessage', msg, () => setMessageTyped(''));
      setMessageTyped('');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messageTyped === inputRef.current.value) {
        if(messageTyped.length > 1) socket.emit('typing', { senderId: senderId, receiverId: checkedUser});
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [checkedUser, messageTyped, inputRef])

  const logoutHandler = useCallback( () => {
    destroyLocal();
    props.history.push('/login');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [filteredMessages]);

  return(
    <>
      { isLoading && <Loader /> }
      <div>
        <Container fluid>
          <Row className="row-content">
            <Col xs="12" sm="2" style={{'paddingLeft': '0', 'paddingRight': '0'}} >
              <div>
                <ContactList checkedId={checkedUser} handleToggle={updateSelectedUser} contacts={users}/>
              </div>
              <Spacer size={22}/>
              <Button className="logout" onClick={() => logoutHandler()}>Logout</Button>
            </Col>
            <Col xs="12" sm="10" style={{'paddingLeft': '0', 'paddingRight': '0'}} >
              <div className="chat">
                <div className="messages">
                  {filteredMessages.map((message, index) => {
                    const mineOrYours = message.senderId === senderId ? 'mine' : 'yours';
                    const messageClasses = classnames('message', mineOrYours);
                    let checkUrl = '';

                    if (message.senderId === senderId) {
                      if(message.readOn) {
                        checkUrl = checkBlue;
                      } else if (message.receivedOn) {
                        checkUrl = checkTwice;
                      } else if(message.sentOn) {
                        checkUrl = checkOnce;
                      } else {
                        checkUrl = '';
                      }
                    }
                        
                    return (
                      <div key={index} className="message-container">
                        <div className={messageClasses}>
                          <span>{message.msg}</span>&nbsp;{ checkUrl ? <img height="10" src={checkUrl}/> : null }
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                <div className="message-input-container">
                  <div className="message-div">
                    { isAdmin === 'true' ? (
                      <div style={{marginLeft: "10px"}} className="send" >
                        <select
                          value={selectedTag}
                          onChange={setTag}
                        >
                          {tags.map((tag) => (
                            <option key={tag.id} value={tag.name}>
                              {tag.name}
                            </option>
                          ))}
                        </select>
                        <button style={{marginLeft: "5px"}} className="plus-btn"
                          onClick={e => submitTag(e)}>+</button>
                      </div>): null
                    }
                    <div className="message-input">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a message"
                        value={messageTyped}
                        onChange={({ target: { value } }) => setMessageTyped(value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
                    </div>
                    <div className="send">
                      <Button style={{float: "right"}} onClick={e => sendMessage(e)}>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )

}

const mapStateToProps = state => {
  const isLoading = state.userReducer.isLoading.includes('GET_USERS_REQUEST') 
  || state.userReducer.isLoading.includes('GET_MESSAGES_REQUEST')
  || state.userReducer.isLoading.includes('SEND_MESSAGE_REQUEST')
  || state.configReducer.isLoading.includes('GET_CONFIG_REQUEST');
  const usrs = state.userReducer.users;
  const allMessages = state.userReducer.messages;
  const allTags = state.configReducer.tags;
  return { isLoading, usrs, allMessages, allTags };
}

const mapDispatchToProps = {
  fetchUsers,
  fetchMessages,
  fetchTags
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
