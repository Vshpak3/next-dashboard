import { useEffect } from "react";

const net = window.require("net");
const SerialPort = window.require("serialport");

const HardwareCamera = () => {
  let globalPort;
  const client = new net.Socket();

  if (
    localStorage.getItem("ipaddress") != null ||
    localStorage.getItem("ipaddress") !== ""
  ) {
    const regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
    let match = regex.exec(localStorage.getItem("ipaddress"));
    if (match != null) {
      console.log(match[1].replace(/:[0-9]{1,4}.(.*)/, "$1"));

      client.connect(
        1234,
        match[1].replace(/:[0-9]{1,4}.(.*)/, "$1"),
        function () {
          console.log("Client Connected");
        }
      );
    }
  }

  const createPort = (portPath) => {
    // var port = new SerialPort(portPath, {
    // 	baudRate: 9600, autoOpen: false
    // 	}, function(err) {
    // 	if (err) {
    // 		return console.log('Error: ', err.message);
    // 	}
    // });

    let port = new SerialPort(portPath, { autoOpen: false });

    console.log({ port });

    setTimeout(function () {
      console.log("trying open");
      try {
        port.open(function (err) {
          if (err) {
            console.log("Error opening port: ", err.message);
          } else {
            console.log("Successfully opened port");
          }
        });
      } catch (e) {
        console.log("caught", e);
      }
    }, 1000);

    globalPort = port;

    port.on("open", function () {
      console.log("i have opened properly");
      port.setEncoding("utf8"); // important line
    });

    // flowing asynchronously in the background
    port.on("readable", function (data) {
      console.log(port.read());
    });
  };

  const handlePorts = async () => {
    let ports;
    try {
      ports = await SerialPort.list();
      console.log(ports);
    } catch (err) {
      console.log("Error: ", err.message);
    }
    let tempPath;
    for (let i = 0; i < ports.length; i += 1) {
      try {
        tempPath = ports[i]["comName"].toString();
        return createPort(tempPath);
      } catch (err) {
        console.log("Error: ", err.message);
      }
    }

    if (ports.length === 1) {
      console.log(`Test failed on all ports. Defaulting to ${tempPath}`);
      return createPort(tempPath);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cameraType") == "arduino - servo" ||
      localStorage.getItem("cameraType") == "arduino - bldc" ||
      localStorage.getItem("cameraType") == "webcam"
    )
      handlePorts();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };

  const AdjustSpeed = (speed) => {
    if (localStorage.getItem("cameraType") === "arduino - servo")
      globalPort.write(speed);
  };

  console.log({ globalPort });

  const PanRight = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");

      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");

      globalPort.write("b");
      globalPort.write("b");
      globalPort.write("b");
    } else if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("r");
    else if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("r");
  };

  const FastPanRight = () => {
    if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("fr");
    if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("R");
    globalPort.write("R");
    globalPort.write("R");
    globalPort.write("R");
  };

  const PanLeft = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");
      globalPort.write("x");

      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");
      globalPort.write("r");

      globalPort.write("b");
      globalPort.write("b");
      globalPort.write("b");
    } else if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("l");
    else if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("l");
  };

  const FastPanLeft = () => {
    if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("fl");
    if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("L");
  };

  const TiltUp = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      globalPort.write("w");
      globalPort.write("w");
      globalPort.write("w");

      globalPort.write("e");
      globalPort.write("e");
      globalPort.write("e");
    } else if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("u");
    else if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("u");
  };

  const TiltDown = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      globalPort.write("q");
      globalPort.write("q");
      globalPort.write("q");

      globalPort.write("e");
      globalPort.write("e");
      globalPort.write("e");
    } else if (localStorage.getItem("cameraType") === "arduino - bldc")
      globalPort.write("d");
    else if (localStorage.getItem("cameraType") === "raspberrypi")
      client.write("d");
  };

  const Stop = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo")
      globalPort.write("s");
  };

  return {
    handlePorts,
    PanLeft,
    PanRight,
    FastPanLeft,
    FastPanRight,
    TiltDown,
    TiltUp,
    AdjustSpeed,
    Stop,
  };
};
export default HardwareCamera;
