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

// In tempStateReducer > filterReducer
export type ReduxFilterEntity<FilterKey extends string = string> = Record<FilterKey, FilterState> &
  DateFilterState;

type DateFilterState = {
  FROM_DATE?: FilterState;
  TO_DATE?: FilterState;
  VALID_ON?: FilterState;
};

export interface FilterState {
  [filterOptionId: string]: /* e.g. ABANDONED, COMPLETED */ {
    active?: boolean;
    label?: string /* e.g. 'Abandoned', 'Completed */;
    [key: string]: any;
  };
}

export type ContainerOnChangeCallback = (filterKey: string, filterState: FilterState) => void;

// Only typing the properties relevant to filtering on location; there are no .ts files yet related to this entity
export interface Location {
  name: string;
  location_id: string;

  [key: string]: any;
}
