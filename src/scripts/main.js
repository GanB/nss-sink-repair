import { fetchRequests } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";

const mainContainer = document.querySelector("#container");

const render = async () => {
  //   await fetchRequests();
  const sinkRepair = await SinkRepair();
  console.log("SinkRepair()", sinkRepair);
  mainContainer.innerHTML = sinkRepair;
};

render();
