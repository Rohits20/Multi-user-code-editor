import React,{useState} from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const [roomId,setRoomId] = useState('');
  const [userName,setUserName] = useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
   toast.success('New room is available');
};

const joinRoom = () => {
  if (!roomId || !userName) {
      toast.error('ROOM ID & username is required');
      return;
  }
  navigate(`/editor/${roomId}`, {
      state: {
          userName,
      },
  });
};

 const handleInputEnter =(e)=>{
  if(e.code ==='Enter'){
    navigate(`/editor/${roomId}`, {
      state: {
          userName,
      },
  });
  }
 }
  return (
    <div className="homePageWrapper">
         <div className="formWrapper">
           <h4 className="mainLabel"> Enter your ROOM ID</h4>
          <div className="inputGroup">
             <input
             type= "text"
             className= "inputBox"
             placeholder= "ROOM ID"
             onChange={(e)=>setRoomId(e.target.value)}
             value={roomId}
          />
             <input
             type= "text"
             className= "inputBox"
             placeholder= "USERNAME"
             onChange={(e)=>setUserName(e.target.value)}
             value={userName}
             onKeyUp= {handleInputEnter}
             />
             <button className="btn joinBtn" onClick={joinRoom}> Join</button>
           <span className="createInfo">
            If you dont have an invite then create a
            {/* <a
                            onClick={createNewRoom}
                             href=""
                            className="createNewBtn"
                        >
                new room
            </a> */}
            {
              <button
              onClick={createNewRoom}
              className="createNewBtn"
              >
                new room
              </button>
            }
           </span>
          </div>
         </div>
         <footer>
            <h4>
                Built by {' '}
                <a href="https://github.com/Rohits20"> Rohit Singh</a>
            </h4>
         </footer>
    </div>
  )
}

export default HomePage;