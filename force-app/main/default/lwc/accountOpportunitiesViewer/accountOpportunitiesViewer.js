import { LightningElement, api, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
import { refreshApex } from '@salesforce/apex';

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    @track opportunities;
    @track error = null;

    columns = [
        { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' }
    ];

    wiredResult;

    @wire(getOpportunities, { accountId: '$recordId' })
    wiredOpportunities(result) {
        this.wiredResult = result;

        const { data, error } = result;
        if (data) {
            this.opportunities = data;
            this.error = null;
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        }
    }

    handleRafraichir() {
        refreshApex(this.wiredResult);
    }
}
