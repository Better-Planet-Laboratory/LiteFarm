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

import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styles from './styles.module.scss';
import { Main } from '../../components/Typography';
import { PureTileDashboard } from '../../components/TileDashboard';
import { componentDecorators } from '../Pages/config/Decorators';
import { ReactComponent as AlpacaIcon } from '../../assets/images/animals/alpaca-icon-btn-list.svg';
import { ReactComponent as CattleIcon } from '../../assets/images/animals/cattle-icon-btn-list.svg';
import { ReactComponent as ChickenIcon } from '../../assets/images/animals/chicken-icon-btn-list.svg';
import { ReactComponent as GoatIcon } from '../../assets/images/animals/goat-icon-btn-list.svg';
import { ReactComponent as PigIcon } from '../../assets/images/animals/pig-icon-btn-list.svg';
import { ReactComponent as RabbitIcon } from '../../assets/images/animals/rabbit-icon-btn-list.svg';
import { ReactComponent as SheepIcon } from '../../assets/images/animals/sheep-icon-btn-list.svg';

// https://storybook.js.org/docs/writing-stories/typescript
const meta: Meta<typeof PureTileDashboard> = {
  title: 'Components/PureTileDashboard',
  component: PureTileDashboard,
  decorators: [
    (Story) => (
      <ResizeWrapper>
        <Story />
      </ResizeWrapper>
    ),
    ...componentDecorators,
  ],
};
export default meta;

interface ResizeWrapperProps {
  children: ReactNode;
}

const ResizeWrapper = ({ children }: ResizeWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <Main className={styles.note}>Resize window to see mobile / desktop view</Main>
      {children}
    </div>
  );
};

type Story = StoryObj<typeof PureTileDashboard>;

const mockTiles = [
  {
    label: 'Goat',
    icon: <GoatIcon />,
    count: 6,
    onClick: () => console.log('Goat has been clicked!'),
  },
  {
    label: 'Chicken',
    icon: <ChickenIcon />,
    count: 40,
    onClick: () => console.log('Chicken has been clicked!'),
  },
  {
    label: 'Pig',
    icon: <PigIcon />,
    count: 20,
    onClick: () => console.log('Pig has been clicked!'),
  },
  {
    label: 'Cockatoo',
    icon: <ChickenIcon />,
    count: 2,
    onClick: () => console.log('Cockatoo has been clicked!'),
  },
  {
    label: 'Cow',
    icon: <CattleIcon />,
    count: 20,
    onClick: () => console.log('Cow has been clicked!'),
  },
  {
    label: 'Dog',
    icon: <CattleIcon />,
    count: 3,
    onClick: () => console.log('Dog has been clicked!'),
  },
  {
    label: 'Rabbit',
    icon: <RabbitIcon />,
    count: 24,
    onClick: () => console.log('Rabbit has been clicked!'),
  },
  {
    label: 'Hamster',
    icon: <RabbitIcon />,
    count: 1,
    onClick: () => console.log('Hamster has been clicked!'),
  },
  {
    label: 'Guinea Pig',
    icon: <RabbitIcon />,
    count: 20,
    onClick: () => console.log('Guinea pig has been clicked!'),
  },
  {
    label: 'Draft Horse',
    icon: <SheepIcon />,
    count: 1,
    onClick: () => console.log('Draft Horse has been clicked!'),
  },
  {
    label: 'Barn Cat',
    icon: <CattleIcon />,
    count: 3,
    onClick: () => console.log('Cat has been clicked!'),
  },
  {
    label: 'Tasmanian Devil',
    icon: <CattleIcon />,
    count: 3,
    onClick: () => console.log('Tasmanian Devil has been clicked!'),
  },
  {
    label: 'Alpaca',
    icon: <AlpacaIcon />,
    count: 3,
    onClick: () => console.log('Alpaca has been clicked!'),
  },
  {
    label: 'Sheep',
    icon: <SheepIcon />,
    count: 3,
    onClick: () => console.log('Sheep has been clicked!'),
  },
];

const sortedTiles = mockTiles.sort((a, b) => a.label.localeCompare(b.label));

export const Default: Story = {
  args: {
    countTiles: sortedTiles.slice(0, 5),
    dashboardTitle: 'Animal inventory',
    categoryLabel: 'Types',
  },
};

export const TwoTypes: Story = {
  args: {
    countTiles: sortedTiles.slice(0, 2),
    dashboardTitle: 'Animal inventory',
    categoryLabel: 'Types',
  },
};

export const SeveralTypes: Story = {
  args: {
    countTiles: sortedTiles.slice(0, 5),
    dashboardTitle: 'Animal inventory',
    categoryLabel: 'Types',
  },
};

export const ManyTypes: Story = {
  args: {
    countTiles: sortedTiles,
    dashboardTitle: 'Animal inventory',
    categoryLabel: 'Types',
  },
};
