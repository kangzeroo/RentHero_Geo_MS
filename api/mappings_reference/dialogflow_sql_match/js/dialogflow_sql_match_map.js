exports.dialogflow_sql_match_map = {
  form_id: 'sql_map',
  relationships: [
    {
      dialogFlow_intentName: '.SPECIFIC_STRUC---CoolLevel',
      dialogFlow_intentID: 'projects/renthero-landlord-ai/agent/intents/2b0e15f1-8868-4761-b4cb-483f7327d4a5',
      requiredSlots: [
        'PRICE',
        'UNIT',
        'AD_ID'
      ],
      rdsQuery: `
        SELECT * FROM ad WHERE ad.ad_id = $3
      `
    },
    {
      dialogFlow_intentName: '.SPECIFIC_STRUC---Niceness',
      dialogFlow_intentID: 'projects/renthero-landlord-ai/agent/intents/b419e2b6-7aa9-42ab-b217-fc7eb3143ef6',
      requiredSlots: [
        'PRICE',
        'UNIT',
        'AD_ID'
      ],
      rdsQuery: `
        SELECT * FROM ad WHERE ad.ad_id = $3
      `
    }
  ]
}
