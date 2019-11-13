import * as React from 'react';

import WrappedComponent from '~/components/specifics/workout/Workout';
import { Timer, Workout, WorkoutParams } from '~/types';
import { isToday } from '~/utils';

export type Props = {
  isLoading: boolean;
  workout?: Workout;
  onUpdate: (params: WorkoutParams) => void;
};

type State = {
  progress: number;
  status: Timer;
  timer?: number;
  isCompleted: boolean;
};

class WorkoutTimer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      progress: props.workout ? props.workout.menu : 0,
      status: Timer.standby,
      timer: undefined,
      isCompleted: props.workout ? props.workout.isCompleted : false,
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
    const { onUpdate, workout } = this.props;
    const { isCompleted } = this.state;

    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    if (!!workout && isToday(workout.date) && isCompleted) {
      onUpdate({ id: workout.id, isCompleted });
    }
  }

  public handleReset(): void {
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    this.setState({
      timer: undefined,
      progress: this.props.workout ? this.props.workout.menu : 0,
      status: Timer.standby,
    });
  }

  public handleStart(): void {
    this.setState({ status: Timer.start });
    const timer = window.setInterval(() => this.countDown(), 1000);
    this.setState({ timer });
  }

  public handleTogglePause(): void {
    const { status } = this.state;
    if (status === Timer.pause) {
      this.setState({ status: Timer.restart });
    } else {
      this.setState({ status: Timer.pause });
    }
  }

  private countDown(): void {
    const { progress, status } = this.state;
    if (status === Timer.pause) return;

    if (progress <= 0) {
      this.finish();
    } else {
      this.setState({ progress: progress - 1 });
    }
  }

  private finish = (): void => {
    const { workout } = this.props;

    if (!workout) return;

    if (this.state.timer) {
      window.clearInterval(this.state.timer);
    }

    this.setState({
      status: Timer.finish,
      timer: undefined,
      isCompleted: isToday(workout.date) ? true : this.state.isCompleted,
    });
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
      workout: this.props.workout
        ? {
            ...this.props.workout,
            isCompleted: this.state.isCompleted,
          }
        : this.props.workout,
    };

    return <WrappedComponent {...props} />;
  }
}

export default WorkoutTimer;
