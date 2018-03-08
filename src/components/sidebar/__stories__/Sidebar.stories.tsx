import React, { ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import type { SidebarProps } from '../Sidebar';
import Sidebar from '../Sidebar';
import Icon from '../../icon/Icon'
import type { SidebarItemProps } from '../SidebarItem';
import SidebarItem, { SidebarSectionSpacer } from '../SidebarItem';
import { enableAddons } from '@/utils/storybook-shared';
import {
  createAward,
  createMenu,
  createCalendar,
  createMail,
  createBolt,
  createBell,
  createPeople,
  createBlockGrid,
  createBlockSocial,
  createBlockText,
  createBookmark,
  createCheck
} from '@/assets/icons';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

// Logo

const Logo = (): ReactElement => (
  <Icon
    size='custom'
    content={createBlockSocial}
    className='text-purple-600 w-8 h-8 mx-2'
    viewBoxHeight={24}
    viewBoxWidth={24}
  />
)

// playground
const PlaygroundTemplate: Story<SidebarProps> = (props: SidebarProps) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(!props.isCollapsed)
  }, [props.isCollapsed])

  return (
    <div className='flex flex-col bg-dark-gray-600'>
      <div className='flex p-2 h-14'>
        <div className='!w-10 !h-10 p-2 cursor-pointer' onClick={() => setOpen(open => !open)}>
          <Icon
            content={createMenu}
            className='text-gray-50 !w-6 !h-6'
          />
        </div>
      </div>
      <div className="flex w-[800px] h-[800px] bg-white overflow-y-auto">
        <Sidebar {...props} isCollapsed={!open} className='w-[320px]'>
          <SidebarItem icon={createAward} onPress={action('press')}>
            Home
          </SidebarItem>
          <SidebarItem icon={createBookmark} onPress={action('press')}>
            Reports
          </SidebarItem>
          <SidebarItem icon={createBlockText} onPress={action('press')}>
            Library
          </SidebarItem>
          <SidebarItem icon={createCalendar} onPress={action('press')}>
            Calendar
          </SidebarItem>
          <SidebarItem icon={createBolt} onPress={action('press')}>
            Integrations
          </SidebarItem>
          <SidebarItem icon={createBlockGrid} onPress={action('press')}>
            Documents
          </SidebarItem>
          <SidebarSectionSpacer />
          <SidebarItem icon={createMail} onPress={action('press')} badge='3'>
            Messages
          </SidebarItem>
          <SidebarItem icon={createBell} onPress={action('press')} badge='6'>
            Notifications
          </SidebarItem>
          <SidebarItem icon={createCheck} onPress={action('press')}>
            Settings
          </SidebarItem>
          <SidebarItem icon={createPeople} onPress={action('press')}>
            Profile
          </SidebarItem>
        </Sidebar>
      </div>
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  logo: <Logo />
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);

const SidebarItemVariant = (): ReactElement => {
  return (
    <>
      <SidebarItem icon={createAward} _iconViewbox={24}>
        Item without badge
      </SidebarItem>
      <SidebarItem icon={createAward} _iconViewbox={24} badge='6'>
        Item with badge
      </SidebarItem>
      <SidebarItem icon={createAward} _iconViewbox={24} badge='11' onPress={action('press')}>
        Interactive item
      </SidebarItem>
      <SidebarItem icon={createAward} _iconViewbox={24} onPress={action('press')} isSelected>
        Selected item
      </SidebarItem>
    </>
  )
}

const SidebarVariant = (
  { title, size }: { title: string, size?: 'small' | 'medium' | 'large' }
): ReactElement => {
  return (
    <>
      <h2 className='text-body-lg-heavy mt-6 mb-2'>{title}</h2>
      <h3 className='text-body-md-heavy my-2'>Normal</h3>
      <Sidebar logo={<Logo />} size={size}>
        <SidebarItemVariant />
      </Sidebar>
      <h3 className='text-body-md-heavy my-2'>Dark mode</h3>
      <Sidebar logo={<Logo />} size={size} isDarkMode>
        <SidebarItemVariant />
      </Sidebar>
      <h3 className='text-body-md-heavy my-2'>Collapsed</h3>
      <Sidebar logo={<Logo />} size={size} isDarkMode isCollapsed>
        <SidebarItemVariant />
      </Sidebar>
    </>
  )
}
const ItemTemplate: Story<SidebarItemProps> = () => {
  return (
    <div>
      <SidebarVariant title='Small Sidebar' size='small' />
      <SidebarVariant title='Medium Sidebar' size='medium' />
      <SidebarVariant title='Large Sidebar' size='large' />
    </div>
  )
}

export const ItemExample = ItemTemplate.bind({})
ItemExample.args = {
  icon: createAward
}

const SidebarSpacerVariant = (
  { spacer, collapsed }: { spacer: boolean, collapsed?: boolean }
): ReactElement => {
  const defaultProps = {
    _iconViewbox: 24,
    onPress: action('press')
  }

  return (
    <>
      <Sidebar logo={<Logo />} isCollapsed={collapsed}>
        <SidebarItem icon={createAward} {...defaultProps}>
          Home
        </SidebarItem>
        <SidebarItem icon={createBookmark} {...defaultProps}>
          Reports
        </SidebarItem>
        {spacer && <SidebarSectionSpacer />}
        <SidebarItem icon={createMail} {...defaultProps} badge='3'>
          Messages
        </SidebarItem>
        <SidebarItem icon={createPeople} {...defaultProps}>
          Profile
        </SidebarItem>
      </Sidebar>
    </>
  )
}

const SpacerCompare = ({ collapsed }: { collapsed?: boolean }): ReactElement => (
  <div className={`flex justify-between w-[768px] h-full bg-white overflow-y-auto`}>
    <SidebarSpacerVariant spacer collapsed={collapsed} />
    <SidebarSpacerVariant spacer={false} collapsed={collapsed} />
  </div>
)

export const SectionSpacerExample = (): ReactElement => {
  return (
    <div>
      <h2 className='text-body-lg-heavy mt-6 mb-2'>Normal</h2>
      <div className='h-[400px]'>
        <SpacerCompare />
      </div>
      <h2 className='text-body-lg-heavy mt-6 mb-2'>Small Height(200px)</h2>
      <div className='h-[240px]'>
        <SpacerCompare />
      </div>
      <h2 className='text-body-lg-heavy mt-6 mb-2'>Collapsed</h2>
      <div className='h-[400px]'>
        <SpacerCompare collapsed />
      </div>
    </div>
  )
}
