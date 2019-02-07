// import { useContext, useEffect, useState } from 'react';
// import * as H from 'history';

// // @ts-ignore
// import { __RouterContext, RouteComponentProps, StaticContext } from 'react-router-dom';

// type VoidFunction = () => void;

// export function useForceUpdate(): VoidFunction {
//   const [ toggle, setState ] = useState<boolean>(true);
  
//   const forceUpdate: VoidFunction = (): void => {
//     setState(toggle);
//   };

//   return forceUpdate;
// };

// export function useRouter<T = {}, C = StaticContext, S = H.LocationState>(): RouteComponentProps<T,C,S> {
//   const forceUpdate: VoidFunction = useForceUpdate();
//   const routerContext: RouteComponentProps<T,C,S> = useContext(__RouterContext);

//   if (!routerContext) {
//     throw new Error('No react-router context.');
//   }

//   useEffect( () => routerContext.history.listen(forceUpdate), [ routerContext ] );
//   return routerContext;
// };
 