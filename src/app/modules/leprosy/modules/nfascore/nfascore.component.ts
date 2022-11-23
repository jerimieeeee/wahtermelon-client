import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfascore',
  templateUrl: './nfascore.component.html',
  styleUrls: ['./nfascore.component.scss']
})
export class NfascoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  UD = {
    "UD":
    {
      "2022-08-25":
      {
        "right_hand": {
          "leprosy_id": 1,
          "patient_id": 30064,
          "user_id": 57,
          "examination_type": "UD",
          "examination_date": "2022-08-25",
          "nerve_parts": null,
          "thumb": "Y",
          "index_tip": "Y",
          "index_base": "Y",
          "pinky_tip": "Y",
          "pinky_base": "N",
          "palm": "Y"
        },
        "left_hand": {
          "leprosy_id": 1,
          "patient_id": 30064,
          "user_id": 57,
          "examination_type": "UD",
          "examination_date": "2022-08-25",
          "nerve_parts": null,
          "thumb": "N",
          "index_tip": "Y",
          "index_base": "Y",
          "pinky_tip": "Y",
          "pinky_base": "Y",
          "palm": "Y"
        },
        "foot_right": {
          "leprosy_id": 1,
          "patient_id": 30064,
          "user_id": 57,
          "examination_type": "UD",
          "examination_date": "2022-08-25",
          "nerve_parts": null,
          "bigtoe_tip": "Y",
          "bigtoe_base": "N",
          "smalltoe_tip": "Y",
          "smalltoe_base": "Y",
          "sole": "Y"
        },
        "foot_left": {
          "leprosy_id": 1,
          "patient_id": 30064,
          "user_id": 57,
          "examination_type": "UD",
          "examination_date": "2022-08-25",
          "nerve_parts": null,
          "bigtoe_tip": "Y",
          "bigtoe_base": "Y",
          "smalltoe_tip": "Y",
          "smalltoe_base": "Y",
          "sole": "Y"
        }
      }
    }, "current_nfa":
    {
      "right_hand": { "leprosy_id": 1, "patient_id": 30064, "user_id": 57, "examination_type": "UD", "examination_date": "2022-08-25", "nerve_parts": null, "thumb": "Y", "index_tip": "Y", "index_base": "Y", "pinky_tip": "Y", "pinky_base": "N", "palm": "Y" },
      "left_hand": { "leprosy_id": 1, "patient_id": 30064, "user_id": 57, "examination_type": "UD", "examination_date": "2022-08-25", "nerve_parts": null, "thumb": "N", "index_tip": "Y", "index_base": "Y", "pinky_tip": "Y", "pinky_base": "Y", "palm": "Y" },
      "foot_right": { "leprosy_id": 1, "patient_id": 30064, "user_id": 57, "examination_type": "UD", "examination_date": "2022-08-25", "nerve_parts": null, "bigtoe_tip": "Y", "bigtoe_base": "N", "smalltoe_tip": "Y", "smalltoe_base": "Y", "sole": "Y" },
      "foot_left": { "leprosy_id": 1, "patient_id": 30064, "user_id": 57, "examination_type": "UD", "examination_date": "2022-08-25", "nerve_parts": null, "bigtoe_tip": "Y", "bigtoe_base": "Y", "smalltoe_tip": "Y", "smalltoe_base": "Y", "sole": "Y" }
    }
  }
}
