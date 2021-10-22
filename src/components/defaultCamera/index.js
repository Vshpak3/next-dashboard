import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Amplify, { Storage } from "aws-amplify";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "../assets/style.css";
import "react-simple-keyboard/build/css/index.css";
import { withRouter, useHistory } from "react-router-dom";
import LogoImg from "../assets/polly_name.png";
import Back from "../assets/back.png";
import Next from "../assets/next.png";
import FocusImg from "../assets/focus.png";

import styled from "styled-components";
import awsconfig from "../../aws-exports.ts";

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

const Predictions = styled.div`
  position: fixed;
  bottom: 10%;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  & > div {
    margin: 0 20px;
  }
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
  const [senetnce, setSentence] = useState();
  const [parent, setParent] = useState(false);

  let sentenceList = [];
  let history = useHistory();

  let screenwidth = getWindowSize().width;
  let screenheight = getWindowSize().height;
  let camWidth, camHeight;

  let video;

  useEffect(() => {
    video = document.getElementById("video");
    getSentenceData();

    const webCamPromise = loadVideo(video);

    const modelPromise = cocoSsd.load();
    Promise.all([modelPromise, webCamPromise])
      .then((values) => {
        detectFrame(video, values[0]);
      })
      .catch(() => {
        alert("Video not loaded. Refresh the page");
      });
  }, []);

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
            camWidth = video.videoWidth;
            camHeight = video.videoHeight;
            video.play();
            resolve();
          };
        });
      })
      .catch(() => {
        alert("No camera Detected. Enable camera and refresh the page");
      });
    return webCamPromise;
  };

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          sentenceList.push(rawFile.responseText);
          getList();
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

  const detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      console.log(predictions);
      const newPrediction = predictions.map((prediction) => prediction.class);
      if (
        JSON.stringify(newPrediction.sort()) !== JSON.stringify(data.sort())
      ) {
        setData(newPrediction);
      }

      renderPredictions(predictions);
      requestAnimationFrame(() => {
        detectFrame(video, model);
      });
    });
  };

  console.log({ dataOut: data });
  const renderPredictions = (predictions) => {
    const c = document.getElementById("canvas");
    screenwidth = getWindowSize().width;
    screenheight = getWindowSize().height;
    let heightModifyCount = 0;
    let currentCamHeight = screenheight;
    let currentCamWidth = screenwidth;

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

      predictions.forEach((prediction) => {
        let [x, y, width, height] = prediction.bbox;
        x = (x * currentCamWidth) / camWidth;
        y = (y * currentCamHeight) / camHeight + heightModifyCount;
        width = (width * currentCamWidth) / camWidth;
        height = (height * currentCamHeight) / camHeight;
        // Draw the bounding box.
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "gray";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x + 30, y, textWidth + 4, textHeight + 4);
      });

      predictions.forEach((prediction) => {
        let [x, y] = prediction.bbox;
        x = (x * currentCamWidth) / camWidth;
        y = (y * currentCamHeight) / camHeight + heightModifyCount;
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x + 30, y);
      });
    }
  };

  const getList = () => {
    setSentence(sentenceList);
  };

  const nextItem = () => {
    document.getElementById("listPredictions").scrollLeft += 500;
  };

  const backItem = () => {
    document.getElementById("listPredictions").scrollLeft -= 500;
  };

  return (
    <>
      <Container style={{ display: parent && "none" }} fluid={true}>
        <Row>
          <Col>
            <video id="video" width={screenwidth} height={screenheight} />
            <canvas id="canvas" width={screenwidth} height={screenheight} />
            <div className="output">
              <img id="photo" />
            </div>
          </Col>
          <Predictions>
            <Navigate onClick={() => (data.length > 3 ? backItem() : {})}>
              {data.length > 3 && <img src={Back} alt="back" />}
            </Navigate>

            <ListPredictions id={"listPredictions"}>
              {data.length > 0 &&
                data.map((item) => (
                  <ItemPredictions>
                    <span>{item}</span>
                  </ItemPredictions>
                ))}
            </ListPredictions>
            <Navigate onClick={() => (data.length > 3 ? nextItem() : {})}>
              {data.length > 3 && <img src={Next} alt="next" />}
            </Navigate>
          </Predictions>
          {/*<Logo>*/}
          {/*  <img src={LogoImg} alt="logo" />*/}
          {/*</Logo>*/}
          {/*<Focus>*/}
          {/*  <img src={FocusImg} alt="focus" />*/}
          {/*</Focus>*/}
        </Row>
      </Container>
    </>
  );
};

export default withRouter(DefaultCamera);
