import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Screen from '~/components/common/layouts/Screen';
import SmallScreen from '~/components/common/layouts/SmallScreen';
import { AppState } from '~/store';
import { AuthActions, AuthState } from '~/store/auth';
import { toggleLayout } from '~/store/layout';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const mapStateToProps = (state: AppState) => ({ ...state.layout });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleLayout: (open: boolean) => dispatch(toggleLayout(open)),
});
/* eslint-enable */

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  children: React.ReactNode;
};
export type Props = OwnProps &
  Pick<AuthActions, 'onSignOut'> &
  AuthState &
  StateProps &
  DispatchProps;

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.changeLayout = this.changeLayout.bind(this);
  }

  public componentDidMount(): void {
    this.changeLayout();
    window.addEventListener('resize', this.changeLayout, false);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.changeLayout, false);
  }

  private changeLayout(): void {
    const { isSmallScreen, toggleLayout } = this.props;

    const matches = window.matchMedia('(max-width: 480px)').matches;
    if (isSmallScreen === matches) return;

    toggleLayout(matches);
  }

  public render(): ReturnType<typeof Screen | typeof SmallScreen> {
    return this.props.isSmallScreen ? (
      <SmallScreen {...this.props} />
    ) : (
      <Screen {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
