import React, { useEffect } from 'react';
import PureFarmSiteBoundary from '../../../../components/LocationDetailLayout/AreaDetails/FarmSiteBoundary';
import { editFarmSiteBoundaryLocation } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { measurementSelector } from '../../../userFarmSlice';
import useHookFormPersist from '../../../hooks/useHookFormPersist';
import { farmSiteBoundarySelector } from '../../../farmSiteBoundarySlice';
import {
  hookFormPersistSelector,
  setAreaDetailFormData,
} from '../../../hooks/useHookFormPersist/hookFormPersistSlice';
import { useLocationPageType } from '../../utils';

function EditFarmSiteBoundaryDetailForm({ history, match }) {
  const dispatch = useDispatch();
  const system = useSelector(measurementSelector);
  const submitForm = (data) => {
    isEditLocationPage &&
      dispatch(
        editFarmSiteBoundaryLocation({
          ...data,
          ...match.params,
          figure_id: farmSiteBoundary.figure_id,
        }),
      );
  };
  const farmSiteBoundary = useSelector(farmSiteBoundarySelector(match.params.location_id));
  const formData = useSelector(hookFormPersistSelector);
  useEffect(() => {
    dispatch(setAreaDetailFormData(farmSiteBoundary));
  }, []);
  const { isCreateLocationPage, isViewLocationPage, isEditLocationPage } = useLocationPageType(
    match,
  );
  return (
    <PureFarmSiteBoundary
      history={history}
      match={match}
      submitForm={submitForm}
      system={system}
      useHookFormPersist={useHookFormPersist}
      isEditLocationPage={isEditLocationPage}
      isViewLocationPage={isViewLocationPage}
    />
  );
}

export default EditFarmSiteBoundaryDetailForm;