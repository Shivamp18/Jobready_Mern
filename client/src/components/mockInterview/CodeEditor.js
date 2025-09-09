import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { getSocket } from "../utils/socket"; // adjust path if needed

function MockInterview({ roomId }) {
  const myVideo = useRef(null);
  const peerVideo = useRef(null);
  const peerRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    const socket = getSocket();

    // ✅ Create Peer instance per user
    peerRef.current = new Peer(undefined, {
      host: window.location.hostname,
      port: process.env.NODE_ENV === "production" ? 443 : 5000,
      path: "/peerjs",
      secure: process.env.NODE_ENV === "production",
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      },
    });

    // ✅ When Peer is open, join room
    peerRef.current.on("open", (id) => {
      console.log("Peer connected with ID:", id);
      socket.emit("join-room", roomId, id);
    });

    // ✅ Access camera & mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        // Show my video
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          myVideo.current.onloadedmetadata = () => myVideo.current.play();
        }

        // Answer incoming calls
        peerRef.current.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (peerVideo.current) {
              peerVideo.current.srcObject = remoteStream;
              peerVideo.current.onloadedmetadata = () => peerVideo.current.play();
            }
          });
        });

        // Call new users when they connect
        socket.on("user-connected", (userId) => {
          console.log("User connected:", userId);
          const call = peerRef.current.call(userId, stream);
          call.on("stream", (remoteStream) => {
            if (peerVideo.current) {
              peerVideo.current.srcObject = remoteStream;
              peerVideo.current.onloadedmetadata = () => peerVideo.current.play();
            }
          });
        });
      })
      .catch((err) => console.error("Failed to get local stream:", err));

    // ✅ Cleanup on unmount
    return () => {
      socket.off("code_update");
      socket.emit("leave_room", roomId);

      if (peerRef.current) {
        peerRef.current.disconnect();
        peerRef.current.destroy();
      }

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
  }, [roomId, localStream]);

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
