const API = "http://localhost:4010";

export const fetchRequests = async () => {
  console.log("applicationState in fetchRequests begin", applicationState);
  const dataFetch = await fetch(`${API}/requests`);
  const serviceRequests = await dataFetch.json();
  // Store the external state in application state
  console.log("serviceRequests", serviceRequests);
  applicationState.requests = serviceRequests;
  console.log("applicationState in fetchRequests end", applicationState);
};

const applicationState = {};

export const getRequests = async () => {
    await fetchRequests();
  console.log("applicationState", applicationState);
  console.log(
    "applicationState.requests.map((data) => ({ ...data }))",
    applicationState.requests.map((data) => ({ ...data }))
  );
  return applicationState.requests.map((data) => ({ ...data }));
};
