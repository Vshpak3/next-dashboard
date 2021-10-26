import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Amplify, { Storage } from "aws-amplify";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "../assets/style.css";
import "react-simple-keyboard/build/css/index.css";
import { withRouter, useHistory } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import LockImg from "../assets/lock.png";
import Back from "../assets/back.png";
import Next from "../assets/next.png";
import Spinner from "../assets/Spinner.gif";
import TalkIcon from "../assets/talkIcon.png";
import CancelMess from "../assets/cancelMessIcon.png";
import KeyboardIcon from "../assets/ketboardIcon.png";

import styled from "styled-components";
import awsconfig from "../../aws-exports.ts";
import AWS from "aws-sdk";

const remote = window.require("electron").remote;

Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id, //REQUIRED - Amazon Cognito Identity Pool ID
    region: awsconfig.aws_cognito_region, // REQUIRED - Amazon Cognito Region
    userPoolId: awsconfig.aws_user_pools_id, //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id, //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    bucket: awsconfig.aws_user_files_s3_bucket, //REQUIRED -  Amazon S3 bucket name
    region: awsconfig.aws_cognito_region, //OPTIONAL -  Amazon service region
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
  },
});

const initialData = [
  { class: "Person" },
  { class: "Cell phone" },
  { class: "TV" },
  { class: "Laptop" },
  { class: "Pen" },
  { class: "Cup" },
  { class: "Bottle" },
  { class: "Window" },
];

const initSpeak = {
  OutputFormat: "mp3",
  SampleRate: "16000",
  Text: "",
  TextType: "text",
  VoiceId: "Matthew",
};

const Predictions = styled.div`
  position: fixed;
  bottom: 10%;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  flex-direction: column;
  & > div > div {
    margin: 0 20px;
  }
`;

const Action = styled.div`
  position: fixed;
`;

const ItemPredictions = styled.div`
  background: #5757578c;
  mix-blend-mode: hard-light;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 30px;
  display: inline-flex;
  width: 210px;
  height: 90px;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  cursor: pointer;
  span {
    color: #ffffff;
    font-size: 26px;
    font-weight: 600;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &.active {
    background: #ed157f;
  }
`;

const Logo = styled.div`
  position: fixed;
  top: 50px;
  left: 50px;
  img {
    width: 50%;
  }
`;

const Navigate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;
  img {
    width: 40px;
  }
`;

const ListPredictions = styled.div`
  display: block;
  flex: 8;
  max-width: 80%;
  white-space: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const Focus = styled.div`
  position: fixed;
  top: 50px;
  right: 50px;
  img {
    width: 50%;
  }
`;

const getWindowSize = () => {
  return remote.getCurrentWindow().getBounds();
};

