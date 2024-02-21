import { Model, transaction } from 'objection';
import AnimalModel from '../models/animalModel.js';
import baseController from './baseController.js';
import DefaultAnimalBreedModel from '../models/defaultAnimalBreedModel.js';
import CustomAnimalBreedModel from '../models/customAnimalBreedModel.js';
import DefaultAnimalTypeModel from '../models/defaultAnimalTypeModel.js';
import CustomAnimalTypeModel from '../models/customAnimalTypeModel.js';

const animalController = {
  getFarmAnimals() {
    return async (req, res) => {
      try {
        const { farm_id } = req.headers;
        const rows = await AnimalModel.query().where({ farm_id }).whereNotDeleted();
        return res.status(200).send(rows);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error,
        });
      }
    };
  },

  addAnimals() {
    return async (req, res) => {
      const trx = await transaction.start(Model.knex());

      try {
        const { farm_id } = req.headers;
        const result = [];

        if (!Array.isArray(req.body)) {
          await trx.rollback();
          return res.status(400).send('Request body should be an array');
        }

        for (const animal of req.body) {
          if (!animal.identifier && !animal.name) {
            await trx.rollback();
            return res.status(400).send('Should send either animal name or identifier');
          }

          if (!animal.default_type_id && !animal.custom_type_id) {
            await trx.rollback();
            return res.status(400).send('Should send either default_type_id or custom_type_id');
          }

          if (animal.default_type_id && animal.custom_type_id) {
            await trx.rollback();
            return res
              .status(400)
              .send('Should only send either default_type_id or custom_type_id');
          }

          if (animal.default_breed_id && animal.custom_breed_id) {
            await trx.rollback();
            return res
              .status(400)
              .send('Should only send either default_breed_id or custom_breed_id');
          }

          if (animal.default_type_id) {
            const defaultType = await DefaultAnimalTypeModel.query().findById(
              animal.default_type_id,
            );

            if (!defaultType) {
              await trx.rollback();
              return res.status(400).send('default_type_id has invalid value');
            }
          }

          if (animal.custom_type_id) {
            const customType = await CustomAnimalTypeModel.query().findById(animal.custom_type_id);

            if (!customType || customType.farm_id !== farm_id) {
              await trx.rollback();
              return res.status(400).send('custom_type_id has invalid value');
            }
          }

          if (animal.default_breed_id) {
            const defaultBreed = await DefaultAnimalBreedModel.query().findById(
              animal.default_breed_id,
            );

            if (!defaultBreed || defaultBreed.default_type_id !== animal.default_type_id) {
              await trx.rollback();
              return res.status(400).send('default_breed_id has invalid value');
            }
          }

          if (animal.custom_breed_id) {
            const customBreed = await CustomAnimalBreedModel.query()
              .whereNotDeleted()
              .findById(animal.custom_breed_id);

            if (!customBreed || customBreed.farm_id !== farm_id) {
              await trx.rollback();
              return res.status(400).send('custom_breed_id has invalid value');
            }

            if (
              customBreed.default_type_id &&
              customBreed.default_type_id !== animal.default_type_id
            ) {
              await trx.rollback();
              return res.status(400).send('custom_breed_id has invalid value');
            }

            if (
              customBreed.custom_type_id &&
              customBreed.custom_type_id !== animal.custom_type_id
            ) {
              await trx.rollback();
              return res.status(400).send('custom_breed_id has invalid value');
            }
          }

          // Remove farm_id if it happens to be set in animal object since it should be obtained from header
          delete animal.farm_id;

          const individualAnimalResult = await baseController.postWithResponse(
            AnimalModel,
            { ...animal, farm_id },
            req,
            { trx },
          );

          result.push(individualAnimalResult);
        }

        await trx.commit();
        return res.status(201).send(result);
      } catch (error) {
        console.error(error);
        await trx.rollback();
        return res.status(500).json({
          error,
        });
      }
    };
  },

  editAnimals() {
    return async (req, res) => {
      const trx = await transaction.start(Model.knex());

      try {
        const { farm_id } = req.headers;

        if (!Array.isArray(req.body)) {
          await trx.rollback();
          return res.status(400).send('Request body should be an array');
        }

        // Check that all animals exist and belong to the farm
        // Done in its own loop to provide a list of all invalid ids
        const sentAnimalIds = req.body.map(({ id }) => id);
        const invalidAnimalIds = [];

        for (const id of sentAnimalIds) {
          if (!id) {
            await trx.rollback();
            return res.status(400).send('Must send animal id');
          }

          const animal = await AnimalModel.query(trx)
            .findById(id)
            .where({ farm_id })
            .whereNotDeleted();

          if (!animal) {
            invalidAnimalIds.push(id);
          }
        }

        if (invalidAnimalIds.length) {
          await trx.rollback();
          return res.status(400).json({
            error: 'Invalid ids',
            invalidAnimalIds,
            message: 'Some animals do not exist or are not associated with the given farm.',
          });
        }

        // Update animals
        for (const animal of req.body) {
          await baseController.patch(
            AnimalModel,
            animal.id,
            {
              ...animal,
            },
            req,
            { trx },
          );
        }
        await trx.commit();
        return res.status(204);
      } catch (error) {
        console.error(error);
        await trx.rollback();
        return res.status(500).json({
          error,
        });
      }
    };
  },
};

export default animalController;
