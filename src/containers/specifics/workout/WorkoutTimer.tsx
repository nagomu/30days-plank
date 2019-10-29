import * as React from 'react';

import WrappedComponent from '~/components/specifics/workout/Workout';
import { Status, UpdateWorkoutParams, Workout } from '~/store/workout';

export type Props = {
  isLoading: boolean;
  workout?: Workout;
  onUpdate: (params: UpdateWorkoutParams) => void;
};

type State = {
  progress: number;
  status: Status;
  timer?: number;
};

class WorkoutTimer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      progress: props.workout ? props.workout.menu : 0,
      status: Status.standby,
      timer: undefined,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleTogglePause = this.handleTogglePause.bind(this);
    this.countDown = this.countDown.bind(this);
    this.finish = this.finish.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (!prevProps.workout && this.props.workout) {
      this.setState({ progress: this.props.workout.menu });
    }
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
      progress: this.props.workout ? this.props.workout.menu : 0,
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
    const { workout, onUpdate } = this.props;

    if (!workout) return;

    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    this.setState({
      status: Status.finish,
      timer: undefined,
    });

    const formatDate = (date: number): string =>
      new Intl.DateTimeFormat('en-US').format(date);
    const today = workout.scheduledDate.toDate().getTime();

    if (formatDate(Date.now()) === formatDate(today)) {
      onUpdate({ id: workout.id, isCompleted: true });
    }

    return;
  };

  render(): ReturnType<typeof WrappedComponent> {
    const props = {
      isLoading: this.props.isLoading,
      onReset: this.handleReset,
      onStart: this.handleStart,
      onTogglePause: this.handleTogglePause,
      pathname: '/dashboard',
      progress: this.state.progress,
      status: this.state.status,
      workout: this.props.workout,
    };

    return <WrappedComponent {...props} />;
  }
}

export default WorkoutTimer;
