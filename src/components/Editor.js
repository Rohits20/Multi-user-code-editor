import React, { useEffect, useRef, useState, re } from "react";
import Codemirror from "codemirror";
import Dropdown from "./dropdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
var axios = require("axios");
var qs = require("qs");

const Editor = ({ socketRef, roomId, onCodeChange, setLoading ,loading}) => {
  const [compiled, setCompiled] = useState("O/P");
 const [selected,setSelected]= useState("Langauge")
  const [codeOfUser, setcodeOfUser] = useState(" ");
  const [input,setInput] =useState("");
  var data = qs.stringify({
    code: codeOfUser,
    language: selected,
    input: input,
  });
  var config = {
    method: "post",
    url: "https://codex-api.herokuapp.com/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  function apiCall() {
    axios(config)
      .then(setLoading(true) || function (response) {
        
        if(response.data["success"] == true){
        setCompiled(response.data["output"]);
             }
        else{
          setCompiled(response.data["error"]);
        console.log("Langauge Selected");
          console.log(setSelected);
        }
        setLoading(false);
        // compiled =(response.data["output"]);
        //    console.log(compiled["error"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  ////////////////////////////////////////////////////////////
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("EditorOM"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        },
       
         setcodeOfUser(editorRef.getValue)
      );
      //.setValue('var msg = "Hi";');

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        setcodeOfUser(code);
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code != null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  return (
    <div>
      <Dropdown selected={selected} setSelected={setSelected} />
      <textarea
        id="EditorOM"
        key={"Hello"}
      />
      <div className="inputArea">

      <textarea placeholder="Input goes here"
      className= "codeInput"
       type="text"
       id="inputID"
       onFocus={(e) => e.target.placeholder = ""} 
       onBlur={(e) => e.target.placeholder = "Input goes here"}
       scrollEnabled={true}
       onChange={(evt) => { setInput(evt.target.value); }}
      />

      <div className="result">{compiled}</div>

      <button className="runCodeBtn" onClick={apiCall}>
        Run Code
      </button>

      <div className="loading">{
      loading===true ?
      <CircularProgress color="success" /> : <div></div>
          }
      </div>
     
      </div>
      
    </div>
  );
};

export default Editor;
