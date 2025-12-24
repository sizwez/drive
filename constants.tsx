
import { RoadSign, QuizQuestion } from './types';

export const ROAD_SIGNS: RoadSign[] = [
  // Regulatory - Command
  {
    id: 'R1',
    code: 'R1',
    name: 'Stop',
    description: 'Stop completely before the stop line. Only move when safe.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/South_African_road_sign_R1.svg/200px-South_African_road_sign_R1.svg.png',
    type: 'Regulatory'
  },
  {
    id: 'R2',
    code: 'R2',
    name: 'Yield',
    description: 'Give way to traffic approaching from either side or from the opposite direction.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/South_African_road_sign_R2.svg/200px-South_African_road_sign_R2.svg.png',
    type: 'Regulatory'
  },
  {
    id: 'R103',
    code: 'R103',
    name: 'Keep Left',
    description: 'Drive to the left of this sign.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/South_African_road_sign_R103.svg/200px-South_African_road_sign_R103.svg.png',
    type: 'Regulatory'
  },
  {
    id: 'R101-120',
    code: 'R101',
    name: 'Speed Limit 120',
    description: 'Maximum speed limit is 120 km/h.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/South_African_road_sign_R101-120.svg/200px-South_African_road_sign_R101-120.svg.png',
    type: 'Regulatory'
  },
  {
    id: 'R201',
    code: 'R201',
    name: 'No Entry',
    description: 'No vehicles are allowed to enter the road beyond this sign.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/South_African_road_sign_R201.svg/200px-South_African_road_sign_R201.svg.png',
    type: 'Regulatory'
  },
  {
    id: 'R209',
    code: 'R209',
    name: 'No Left Turn',
    description: 'Turning left at the intersection ahead is prohibited.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/South_African_road_sign_R209.svg/200px-South_African_road_sign_R209.svg.png',
    type: 'Regulatory'
  },
  
  // Warning Signs
  {
    id: 'W101',
    code: 'W101',
    name: 'Sharp Curve Right',
    description: 'Warns of a sharp curve to the right ahead.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/South_African_road_sign_W101.svg/200px-South_African_road_sign_W101.svg.png',
    type: 'Warning'
  },
  {
    id: 'W202',
    code: 'W202',
    name: 'Crossroads Ahead',
    description: 'A four-way intersection or crossroads is ahead.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/South_African_road_sign_W202.svg/200px-South_African_road_sign_W202.svg.png',
    type: 'Warning'
  },
  {
    id: 'W306',
    code: 'W306',
    name: 'Pedestrian Crossing',
    description: 'Warns of a pedestrian crossing ahead.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/South_African_road_sign_W306.svg/200px-South_African_road_sign_W306.svg.png',
    type: 'Warning'
  },
  {
    id: 'W332',
    code: 'W332',
    name: 'Slippery Road',
    description: 'The road ahead may be slippery when wet.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/South_African_road_sign_W332.svg/200px-South_African_road_sign_W332.svg.png',
    type: 'Warning'
  },

  // Information & Guidance
  {
    id: 'IN1',
    code: 'IN1',
    name: 'Information Center',
    description: 'Indicates the presence of a tourist information center.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/South_African_road_sign_IN1.svg/200px-South_African_road_sign_IN1.svg.png',
    type: 'Information'
  }
];

export const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Rules',
    question: 'What is the correct action when approaching a flashing red traffic light?',
    options: [
      'Slow down and proceed if clear',
      'Stop and only proceed when it turns green',
      'Stop and proceed only when it is safe to do so',
      'It indicates the light is about to turn green'
    ],
    correctAnswer: 2,
    explanation: 'A flashing red light must be treated as a stop sign. You must stop and proceed only when safe.'
  },
  {
    id: 'q2',
    category: 'Signs',
    question: 'What does the R201 "No Entry" sign signify?',
    options: [
      'No parking allowed',
      'No vehicles allowed to enter from this side',
      'Road is closed for construction',
      'One way traffic coming towards you'
    ],
    correctAnswer: 1,
    explanation: 'R201 No Entry means no vehicles are permitted to enter the road beyond the sign.'
  },
  {
    id: 'q3',
    category: 'Controls',
    question: 'When starting a vehicle, which control should be depressed to ensure the engine is disconnected from the transmission?',
    options: [
      'Accelerator',
      'Brake pedal',
      'Clutch pedal',
      'Handbrake'
    ],
    correctAnswer: 2,
    explanation: 'Depressing the clutch pedal disconnects the engine from the gearbox, preventing the car from jerking or stalling if in gear.'
  },
  {
    id: 'q4',
    category: 'Rules',
    question: 'On a multi-lane road, when are you allowed to pass a vehicle on its left-hand side?',
    options: [
      'Whenever the left lane is empty',
      'If the vehicle in front is turning right and there is space',
      'Never, it is illegal in SA',
      'Only if you are speeding'
    ],
    correctAnswer: 1,
    explanation: 'You may pass on the left if the vehicle ahead is signaling and turning right, provided there is enough space and no obstruction.'
  },
  {
    id: 'q5',
    category: 'Signs',
    question: 'Which sign indicates that you must drive at a speed of at least 60 km/h?',
    options: [
      'A circular sign with a red border and "60"',
      'A triangular sign with "60"',
      'A circular blue sign with "60" in white',
      'A rectangular green sign with "60"'
    ],
    correctAnswer: 2,
    explanation: 'Minimum speed limits are indicated by a circular blue sign (Regulatory) with the speed in white.'
  }
];
