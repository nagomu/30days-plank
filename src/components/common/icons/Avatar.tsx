import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';
import { useLayout } from '~/hooks/common/useLayout';
import rgba from '~/utils/rgba';

const Container = styled.div`
  display: block;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const Button = Container.withComponent('button');

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid ${rgba('#212121', 0.3)};
  border-radius: 999em;
`;

const Logo = styled(Icon)`
  width: 100%;
  height: 100%;
  color: #1e88e5;
`;

type Props = {
  asButton: boolean;
  photoURL?: string;
};

const Avatar: React.FC<Props> = ({ asButton, photoURL }) => {
  const { onToggleNav } = useLayout();

  const ImageOrLogo = (): JSX.Element => {
    if (photoURL) return <Image src={photoURL} alt="" role="presentation" />;
    return <Logo name="logo" role="presentation" />;
  };

  return (
    <>
      {asButton ? (
        <Button aria-label="Toggle Nav" onClick={onToggleNav} type="button">
          {ImageOrLogo()}
        </Button>
      ) : (
        <Container>{ImageOrLogo()}</Container>
      )}
    </>
  );
};

export default Avatar;
