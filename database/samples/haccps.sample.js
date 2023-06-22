const HACCP_STEPS = require('../../utils/constants/haccpSteps');
const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');
const RECIPE_ACTIONS = require('../../utils/constants/recipeActions');

const haccps = [
  {
    name: 'Chilled storage',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.CHILLED,
    action: {
      keep: ['Freeze'],
      use: ['Hot holding', 'Cold holding', 'Re-heating'],
    },
    hazzard: ['Growth of food poisoning bacteria'],
    control: [
      'Stored in fridge at temperatures that slow bacterial growth',
      'Stock rotation and foods used within shelf-life',
    ],
    procedure: ['Record fridge temperatures', 'Visuals checks'],
    frequency: ['Twice a day', 'During the day'],
    limits: ['At or below 8ºC'],
    correctiveActions: [
      'Fridge adjusted',
      'Food mooved to another fridge',
      'Discard any food >8ºC for longer than 4 hours',
      'Discard out of date food',
    ],
  },
  {
    name: 'Chilled storage',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.CHILLED,
    action: {
      keep: ['Freeze'],
      use: ['Hot holding', 'Cold holding', 'Re-heating'],
    },
    hazzard: [
      'Contamination with food poisoning bacteria, physical and chemical contaminants',
    ],
    control: ['Separation of non-RTE and RTE foods', 'Covering of foods'],
    procedure: ['Observation'],
    frequency: ['During the day'],
    limits: ['Absence of contamination'],
    correctiveActions: ['Discard contaminated food'],
  },
  {
    name: 'Frozen storage',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.FROZEN,
    action: RECIPE_ACTIONS,
    hazzard: ['Growth of bacteria'],
    control: [
      'Stored in freezer at temperatures thast inhibit bacterial growth',
    ],
    procedure: ['Freezer temperature recorded'],
    frequency: ['Twice a day'],
    limits: [
      'At or below -18ºC',
      'Ice-cream in a service freezer can be held at -12ºC for no longer than a month and do not must rise above -8ºC',
    ],
    correctiveActions: [
      'Temperature adjusted',
      'Soft frozen food to be discarted',
    ],
  },
  {
    name: 'Dry goods storage',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.DRY,
    action: RECIPE_ACTIONS,
    hazzard: [
      'Contamination by spoilage bacteria, chemicals, pests and physicals contaminants',
    ],
    control: ['Food covered during the storage'],
    procedure: ['Observation'],
    frequency: ['Daily'],
    limits: ['Absence of contamination', 'All food covered'],
    correctiveActions: ['Discard contaminated or infested food'],
  },
  {
    name: 'Defrosting',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.FROZEN,
    action: {
      keep: ['Cooling'],
      use: ['Hot holding', 'Cold holding'],
    },
    hazzard: ['Growth of food poisoning bacteria in a high risk foods'],
    control: [
      'Defrosting of food under temperature controlled conditions (i.e. in the fridge)',
    ],
    procedure: ['Temperatures checked of chilled storage'],
    frequency: ['Twice a day'],
    limits: ['Defrosted at 8ºC (or 12ºC if defrosting fridge aviable)'],
    correctiveActions: [
      'Fridge adjusted',
      'Food mooved to another fridge',
      'Discard any food >8ºC for longer than 4 hours',
    ],
  },
  {
    name: 'Defrosting',
    step: HACCP_STEPS.PRE_PREPARATION,
    ingredientsStatus: INGREDIENTS_STATUS.FROZEN,
    action: {
      keep: ['Cooling'],
      use: ['Hot holding', 'Cold holding'],
    },
    hazzard: [
      'Contamination with food poisoning bacteria, physical and chemical contaminants',
    ],
    control: ['Separation of non-RTE and RTE foods', 'Covering foods'],
    procedure: ['Visual inspections'],
    frequency: ['During the day'],
    limits: ['Absence of contamination'],
    correctiveActions: ['Discard contaminated or infested food'],
  },
  {
    name: 'Preparation',
    step: HACCP_STEPS.PREPARATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: RECIPE_ACTIONS,
    hazzard: [
      'Growth of food poisoning bacteria in high-risk foods left at ambient',
    ],
    control: ['Restrict time high risk foods left at ambient'],
    procedure: ['Observation'],
    frequency: ['During the day'],
    limits: ['Max time room temperature =2 hours'],
    correctiveActions: [
      'Discard high-risk food left at room temperature for more than 2 hours',
    ],
  },
  {
    name: 'Preparation',
    step: HACCP_STEPS.PREPARATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: RECIPE_ACTIONS,
    hazzard: ['Contamination of high-risk food with food poisoning bacteria'],
    control: [
      'Separation of non-RTE and RTE activities by equipment and desinfection',
    ],
    procedure: ['Visual checks'],
    frequency: ['During the day'],
    limits: ['Absence of contamination'],
    correctiveActions: ['Contaminated food discarted'],
  },
  {
    name: 'Cooking',
    step: HACCP_STEPS.PREPARATION,
    ingredientsStatus: [INGREDIENTS_STATUS.FROZEN, INGREDIENTS_STATUS.DRY],
    action: RECIPE_ACTIONS,
    hazzard: ['Survival of food poisoning bacteria, spores and toxins'],
    control: [
      'Thorough cooking to specified temperature for the set length of time',
    ],
    procedure: ['Proving of food'],
    frequency: ['Every batch'],
    limits: [
      'Core temperature:',
      '*70ºC for 2 minutes',
      '*75oC for 30 seconds',
    ],
    correctiveActions: ['Cooked until specified temperature achieved'],
  },
  {
    name: 'Cooling',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: INGREDIENTS_STATUS.FROZEN,
    action: {
      keep: ['Cooling'],
      use: ['Cold holding'],
    },
    hazzard: ['Growth of surviving bacteria', 'Germination of spores'],
    control: ['Rapid cooling'],
    procedure: ['Probing of food and recording times and temperatures'],
    frequency: ['Every batch of high risk food'],
    limits: [
      'Blast chiller: Below 8ºC within 1 hour and 30 minutes',
      'Ambient temp: Refrigerated after 1 & 1/2 hours cooling at ambient',
    ],
    correctiveActions: [
      'Blast chiller adjusted',
      'Cook/chill smaller quantities',
      'Discard food cooled too slowly',
    ],
  },
  {
    name: 'Hot Holding',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: {
      use: ['Hot holding'],
    },
    hazzard: ['Growth of food poisoning bacteria'],
    control: ['Food held hot'],
    procedure: ['Proving of food'],
    frequency: ['Every service'],
    limits: ['At or above 63ºC'],
    correctiveActions: [
      'Temperature of hot holding equipment adjusted',
      'Discard any food below 63ºC for 2 hours',
    ],
  },
  {
    name: 'Hot Holding',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: {
      use: ['Hot holding'],
    },
    hazzard: [
      'Contamination of high risk food with food poisoning bacteria, physical or chemical contaminants',
    ],
    control: ['Protected from contamination - covers, screens'],
    procedure: ['Visual checks'],
    frequency: ['During the day'],
    limits: ['Absence of contamination'],
    correctiveActions: ['Contaminated food discarted'],
  },
  {
    name: 'Re-heating',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: {
      use: ['Hot holding', 'Re-heating'],
    },
    hazzard: ['Survival of food poisoning bacteria'],
    control: ['Thorough cooking'],
    procedure: ['Probing food'],
    frequency: ['Every batch'],
    limits: [
      'Core temperature of:',
      '70ºC for 2 minutes',
      '75ºC for 30 seconds',
    ],
    correctiveActions: ['Reaheat until specific temperature achived'],
  },
  {
    name: 'Display Cold',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: {
      use: ['Cold holding'],
    },
    hazzard: ['Growth of food poisoning bacteria in a high risk food'],
    control: ['Food held under chilled conditions'],
    procedure: ['Proving of food'],
    frequency: ['Every service'],
    limits: ['At or below 8ºC'],
    correctiveActions: [
      'Temperature of chilled holding unit adjusted',
      'Discard any food >8ºC for longer than 4 hours',
    ],
  },
  {
    name: 'Display Cold',
    step: HACCP_STEPS.FINALIZATION,
    ingredientsStatus: Object.values(INGREDIENTS_STATUS),
    action: {
      use: ['Cold holding'],
    },
    hazzard: [
      'Contamination of high risk food with food poisoning bacteria, physical or chemical contamination',
    ],
    control: ['Protected form contamination - covers,screens'],
    procedure: ['Visual checks'],
    frequency: ['During the day'],
    limits: ['Absence of contamination'],
    correctiveActions: ['Contaminated food discarted'],
  },
];

module.exports = haccps;
