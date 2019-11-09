import styled from '@emotion/styled';
import * as React from 'react';

// import { NavLink } from 'react-router-dom';
import Icon from '~/components/common/icons/Icon';
import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import { Archive } from '~/types';
import { isEmptyArray, rgba } from '~/utils';

const List = styled.ul`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #e0e0e0;
  list-style: none;
`;

const Menu = styled.li`
  display: block;
  margin: 0;
  padding: 0;
  border-top: 1px solid #e0e0e0;
  color: #212121;

  &:first-of-type {
    border-top: 0;
  }
`;

/*
const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
  color: ${rgba('#212121', 0.6)};
  font-size: 12px;
  text-decoration: none;
`;
*/
const Link = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
  color: ${rgba('#212121', 0.6)};
  font-size: 12px;
  text-decoration: none;
`;

const Completed = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  min-height: 48px;
  margin: 0;
  padding: 12px 8px 12px 16px;
  color: #e0e0e0;
  font-size: 24px;

  &.isCompleted {
    color: #4caf50;
  }
`;

const Title = styled.span`
  display: inline-block;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
`;

type Props = {
  archives?: Archive[];
  isLoading: boolean;
};

const Archives: React.FC<Props> = ({ archives, isLoading }) => (
  <DrawerScreen title="Archives" pathname="/dashboard" isLoading={isLoading}>
    {!!archives && !isEmptyArray(archives) ? (
      <List>
        {archives.map((archive: Archive) => (
          <Menu key={archive.id}>
            <Link>
              <Completed
                className={archive.achievementRate >= 80 ? 'isCompleted' : ''}
              >
                <Icon name="done" />
              </Completed>
              <Title>{archive.title}</Title>
              {` - ${archive.achievementRate}%`}
            </Link>
          </Menu>
        ))}
      </List>
    ) : (
      <>
        {/* TODO: Replace tp empty component */}
        <p style={{ padding: '0 16px' }}>There is no archive yet.</p>
      </>
    )}
  </DrawerScreen>
);

export default Archives;
