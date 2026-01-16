import { LightningElement, api, track } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;

    @track opportunities = [];
    @track error = null;

    columns = [
        { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' }
    ];

    isLoading = false;
    hasClicked = false; // 👈 très important

    get hasOpportunities() {
        return Array.isArray(this.opportunities) && this.opportunities.length > 0;
    }

    // 👉 message d’erreur si clic ET aucune opportunité
    get showError() {
        return this.hasClicked && !this.isLoading && !this.hasOpportunities;
    }

    handleRafraichir() {
        this.hasClicked = true;
        this.isLoading = true;
        this.error = null;
        this.opportunities = [];

        getOpportunities({ accountId: this.recordId })
            .then((result) => {
                this.opportunities = result || [];
                this.isLoading = false;

                // 👇 si tableau vide, on force une "erreur fonctionnelle"
                if (this.opportunities.length === 0) {
                    this.error = 'Aucune opportunité trouvée pour ce compte.';
                }
            })
            .catch(() => {
                this.error = 'Erreur lors du chargement des opportunités.';
                this.isLoading = false;
            });
    }
}
