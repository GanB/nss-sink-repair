import {
  getRequests,
  deleteRequest,
  getPlummers,
  saveCompletion,
  getCompletions,
} from "./dataAccess.js";

export const Requests = async () => {
  const requests = await getRequests();
  const plumbers = await getPlummers();
  const completions = await getCompletions();

  const transformedRequests = () => {
    return requests.map((request) => {
      const completedRequest = completions.find(
        (completedRequest) =>
          parseInt(completedRequest.requestId) === request.id
      );
      return {
        ...request,
        completionStatus: completedRequest ? true : false,
        completionId: completedRequest ? completedRequest.id : null,
        completionDate: completedRequest
          ? completedRequest.completionDate
          : null,
        completedBy: completedRequest
          ? plumbers.find(
              (plumber) => plumber.id === parseInt(completedRequest.plumberId)
            )?.name
          : null,
      };
    });
  };

  const serviceRequests = transformedRequests().sort(
    (a, b) => Number(a.completionStatus) - Number(b.completionStatus)
  );

  let html = `
                <table>
                    <tr class="tableheader">
                        <th>Request ID</th>
                        <th>Description</th>
                        <th>Needed By</th>
                        <th>Budget</th>
                        <th>Address</th>
                        <th>Completed By</th>
                        <th>Completed On</th>
                        <th>&nbsp;</th>
                    </tr>
                        ${serviceRequests
                          .map((serviceRequest) => {
                            const plumberOptions = `<select class="plumbers" id="plumbers">
                                        <option value="">Choose</option>
                                            ${plumbers
                                              .map((plumber) => {
                                                return `<option value="${serviceRequest.id}--${plumber.id}">
                                                ${plumber.name}
                                                </option>`;
                                              })
                                              .join("")}
                                    </select>`;
                            return `
                            <tr class="${
                              serviceRequest.completionId
                                ? "completedRequest"
                                : "activeRequest"
                            }">
                                <td>${serviceRequest.id}</td>
                                <td>${serviceRequest.description}</td>
                                <td>${serviceRequest.neededBy}</td>
                                <td>${
                                  serviceRequest.budget
                                    ? serviceRequest.budget.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "USD",
                                        }
                                      )
                                    : ""
                                }</td>
                                <td>${serviceRequest.address}</td>
                                <td>${
                                  serviceRequest.completionId
                                    ? serviceRequest.completedBy
                                    : plumberOptions
                                }
                                </td>
                                <td>${
                                  serviceRequest.completionDate
                                    ? new Date(
                                        serviceRequest.completionDate
                                      ).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : ""
                                }</td>
                                <td>
                                    <button class="request__delete" id="request--${
                                      serviceRequest.id
                                    }">
                                    Delete
                                    </button>
                                </td>
                             </tr>
                             `;
                          })
                          .join("")}
                </table>
            `;

  return html;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberId] = event.target.value.split("--");

    const completion = saveCompletion({
      requestId: requestId,
      plumberId: plumberId,
      completionDate: Date.now(),
    });
  }
});
