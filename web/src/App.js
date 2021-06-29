import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import FieldName from './component/FieldName';
import useChat from './component/useChat';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

function App() {
  const {
    content,
    setChatName,
    onMessageSubmit,
    onTextChange,
    refLoading,
    refScroll,
    addEmoji,
    message,
    showImoji,
    setShowImoji
  } = useChat();
 
  useEffect(() => {
    let hash = localStorage.getItem('hashcode');
    let name = localStorage.getItem('name');
    if (hash !== md5(name + 200)) {
      console.log('lan');
      localStorage.clear();
    }
  }, []);

  const renderChat = () => {
    return content.map(({ name, message }, index) => (
      <div key={index} className="item-chat">
        <p className="name">{name}:</p>
        <p className="textchat">{message}</p>
      </div>
    ));
  };

  return (
    <div className="render-chat">
      <div className="name-field">
        <FieldName chatName={setChatName} />
      </div>
      <div className="bd_chat">
        <div className="box-chat">
          {renderChat()}
          <div ref={refScroll} style={{ color: 'white' }}></div>

          {refLoading && (
            <>
              <div class="chat-bubble">
                <div class="typing">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            </>
          )}
        </div>
        <form onSubmit={onMessageSubmit} className="form_bt">
          <input
            value={message}
            className="input_sent"
            name="message"
            onChange={e => onTextChange(e)}
            autoComplete="off"
          />
          <span className="iconImoji">
            <FontAwesomeIcon
              icon={faSmile}
              onClick={() => setShowImoji(!showImoji)}
            />
            {showImoji && (
              <div className="imoji">
                <Picker onSelect={addEmoji} />
              </div>
            )}
          </span>
          <button className="bt">
            <FontAwesomeIcon type="submit" icon={faPaperPlane} />
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
