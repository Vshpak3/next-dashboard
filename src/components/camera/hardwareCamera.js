import { useEffect, useState } from "react";

const net = window.require("net");
const SerialPort = window.require("serialport");



const HardwareCamera = () => {
  const [globalPort, setGlobalPort] = useState();
  // const client = new net.Socket();

  // if (
  //   localStorage.getItem("ipaddress") != null ||
  //   localStorage.getItem("ipaddress") !== ""
  // ) {
  //   const regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
  //   let match = regex.exec(localStorage.getItem("ipaddress"));
  //   if (match != null) {
  //     console.log(match[1].replace(/:[0-9]{1,4}.(.*)/, "$1"));

  //     client.connect(
  //       1234,
  //       match[1].replace(/:[0-9]{1,4}.(.*)/, "$1"),
  //       function () {
  //         console.log("Client Connected");
  //       }
  //     );
  //   }
  // }

  const createPort = (portPath) => {
    var port = new SerialPort(portPath, {
    	baudRate: 9600,
    	}, function(err) {
    	if (err) {
    		return console.log('Error: ', err.message);
    	}
    });

    // let port = new SerialPort(portPath, { autoOpen: false });

    console.log({ port });

    // setTimeout(function () {
    //   console.log("trying open");
    //   try {
    //     port.open(function (err) {
    //       if (err) {
    //         console.log("Error opening port: ", err.message);
    //       } else {
    //         console.log("Successfully opened port");
    //       }
    //     });
    //   } catch (e) {
    //     console.log("caught", e);
    //   }
    // }, 1000);

    port.on("open", function () {
      console.log("i have opened properly");
      setGlobalPort(port);
      port.setEncoding("utf8"); // important line
    });

    // flowing asynchronously in the background
    port.on("readable", function (data) {
      console.log(port.read());
    });

    return port
  };

  const tryPort = async(path) => {
    var result = false;
    var tempPort = new SerialPort(path, {autoOpen: false});
    
    await wait(1000);

    try {
      tempPort.open(function (err) {
        if (err) {
          console.log('Error opening port: ', err.message);
        }
        else {
          console.log(`Successfully opened port ${path}`);
          result = true
        }
      });
    }
    catch (e) {
      console.log('caught', e);
    }
  
    tempPort.setEncoding('hex');
  
    tempPort.on('readable', function(data) {
      var input = tempPort.read();
      console.log('input', input)
      if (input == '11') {
        // console.log(tempPort.path);
        console.log('success');
        result = true;
      }
    });
    // amount of time given to test the port to see if its working
    await wait(1000);
    console.log(path);
    // close port
    if (tempPort.isOpen) tempPort.close();
    await wait(1000);
    console.log(`try ${path} success.`)
    return result;
  }

  const handlePorts = async () => {
    console.log("handlePorts");
    let ports;
    try {
      ports = await SerialPort.list();
      console.log(ports);
    } catch (err) {
      console.log("Error: ", err.message);
    }
    let tempPath;
    for (let p of ports) {
      try {
        tempPath = p["path"];
        if (await tryPort(tempPath)) {
          return createPort(tempPath)
        } else {
          console.log('fail')
        }
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
    // if (
    //   localStorage.getItem("cameraType") == "arduino - servo" ||
    //   localStorage.getItem("cameraType") == "arduino - bldc" ||
    //   localStorage.getItem("cameraType") == "webcam"
    // )
      handlePorts();
  },[]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };

  // const AdjustSpeed = (speed) => {
  //   if(!globalPort) {
  //     return;
  //   }

  //   globalPort.write(speed);
  // };

  //console.log({ globalPort });

  const PanRight = () => {
    if(!globalPort) {
      return;
    }

    console.log('write r', globalPort.write("r"));

    globalPort.write("r");
    globalPort.write("r");
    globalPort.write("r");
    globalPort.write("r");
  };

  const FastPanRight = () => {
    if(!globalPort) {
      return;
    }

    console.log('write R', globalPort.write("R"));

    globalPort.write('R');
    globalPort.write('R');
    globalPort.write('R');
    globalPort.write('R');
  };

  const PanLeft = () => {
    if(!globalPort) {
      return;
    }

    console.log('write l', globalPort.write("l"));
    
    globalPort.write("l");
    globalPort.write("l");
    globalPort.write("l");
    globalPort.write("l");
  };

  const FastPanLeft = () => {
    if(!globalPort) {
      return;
    }

    console.log('write L', globalPort.write("L"));

    globalPort.write("L");
    globalPort.write("L");
    globalPort.write("L");
    globalPort.write("L");
  };

  const TiltUp = () => {
    if(!globalPort) {
      return;
    }
    
    globalPort.write("u");
  };

  const TiltDown = () => {
    if(!globalPort) {
      return;
    }
    globalPort.write("d");
  };

  // const Stop = () => {
  //   if(!globalPort) {
  //     return;
  //   }
  //   // if (localStorage.getItem("cameraType") === "arduino - servo")
  //     globalPort.write("s");
  // };

  return {
    handlePorts,
    PanLeft,
    PanRight,
    FastPanLeft,
    FastPanRight,
    TiltDown,
    TiltUp,
    globalPort
  };
};
export default HardwareCamera;
