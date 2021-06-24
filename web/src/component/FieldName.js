import md5 from 'md5';
import React, { useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function FieldName({ chatName }) {
  const nameLocal = localStorage.getItem('name');
  const fullName = useRef();
  const [checkName, setCheckName] = useState(nameLocal ? false : true);
  const handlSubmit = e => {
    e.preventDefault();
    const value = fullName.current.value;
    if (value?.trim()) {
      let namePass = md5(value + 200);
      localStorage.setItem('hashcode', namePass);
      localStorage.setItem('name', value);
      setCheckName(false);
      chatName(value);
    }
  };
  return (
    <>
      {checkName ? (
        <form onSubmit={handlSubmit}>
          <input
            ref={fullName}
            placeholder="Nhập tên chat!!!"
            style={{
              height: '25px',
              width: '300px'
            }}
          />
        </form>
      ) : null}
    </>
  );
}

export default FieldName;
