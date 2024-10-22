/*
 *  Copyright 2024 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import Model from './baseFormatModel.js';
import TaskModel from '../models/taskModel.js';
import AnimalModel from '../models/animalModel.js';

class AnimalMovementTaskAnimalRelationshipModel extends Model {
  static get tableName() {
    return 'animal_movement_task_animal_relationship';
  }

  static get idColumn() {
    return ['task_id', 'animal_id'];
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['task_id', 'animal_id'],
      properties: {
        task_id: { type: 'integer' },
        animal_id: { type: 'integer' },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    return {
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaskModel,
        join: {
          from: 'animal_movement_task_animal_relationship.task_id',
          to: 'task.task_id',
        },
      },
      animal: {
        relation: Model.BelongsToOneRelation,
        modelClass: AnimalModel,
        join: {
          from: 'animal_movement_task_animal_relationship.animal_id',
          to: 'animal.id',
        },
      },
    };
  }
}

export default AnimalMovementTaskAnimalRelationshipModel;