const DefaultCamera = (props) => {
  const [data, setData] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [model, setModel] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isSpeak, setIsSpeak] = useState(false);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [currentLayoutKeyboard, setCurrentLayoutKeyboard] = useState("default");
  const [inputKeyboard, setInputKeyboard] = useState("");

  let screenwidth = getWindowSize().width;
  let screenheight = getWindowSize().height;

  const camWidthRef = useRef(null);
  const camHeightRef = useRef(null);

  const video = useRef(null);

  useEffect(() => {
    getSentenceData();
    getModel();
  }, []);

  const getModel = async () => {
    try {
      const webCamPromise = loadVideo(video.current);
      const modelPromise = cocoSsd.load();

      const model = await Promise.all([modelPromise, webCamPromise]);
      setIsReady(true);
      setModel(model[0]);

      // start detect frame
      startDetect(model[0]);
    } catch (err) {
      alert("Video not loaded. Refresh the page");
    }
  };

  const loadVideo = (video) => {
    const webCamPromise = navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: screenwidth,
          height: screenheight,
        },
      })
      .then((stream) => {
        video.srcObject = stream;

        return new Promise((resolve, reject) => {
          video.onloadedmetadata = () => {
            camWidthRef.current = video.videoWidth;
            camHeightRef.current = video.videoHeight;
            video.play();
            resolve();
          };
        });
      })
      .catch((err) => {
        // alert("No camera Detected. Enable camera and refresh the page");
        alert(err);
      });
    return webCamPromise;
  };

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          // sentenceList.push(rawFile.responseText);
          //
          // console.log(rawFile.responseText);
          // getList();
          setSentence([...sentence, rawFile.responseText]);
        }
      }
    };
    rawFile.send(null);
  };

  const getFileList = async () => {
    // let fileList = [];
    let data = Storage.list("sen_") // for listing ALL files without prefix, pass '' instead
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    return data;
  };

  const getSentenceData = async () => {
    let fileList = await getFileList();
    let list = [];
    fileList.map((r) => {
      list.push(r.key);
    });

    for (let i = 0; i < list.length, i < 7; i++) {
      await Storage.get(`${list[i]}`, { level: "public" })
        .then((result) => readTextFile(result))
        .catch((err) => console.log(err));
    }
  };

  const requestAnimationFrameRef = useRef(null);

  const detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      setData(
        predictions.sort((item1, item2) =>
          item1.class.localeCompare(item2.class)
        )
      );
    });
  };

  const stopDetect = () => {
    clearInterval(requestAnimationFrameRef.current);
  };

  const startDetect = (initModel) => {
    requestAnimationFrameRef.current = setInterval(() => {
      detectFrame(video.current, initModel);
    }, 3000);
  };

  const clearCanvas = () => {
    const c = document.getElementById("canvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const choiceObject = (objectChoice) => {
    // did not choice object
    setIsOpenKeyboard(false);
    setIsSpeak(false);
    setInputKeyboard("");
    if (currentChoice == null) {
      stopDetect();

      setCurrentChoice(objectChoice);
      renderPredictions(data, objectChoice);
    }
    // change object other
    else if (currentChoice.bbox[0] !== objectChoice.bbox[0]) {
      stopDetect();

      setCurrentChoice(objectChoice);
      renderPredictions(data, objectChoice);
    }
    // dont choice object
    else {
      startDetect(model);
      setCurrentChoice(null);
      clearCanvas();
    }
  };

  const renderPredictions = (predictions, currentChoice) => {
    const c = document.getElementById("canvas");
    screenwidth = getWindowSize().width;
    screenheight = getWindowSize().height;
    let heightModifyCount = 0;
    let currentCamHeight = screenheight;
    let currentCamWidth = screenwidth;

    const camWidth = camWidthRef.current;
    const camHeight = camHeightRef.current;

    if (screenwidth / screenheight !== camWidth / camHeight) {
      currentCamHeight = (camHeight * screenwidth) / camWidth;
      heightModifyCount = (screenheight - currentCamHeight) / 2;
      currentCamWidth = screenwidth;
    }

    if (c) {
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Font options.
      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";

      const predictionChoice = predictions.filter(
        (prediction) => prediction.bbox[0] === currentChoice.bbox[0]
      );

      if (!!predictionChoice) {
        predictionChoice.forEach((prediction) => {
          let [x, y, width, height] = prediction.bbox;
          x = (x * currentCamWidth) / camWidth;
          y = (y * currentCamHeight) / camHeight + heightModifyCount;
          width = (width * currentCamWidth) / camWidth;
          height = (height * currentCamHeight) / camHeight;
          // Draw the bounding box.
          ctx.strokeStyle = "#ED157F";
          ctx.lineWidth = 4;
          ctx.strokeRect(x, y, width, height);
          // Draw the label background.
          ctx.fillStyle = "gray";
          const textWidth = ctx.measureText(prediction.class).width;
          const textHeight = parseInt(font, 10); // base 10
          ctx.fillRect(x + 30, y, textWidth + 4, textHeight + 4);
        });

        predictionChoice.forEach((prediction) => {
          let [x, y] = prediction.bbox;
          x = (x * currentCamWidth) / camWidth;
          y = (y * currentCamHeight) / camHeight + heightModifyCount;
          // Draw the text last to ensure it's on top.
          ctx.fillStyle = "#000000";
          ctx.fillText(prediction.class, x + 30, y);
        });
      }
    }
  };

  // speaker
  const speakText = () => {
    connect();

    // Create the Polly service object and presigner object
    const finalData = {
      ...initSpeak,
      Text: inputKeyboard ? inputKeyboard : sentence[0],
    };
    console.log("Final Polly Data", finalData);

    if (finalData.Text !== "") {
      let filename = `sen_${Date.now()}.json`;
      Storage.put(filename, finalData.Text, {
        level: "public",
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }

    var polly = new AWS.Polly({ apiVersion: "2016-06-10" });
    var signer = new AWS.Polly.Presigner(finalData, polly);

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(finalData, function (error, url) {
      if (error) {
        console.log("error polly speak ", error);
      } else {
        pollyaudioplay(url).then(function () {
          setTimeout(() => {
            setIsSpeak(false);
          }, 1000);
        });
      }
    });
  };
  const pollyaudioplay = (audiosource) => {
    return new Promise(function (resolve, reject) {
      setIsSpeak(true);
      document.getElementById("audioSource").src = audiosource;
      document.getElementById("audioPlayback").load();
      document.getElementById("audioPlayback").play();
      document.getElementById("audioPlayback").onerror = reject;
      document.getElementById("audioPlayback").onended = resolve;
    });
  };
  const connect = () => {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = "us-east-1"; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-1:47c46f2d-f5b1-4857-9d20-27b64cf32b2c",
    });
  };
  // keyboard
  const onChange = (input) => {
    setInputKeyboard(input);
  };

  const handleShift = () => {
    const newLayoutName =
      currentLayoutKeyboard === "default" ? "shift" : "default";
    setCurrentLayoutKeyboard(newLayoutName);
  };
  const onKeyPress = (button) => {
    // If you want to handle the shift and caps lock buttons
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const nextItem = () => {
    document.getElementById("listPredictions").scrollLeft += 500;
  };

  const backItem = () => {
    document.getElementById("listPredictions").scrollLeft -= 500;
  };

  console.log(inputKeyboard);

  return (
    <React.Fragment>
      <Container fluid={true}>
        <Row>
          <Col>
            <video
              id="video"
              width={screenwidth}
              height={screenheight}
              ref={(node) => (video.current = node)}
            />
            <canvas id="canvas" width={screenwidth} height={screenheight} />
            <div className="output">
              <img id="photo" />
            </div>
          </Col>

          <Predictions>
            {!!currentChoice && (
              <div className="d-flex w-100 action-list justify-content-end pr-5 mb-4">
                <div className="icon text-mess">
                  {inputKeyboard !== "" ? inputKeyboard : sentence[0]}
                </div>
                <div
                  className={`icon-circle talk ${isSpeak ? "active" : ""}`}
                  onClick={speakText}
                >
                  <audio
                    id="audioPlayback"
                    controls
                    style={{ display: "none" }}
                  >
                    <source id="audioSource" type="audio/mp3" src="" />
                  </audio>
                  <img src={TalkIcon} alt="" />
                </div>
                <div className="icon-circle cancel-mess">
                  <img src={CancelMess} alt="" />
                </div>
                <div
                  className="keyboard"
                  onClick={() => setIsOpenKeyboard(!isOpenKeyboard)}
                >
                  <img src={KeyboardIcon} alt="" />
                </div>
              </div>
            )}
            <div className="d-flex w-100">
              <Navigate onClick={() => (data.length > 3 ? backItem() : {})}>
                {data.length > 3 && <img src={Back} alt="back" />}
              </Navigate>
              <ListPredictions id={"listPredictions"}>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <ItemPredictions
                      className={
                        currentChoice != null &&
                        item.bbox[0] === currentChoice.bbox[0]
                          ? "active"
                          : ""
                      }
                      key={index}
                      onClick={() => choiceObject(item)}
                    >
                      <span>{item.class}</span>
                    </ItemPredictions>
                  ))}
              </ListPredictions>
              <Navigate onClick={() => (data.length > 3 ? nextItem() : {})}>
                {data.length > 3 && <img src={Next} alt="next" />}
              </Navigate>
            </div>
          </Predictions>
        </Row>
        {!isReady && (
          <div
            className="pending-load"
            style={{ width: screenwidth, height: screenheight }}
          >
            <div className="start-detecting">
              <img src={LockImg} className="mr-3" alt="lock" />
              <span className="mr-3">Start detecting</span>
              <img src={Spinner} alt="" />
            </div>
          </div>
        )}
        {isOpenKeyboard && (
          <Keyboard
            // keyboardRef={(r) => onChange(r)}
            layoutName={currentLayoutKeyboard}
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={inputKeyboard}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default withRouter(DefaultCamera);
