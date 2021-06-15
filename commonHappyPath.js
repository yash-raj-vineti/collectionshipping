
    commonCollectionSteps: (scope, patientInformation) => {
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('[data-testid="paginated-table-body"]>>').contains(patientInformation.subjectId).click();

      col_steps.testCollectionHeaders(scope.headerLabels,scope.patientInformation);

      col_steps.testResults(scope.treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      col_steps.collectionBagIdentification(scope.coi);
      col_steps.collectionBagData(scope.coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(scope.coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${scope.coi}"]`).click();
      col_steps.collectionHandoffRecipt(scope.coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(scope.coi);
      col_steps.applyLabelsCassettes(scope.coi);
      col_steps.enterBagData(scope.coi);
      col_steps.controlledRateFreezer(scope.coi);
      col_steps.collectionBagStorage(scope.coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(scope.coi);
      col_steps.shippingChecklist(scope);
      col_steps.collectionShippingSummary(scope.coi);
    }
