import "../styles/index.scss";
console.log("webpack starterkit!");

/**
 * Vodafone coding test
 */

/**
 * H. A. Serra
 * October 26th 2019
 *
 */

/**
 * Gets the processing page
 * @param {array} data
 */

let data = [
  {
    state: "processing",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "INCORRECT_DETAILS"
  },
  {
    state: "success",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "NO_STOCK"
  },
  {
    state: "processing",
    errorCode: "NO_STOCK"
  }
];

let data02 = [
  {
    state: "error"
  },
  {
    state: "error"
  }
];

let data03 = [
  {
    state: "processing"
  },
  {
    state: "processing"
  },
  {
    state: "processing"
  },
  {
    state: "processing"
  }
];

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delayInms);
    }, delayInms);
  });
}

function getProcessingPage(data) {
  return new Promise((resolve, reject) => {
    let mockProcessing = Promise.resolve("immediately");
    let output = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].state === "processing") {
        // delay by 2 seconds, ie, waits the Promise (returned by the function deley), resolves 2 seconds
        mockProcessing = delay(2000 * (i + 1));
      } else if (data[i].state === "error") {
        //
        mockProcessing.then(function(values) {
          if (data[i].errorCode === "NO_STOCK") {
            output.title = "Error page";
            output.message = "No stock has been found";
            output.waiting = ` ${values / 1000} seconds`;
          } else if (data[i].errorCode === "INCORRECT_DETAILS") {
            output.title = "Error page";
            output.message = "Incorrect details have been entered";
            output.waiting = ` ${values / 1000} seconds`;
          } else if (
            data[i].errorCode === null ||
            data[i].errorCode === undefined
          ) {
            output.title = "Error page";
            output.message = null;
            output.waiting = ` ${values / 1000} seconds`;
          }
          resolve(output);
        });
        break;
      } else if (data[i].state === "success") {
        //
        mockProcessing.then(function(values) {
          output.title = "order complete";
          output.message = null;
          output.waiting = ` ${values / 1000} seconds`;
          resolve(output);
        });
        break;
      } else {
        //
        console.log("invalid state.");
        break;
      }
    }
    if (output.title === undefined || output.message === undefined) {
      mockProcessing.then(values => {
        console.log(`I've been waiting for ${values / 1000} seconds.`);
        resolve(values);
      });
    }
  });
}

let vodafoneResult = getProcessingPage(data);

let outputResult = document.querySelector(".result");
outputResult.innerHTML = "Processing, please wait ...";

vodafoneResult.then(result => {
  outputResult.innerHTML = `{ title: '${result.title}', message: '${result.message}' }`;
  // the result is also logged on the console
  console.log(
    `Object returned: \n { title: '${result.title}', message: ${result.message} } \n And I've been waiting for ${result.waiting}.`
  );
});
