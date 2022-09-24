import { ServiceForm } from "./ServiceForm.js";
import { Requests } from "./Requests.js";

export const SinkRepair = async () => {
  const serviceRequests = await Requests();
  const serviceForm = await ServiceForm();
  return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
        ${serviceForm}
        </section>

        <section class="serviceRequests">
            <h2 class="serviceHeader">Service Requests</h2>
            ${serviceRequests}        
		</section>
    `;
};
