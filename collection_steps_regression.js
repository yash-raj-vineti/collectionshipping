
  // Bag Selection
  collectionBagSelection: {
    happyPath: (coi,treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
    },

    // C21732	[NEG] Verify the "Next" Button when no selector is selected.
      noSelectorNegative: () => {
      cy.log('[NEG] Verify the "Next" Button when no selector is selected.');
      cy.wait(1000);
      inputChecker.nextButtonCheck('be.disabled');
      cy.wait(1000);
    },

     // C21736	[NEG] Verify the "Next" Button when selector is on 'Do not Ship'. 
      shipperNegative: () => {
      cy.log('[NEG] Verify the "Next" Button when selector is on "Do not Ship"');
      cy.wait(1000);
      inputHelpers.clicker('[data-testid="fail-button-0"]');
      inputChecker.nextButtonCheck('be.disabled');
      cy.wait(1000);
    }
  },

  // Transfer Bag to shipper
  collectionBagTransfer: {
    happyPath: (coi,treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
    },

    // C21741	[NEG] Verify the "Next" Button when no data is filled. 
    noDataFilledNegative: () => {
    cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
    cy.wait(1000);
    inputChecker.nextButtonCheck('be.disabled');
    cy.wait(1000);
    },

    // C22047	[NEG] Verify the "Confirm" Button is disabled when no data is filled. 
    noDataFilledConfirmButtonNegative: (coi) => {
      cy.log('[NEG] Verify the "Confirm" Button is disabled when no/invalid data is filled.');
      cy.wait(1000);
      inputChecker.checkState(`[data-testid="ln-2-storage-action-trigger-button"]`, 'be.disabled');
      inputChecker.identifierCoiLabelCheck('ln-2-storage', '100', 'be.disabled');
        let bagNumber = 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-0${bagNumber}`, 'be.disabled');
      inputChecker.checkState(`[data-testid="coi-action-trigger-button"]`, 'be.disabled');
      inputChecker.identifierCoiLabelCheck('coi', '100', 'be.disabled');
      cy.wait(1000);
      },

    // C30472	[NEG] Verify the "Next" Button when only COI values are not added.
    coiMissingValue: () => {
        cy.log('Verify the "Next" Button when only COI Values not added.');
        inputHelpers.inputSingleField('[data-testid="ln-2-storage-input-field"]', inputs.ln2Id);
        inputHelpers.clicker('[data-testid="ln-2-storage-action-trigger-button"]');
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      }
    },

  collectionShippingChecklist: {
    happyPath: (coi,treatmentInformation,scope, patientInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
      col_steps.shippingChecklist(scope, patientInformation)
    },

    // 	C21746	[NEG] Verify the "Next" Button when no data is filled. 
    noDataFilledNegative: () => {
      cy.log('[NEG] Verify the "Next" Button when no data is filled.');
      inputChecker.nextButtonCheck('be.disabled');
    },

    // 	C22171	[NEG] Verify Additional text area for Attach shipping labels to shipper label.
    noDataFilledShippingLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-attach_shipping_label"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/attach_shipping_label_reason-input"]','be.visible');
      inputChecker.nextButtonCheck('be.disabled');
    
    },

    // C22334	[NEG] Verify the Additional information text area for placing the materials into shipper according to the SOP label.
    noDataFilledSopLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-place_material_into_shipper"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/place_material_into_shipper_reason-input"]','be.visible');
      inputChecker.nextButtonCheck('be.disabled');
    
    },

    // 	C22335	[NEG] Verify Additional information text area for Activating the Temperature monitor label
    noDataFilledTemperatureLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-activate_temperature_monitor"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/activate_temperature_monitor_reason-input"]','be.visible');
      inputChecker.nextButtonCheck('be.disabled');
   
    },

    // C22496	[NEG] Verify the Additional information text area for Placing the summary documents in Shipper
    noSummaryDocumentsAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-place_summary_document"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/place_summary_document_reason-input"]','be.visible');
      inputChecker.nextButtonCheck('be.disabled');
  
    },

    // C30414 [[NEG] Verify the "Record" Button when no data is filled.
    noRecordNegative: () => {
      cy.log('[[NEG] Verify the "Record" Button when no data is filled.');
      inputChecker.checkState(`[data-testid="recordButton-shipper_serial_number"]`, 'be.disabled');
      inputChecker.enterConfirmCheckNegative('shipper_serial_number', '123', '321', 'be.disabled');
    }

    // Airway bill number not found in input.json
  },


  collectionShippingSummary: {
    happyPath: (coi,treatmentInformation,scope, patientInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
      col_steps.shippingChecklist(scope, patientInformation);
      col_steps.collectionShippingSummary();
    },

    // 	C21751	[NEG] Verify "Done" button when no signature is done.
    noSignatureDoneNegative: ()=>{
      cy.log('[NEG] Verify the "Next" Button when the Signatures are not confirmed');
      inputChecker.checkState('[data-testid="primary-button-action"]', 'be.disabled');
    
    },

    // C21756	[NEG] Verify 'Print Summary' is disabled when no signature is done. 
    noSignaturePrintNegative:()=>{
      cy.log('NEG] Verify "Print Summary" when the signatures are not confirmed.');
      inputCheckHelpers.checkState("[data-test-id='view-document-block'] >>>", 'be.disabled');
    },

    // 	C21755	[POS] Verify "Done" button after signature is done. 
    signatureDonePositive:()=>{
      cy.wait(2000);
      signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
      signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], inputs.verifier[1]);
      inputChecker.checkState('[data-testid="primary-button-action"]', 'not.be.disabled');
      cy.wait(10000);
    },

    // C21757	[POS] Verify 'Print Summary' is enabled when signature is done.
    signaturePrintPositive:()=>{
      cy.log('POS] Verify "Print Summary" when the signatures are confirmed.');
      //signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
    //  signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], inputs.verifier[1]);
      inputCheckHelpers.checkState("[data-test-id='view-document-block'] >>>", 'not.be.disabled');
    }
  }
