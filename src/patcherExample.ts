import { applyPatchList, applyPatchObject } from '@d2api/manifest-patcher';

const obj1 = {
  DestinyNodeStepSummaryDefinition: {
    '19519556': {
      displayProperties: {
        description:
          'Jump while airborne to activate Glide and start an airborne drift with a strong initial boost of speed.',
        name: 'wrong', // name is wrong
      },
    },

    // 32651606 is missing

    '71216177': {
      displayProperties: {}, // displayProperties is empty
    },
  },
};

// prettier-ignore
const patches1: [string, string][] = [
  ['19519556.displayProperties.name',        'Burst Glide'],

  ['32651606.displayProperties.description', 'Dodge to perform a deft tumble, avoiding enemy attacks. Dodging near enemies fully recharges your Melee Ability.'],
  ['32651606.displayProperties.name',        "Gambler's Dodge"],

  ['71216177.displayProperties.description', ': After sprinting, leap into the air and use to slam into the ground and damage nearby targets.'],
  ['71216177.displayProperties.name',        'Ballistic Slam'],
];

applyPatchList(obj1, patches1);

console.log(JSON.stringify(obj1, null, 2));

const obj2 = {
  DestinyNodeStepSummaryDefinition: {
    '19519556': {
      displayProperties: {
        description:
          'Jump while airborne to activate Glide and start an airborne drift with a strong initial boost of speed.',
        name: 'wrong', // name is wrong
      },
    },

    // 32651606 is missing

    '71216177': {
      displayProperties: {}, // displayProperties is empty
    },
  },
};

// prettier-ignore
const patches2 = {
  "19519556": {
    "displayProperties": {
      "name": "Burst Glide"
    }
  },
  "32651606": {
    "displayProperties": {
      "description": "Dodge to perform a deft tumble, avoiding enemy attacks. Dodging near enemies fully recharges your Melee Ability.",
      "name": "Gambler's Dodge"
    }
  },
  "71216177": {
    "displayProperties": {
      "description": ": After sprinting, leap into the air and use to slam into the ground and damage nearby targets.",
      "name": "Ballistic Slam"
    }
  }
};

applyPatchObject(obj2, patches2);

console.log(JSON.stringify(obj2, null, 2));

console.log(JSON.stringify(obj1) === JSON.stringify(obj2));
