import * as React from 'react';
import { connect } from 'react-redux';

import WrappedComponent from '~/components/specifics/workout/Workout';
import { AppState } from '~/store';
import { Status } from '~/store/workout';

// TODO
// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type Props = ReturnType<typeof mapStateToProps>;

export type State = {
  progress: number;
  status: Status;
  timer?: number;
};

export type HandlerProps = {
  onStart: () => void;
  onTogglePause: () => void;
  onReset: () => void;
};

class Workout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      progress: this.props.menu,
      status: Status.standby,
      timer: undefined,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleTogglePause = this.handleTogglePause.bind(this);
    this.countDown = this.countDown.bind(this);
    this.finish = this.finish.bind(this);
  }

  public componentWillUnmount(): void {
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }
    return;
  }

  public handleReset(): void {
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    this.setState({
      timer: undefined,
      progress: this.props.menu,
      status: Status.standby,
    });
    return;
  }

  public handleStart(): void {
    this.setState({ status: Status.start });
    const timer = window.setInterval(() => this.countDown(), 1000);
    this.setState({ timer });
    return;
  }

  public handleTogglePause(): void {
    const { status } = this.state;
    if (status === Status.pause) {
      this.setState({ status: Status.restart });
    } else {
      this.setState({ status: Status.pause });
    }
    return;
  }

  private countDown(): void {
    const { progress, status } = this.state;
    if (status === Status.pause) return;

    if (progress <= 0) {
      this.finish();
    } else {
      this.setState({ progress: progress - 1 });
    }

    return;
  }

  private finish = (): void => {
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    this.setState({
      status: Status.finish,
      timer: undefined,
    });

    const formatDate = (date: number): string =>
      new Intl.DateTimeFormat('en-US').format(date);
    const today = this.props.scheduledDate.toDate().getTime();

    if (formatDate(Date.now()) === formatDate(today)) {
      // TODO: Update isCompleted if today is the scheduled date
    }

    return;
  };

  render(): ReturnType<typeof WrappedComponent> {
    const props = {
      ...this.props,
      pathname: '/dashboard',
      progress: this.state.progress,
      status: this.state.status,
      onReset: this.handleReset,
      onStart: this.handleStart,
      onTogglePause: this.handleTogglePause,
    };

    return <WrappedComponent {...props} />;
  }
}

// TODO
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => ({
  isLoading: state.workout.isLoading,
  ...state.workout.workout,
});

export default connect(mapStateToProps)(Workout);
