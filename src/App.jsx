import { v4 } from 'uuid';
import { useState, createRef } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { uploadString, ref as firebaseStorageRef } from 'firebase/storage';
import { ref as firebaseDBRef, set, onValue } from "firebase/database";

import { firebaseAuth, firebaseDatabase, firebaseStorage } from './firebase';

function insertDB(path, payload) {
  set(firebaseDBRef(path), payload);
}

function readDB(path) {
  let response = null;
  onValue(firebaseDBRef(firebaseDatabase, path), (snapshot) => {
    response = snapshot.val();
  });

  return response;
}

function upload(fileName, base64) {
  uploadString(firebaseStorageRef(firebaseStorage, fileName), base64, 'data_url')
    .then((res) => console.log(res));
}

function App() {
  const file = createRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();

        if (!email || !password) {
          alert('input email/password please!');
        }

        // fetch('localhost/register', { body: {email, password}})
        //   .then((res) => res.json())
        //   .then((res) => console.log(res));
        createUserWithEmailAndPassword(firebaseAuth, email, password)
          .then((res) => {
            insertDB(firebaseDatabase, 'users/' + v4(), {
              name: "Admin" + v4(),
              email,
              password,
              hobby: 'Gaming'
            });
          });
      }}>
        <input type="email" name="email" onChange={(e) => {
          setEmail(e.target.value);
        }} />
        <input type="password" name="password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
        <button type="submit" name="submitRegister">Register</button>
      </form>

      <input type="file" ref={file} name="sebuahFile" onChange={() => {
        const inputFileEl = file.current;
        const fileData = inputFileEl.files[0];
        const fileName = fileData.name;

        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          const base64Img = fileReader.result;
          setImage(base64Img);

          // fetch('localhost/upload', { body: {file}})
          //   .then((res) => res.json())
          //   .then((res) => console.log(res));
          upload(`${new Date().getTime()}-${fileName}`, base64Img);
        }, false);

        fileReader.readAsDataURL(fileData);
      }} />

      <img src={image} alt="iniimage" />

      <button onClick={(e) => {
        const userId = "5a3eab08-4aed-4fe5-91e4-e938f5da2495";

        const res = readDB('users/' + userId);
        console.log(res);
      }}>Click Me</button>
    </div>
  )
}

export default App
