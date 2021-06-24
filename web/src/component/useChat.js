import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import firebase from '../firebase';

export default function useChat(props) {
  const socketRef = useRef();
  const refMessage = useRef();
  const refScroll = useRef(null);
  const valueSet = useRef();
  const [content, setContent] = useState([]);
  const [chatName, setChatName] = useState();
  const [refLoading, setRefLoading] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect('https://webchatsokket.herokuapp.com');
    socketRef.current.on('message', ({ name, message }) => {
      setContent([...content, { name, message }]);
      refScroll.current.scrollIntoView();
    });
    return () => socketRef.current.disconnect();
  }, [chatName, content]);

  const onTextChange = e => {
    const valueNames = localStorage.getItem('hashcode');
    firebase.database().ref(`sentloading/${valueNames}`).set(true);
    if (valueSet.current) {
      clearTimeout(valueSet.current);
    }
    valueSet.current = setTimeout(() => {
      firebase.database().ref(`sentloading/${valueNames}`).set(false);
    }, 500);
    //   setValueMessage(value);
  };

  useEffect(() => {
    const valueNames = localStorage.getItem('hashcode');
    var starCountRef = firebase.database().ref('sentloading');
    starCountRef.on('value', function (snapshot) {
      const full = { ...snapshot.val() };
      delete full[valueNames];
      let arr = Object.values(full);
  
      if (arr.includes(true)) {
        setRefLoading(true);
      } else {
        setRefLoading(false);
      }
    });
  });

  const onMessageSubmit = e => {
    e.preventDefault();
    const name = localStorage.getItem('name');
    const value = refMessage.current.value;
    socketRef.current.emit('message', { name: name, message: value });
    refMessage.current.value = '';
  };

  return {
    content,
    onMessageSubmit,
    setChatName,
    onTextChange,
    refMessage,
    refLoading,
    setRefLoading,
    refScroll
  };
}
