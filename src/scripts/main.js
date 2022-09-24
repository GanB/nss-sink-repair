import { fetchRequests, fetchPlumbers } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";

const mainContainer = document.querySelector("#container");

const render = async () => {
  // await fetchRequests();
  //   await fetchPlumbers();
  const sinkRepair = await SinkRepair();
  mainContainer.innerHTML = sinkRepair;
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});

mainContainer.addEventListener("requestCompleted", (customEvent) => {
  render();
});
