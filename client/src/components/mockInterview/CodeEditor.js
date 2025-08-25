
import React, { useEffect, useRef, useState } from 'react';
import socket from '../../utils/socket';
import Peer from 'peerjs';
import Editor from '@monaco-editor/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { Rnd } from "react-rnd";
import { loader } from '@monaco-editor/react';
import customThemes from '../../utils/monacoThemes';




const peer = new Peer();

const themes = ['vs-dark', 'light', 'hc-black', 'dracula', 'monokai', 'solarized-light'];

const boilerplates = {
  javascript: `// JavaScript Example\nconsole.log("Hello World");`,
  python: `# Python Example\nprint("Hello World")`,
  c: `#include <stdio.h>\nint main() {\n  printf("Hello World");\n  return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello World";\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
  typescript: `// TypeScript Example\nconsole.log("Hello World");`,
  go: `package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello World")\n}`,
};

function MockInterview() {
  const [code, setCode] = useState(boilerplates['javascript']);
  const [theme, setTheme] = useState('vs-dark');
  const [timer, setTimer] = useState(0);
  const [output, setOutput] = useState('');
  const [compiling, setCompiling] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [isSessionEnded, setIsSessionEnded] = useState(false);

  const myVideo = useRef(null);
  const peerVideo = useRef(null);

  const { roomId } = useParams();
  const { search } = useLocation();
  const role = new URLSearchParams(search).get('role');

  const navigate = useNavigate();

 useEffect(() => {
  let localStream;

  // Load Monaco custom themes
  loader.init().then((monaco) => {
    Object.entries(customThemes).forEach(([name, themeData]) => {
      monaco.editor.defineTheme(name, themeData);
    });
  });

  // Join Peer room
  peer.on('open', () => {
    socket.emit('join-room', roomId);
  });

  // Get user's video/audio
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    localStream = stream;

    const myVideoElement = myVideo.current;
    if (myVideoElement) {
      myVideoElement.srcObject = stream;
      myVideoElement.onloadedmetadata = () => {
        myVideoElement.play().catch(err => console.error('Local video play error:', err));
      };
    }

    // Call when someone connects
    socket.on('user-connected', (userId) => {
      const call = peer.call(userId, stream);
      call.on('stream', (remoteStream) => {
        const peerVideoElement = peerVideo.current;
        if (peerVideoElement) {
          peerVideoElement.srcObject = remoteStream;
          peerVideoElement.onloadedmetadata = () => {
            peerVideoElement.play().catch(err => console.error('Remote video play error (caller):', err));
          };
        }
      });
    });

    // Answer incoming calls
    peer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (remoteStream) => {
        const peerVideoElement = peerVideo.current;
        if (peerVideoElement) {
          peerVideoElement.srcObject = remoteStream;
          peerVideoElement.onloadedmetadata = () => {
            peerVideoElement.play().catch(err => console.error('Remote video play error (callee):', err));
          };
        }
      });
    });
  }).catch((err) => {
    console.error('Media error:', err);
  });

  // Join code collaboration room
  if (roomId) {
    socket.emit('join_room', roomId);
  }

  // Listen for code updates
  socket.on('code_update', (data) => {
    if (data?.code !== undefined) {
      setCode(data.code);
    }
  });

  // ✅ Cleanup function
  return () => {
    socket.off('code_update');
    socket.emit('leave_room', roomId);
    peer.disconnect();
    peer.destroy();

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    const myVideoElement = myVideo.current;
    if (myVideoElement && myVideoElement.srcObject) {
      myVideoElement.srcObject.getTracks().forEach((track) => track.stop());
      myVideoElement.srcObject = null;
    }

    const peerVideoElement = peerVideo.current;
    if (peerVideoElement && peerVideoElement.srcObject) {
      peerVideoElement.srcObject.getTracks().forEach((track) => track.stop());
      peerVideoElement.srcObject = null;
    }
  };
}, [roomId]);



  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (value) => {
    setCode(value);
    socket.emit('code_change', { roomId, code: value });
  };

  const compileCode = async () => {
    setCompiling(true);
    setOutput("Compiling...");

    try {
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: language,
        version: '*',
        files: [{ name: 'main', content: code }],
      });

      const outputText =
        response.data.run?.output ||
        response.data.compile?.output ||
        'No output returned.';

      setOutput(outputText);
    } catch (error) {
      console.error("Compilation Error:", error.response?.data || error.message);
      setOutput("Error during compilation.");
    }

    setCompiling(false);
  };

  const endSession = () => {
   
  // Stop user's video/audio stream
  if (myVideo.current && myVideo.current.srcObject) {
    myVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    myVideo.current.srcObject = null;
  }

  // Stop peer video stream
  if (peerVideo.current && peerVideo.current.srcObject) {
    peerVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    peerVideo.current.srcObject = null;
  }

  // Disconnect from socket room
  socket.emit('leave_room', roomId);

  // Destroy peer connection
  peer.destroy();

  // Navigate away only after cleaning
  setIsSessionEnded(true);
  if (role === 'interviewer') {
    navigate(`/feedback/${roomId}`);
  }
  else{
    navigate(`/feedback/${roomId}/thank-you`);
  }


  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mock Interview</h1>

      <Row className='d-grid' >
        <div style={{ height: '30vh' }}>
          <Row className="mt-4">
            <Col md={6}>
              <Rnd
                default={{
                  x: 100,
                  y: 100,
                  width: 320,
                  height: 240,
                }}
                bounds="window"
                style={{ zIndex: 1000, marginTop: '-14rem' }}

              >

                <Card>
                  <Card.Body>
                    <h2 >Your Video</h2>
                    <video ref={myVideo} muted autoPlay className="w-100 h-48 object-fit" />
                  </Card.Body>
                </Card>

              </Rnd>


            </Col>




            <Col md={6}>

              <Rnd
                default={{
                  x: 100,
                  y: 100,
                  width: 320,
                  height: 240,
                }}
                bounds="window"
                style={{ zIndex: 1000, marginTop: '-14rem', marginLeft: '30rem' }}

              >

                <Card >
                  <Card.Body>
                    <h2>{role === 'interviewer' ? "Interviewee's Video" : "Interviewer's Video"}</h2>
                    <video ref={peerVideo} autoPlay className="w-100 h-48 object-fit" />
                  </Card.Body>
                </Card>

              </Rnd>



            </Col>
          </Row>
        </div>



        <Col md={12} style={{ justifyItems: "center", marginTop: '-15rem', justifyContent: 'center' }}>
          <Row className=" d-flex justify-content-space-between mb-4">

            <Col md={4} style={{ width: '16rem' }}>
              <Form.Group>
                <Form.Label>Select Theme</Form.Label>
                <Form.Control as="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  {themes.map((th) => (
                    <option key={th}>{th}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} style={{ width: '16rem' }}>
              <Form.Group>
                <Form.Label>Select Language</Form.Label>
                <Form.Control
                  as="select"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(boilerplates[e.target.value]);
                  }}

                >
                  {Object.keys(boilerplates).map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Card className="mt-3" style={{ width: '40vw' }}>
            <Card.Body>
              <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
              <Editor
                height="35vh"

                theme={theme}
                language={language}
                value={code}
                onChange={handleCodeChange}
              />
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col style={{ justifyItems: 'center', justifyContent: 'space-between' }}>
              <div className="d-flex align-items-center gap-3">
                <h5>Time Elapsed: {minutes}m {seconds}s</h5>
                <Button onClick={compileCode} disabled={compiling}>
                  {compiling ? 'Running...' : 'Run Code'}
                </Button>
                <Button variant="danger" onClick={endSession} disabled={isSessionEnded}>
                  {isSessionEnded ? 'Session Ended' : 'End Session'}
                </Button>
              </div>
            </Col>
          </Row>

          <Card className="mt-3" style={{ width: '40vw' }}>
            <Card.Body>
              <h2>Output</h2>
              <Form.Control as="textarea" value={output} readOnly className="font-mono bg-white text-success min-h-[100px]" />
            </Card.Body>
          </Card>
        </Col>


      </Row >
    </div >
  );
}

export default MockInterview;

























































































































































































































































































































































































