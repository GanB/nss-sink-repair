import { getRequests } from "./dataAccess.js";

export const Requests = async () => {
  const requests = await getRequests();
  console.log("requests", requests);

  let html = `
                <table>
                    <tr>
                        <th>Request ID</th>
                        <th>Description</th>
                        <th>Needed By</th>
                        <th>Budget</th>
                        <th>Address</th>
                    </tr>
                        ${
                          requests.map((request) => {
                            return `
                            <tr>
                                <td>${request.id}</td>
                                <td>${request.description}</td>
                                <td>${request.neededBy}</td>
                                <td>${request.budget}</td>
                                <td>${request.address}</td>
                             </tr>`;
                          })
                          //   .join("")
                        }
                </table>
                `;

  return html;
};
