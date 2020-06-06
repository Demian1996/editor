import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ActionCreator } from '../store/actionCreator';

/**
 * 将数据流和action绑定
 *
 * @param {Observable<any>} stream$
 * @param {ActionCreator} actionCreator
 */
function useDispatchAction(stream$: Observable<any>, actionCreator: ActionCreator) {
  const dispatch = useDispatch();
  useEffect(() => {
    const subscription = stream$.pipe(map(actionCreator)).subscribe((a: any) => {
      dispatch(a);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, actionCreator, stream$]);
}

export default useDispatchAction;
