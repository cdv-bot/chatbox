import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import FieldName from './component/FieldName';
import useChat from './component/useChat';

function App() {
  const {
    content,
    setChatName,
    onMessageSubmit,
    onTextChange,
    refMessage,
    refLoading,
    refScroll
  } = useChat();

  useEffect(() => {
    let hash = localStorage.getItem('hashcode');
    let name = localStorage.getItem('name');
    if (hash !== md5(name + 200)) {
      console.log("lan")
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
            className="input_sent"
            name="message"
            ref={refMessage}
            onChange={e => onTextChange(e)}
            autoComplete="off"
          />

          <button className="bt">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
