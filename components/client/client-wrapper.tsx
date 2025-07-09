// 'use client';

// import queryClient from '@/api/queryClient';
// import { QueryClientProvider } from '@tanstack/react-query';
// import React, { JSX } from 'react';

// // Define component type for functional components
// type ComponentType = React.ComponentType;

// // Overload signatures
// function ClientWrapper(Component: ComponentType): ComponentType;
// function ClientWrapper(props: { children: React.ReactNode }): JSX.Element;

// // Implementation
// function ClientWrapper(arg: ComponentType | { children: React.ReactNode }): ComponentType | JSX.Element {
//   // Case 1: Called as a function with a component (e.g., ClientWrapper(LoginPage))
//   if (typeof arg === 'function') {
//     const Component = arg as ComponentType;
//     const WrappedComponent = (props: any) => (
//       <QueryClientProvider client={queryClient}>
//         <Component {...props} />
//       </QueryClientProvider>
//     );
//     // Preserve the original component's display name
//     WrappedComponent.displayName = `ClientWrapper(${arg.displayName || arg.name || 'Component'})`;
//     return WrappedComponent;
//   }

//   // Case 2: Used as a JSX component (e.g., <ClientWrapper>{children}</ClientWrapper>)
//   return (
//     <QueryClientProvider client={queryClient}>
//       {arg.children}
//     </QueryClientProvider>
//   );
// }

// export default ClientWrapper;

'use client';

import { axiosHomeInstance, axiosInstance } from '@/api/axios';
import { setupAxiosInterceptors } from '@/api/axios-setup';
import queryClient from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { JSX, useEffect } from 'react';

// Implementation
function ClientWrapper({children}: { children: React.ReactNode }):  JSX.Element {
  const router = useRouter();
  useEffect(()=>{
    setupAxiosInterceptors(router, axiosInstance);
    setupAxiosInterceptors(router, axiosHomeInstance);
  },[])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ClientWrapper;