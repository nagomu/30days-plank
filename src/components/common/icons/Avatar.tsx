import { styled } from 'linaria/react';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';
import { useLayout } from '~/hooks/common/useLayout';
import { User } from '~/types';
import { rgba } from '~/utils';

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
  user?: User;
};

const Avatar: React.FC<Props> = ({ asButton, user }) => {
  const { onToggleNav } = useLayout();
  const photoURL = user && user.photoURL;

  const ImageOrLogo = (): JSX.Element => {
    if (photoURL) return <Image src={photoURL} alt="" role="presentation" />;
    return <Logo name="logo" role="presentation" />;
  };

  return (
    <>
      {asButton ? (
        <Container
          as="button"
          aria-label="Toggle Nav"
          aria-disabled={!user}
          disabled={!user}
          onClick={onToggleNav}
          type="button"
        >
          {ImageOrLogo()}
        </Container>
      ) : (
        <Container>{ImageOrLogo()}</Container>
      )}
    </>
  );
};

export default Avatar;
