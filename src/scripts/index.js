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
    errorCode: "INCORRECT_DETAILS"
  },
  {
    state: "processing"
  },
  {
    state: "error",
    errorCode: "NO_STOCK"
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

let data01 = [
  {
    state: "processing"
  },
  {
    state: "error"
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

let data04 = [];

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delayInms);
    }, delayInms);
  });
}

function getProcessingPage(data) {
  return new Promise((resolve, reject) => {
    let mockProcessing = Promise.resolve(0);
    let output = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].state === "processing") {
        // delay by 2 seconds, ie, waits the Promise (returned by the function delay), resolves 2 seconds
        mockProcessing = delay(2000 * (i + 1));
      } else if (data[i].state === "error") {
        // handle the error code provided
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
        // return from the helper
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
      // if never occurred an error or a success (forever processing)
      let noResults = {};
      mockProcessing.then(values => {
        console.log(
          `Helper spent ${values / 1000} seconds to determine the output.`
        );
        noResults.waiting = `${values / 1000} seconds`;
        resolve(noResults);
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
    `Object returned: \n { title: '${result.title}', message: ${result.message} } \n And the Helper spent ${result.waiting} to determine the output.`
  );
  let runTask = document.querySelector("#run-task");
  if (!runTask) {
    runTask = document.createElement("input");
    runTask.setAttribute("name", "run_task");
    runTask.setAttribute("type", "button");
    runTask.setAttribute("value", "Run Task");
    runTask.textContent = "Run Task";
    runTask.addEventListener("click", function() {
      window.location.reload();
    });
    document.body.appendChild(runTask);
  }
});
