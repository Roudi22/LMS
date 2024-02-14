'use client';
import React, {FC, useState} from 'react';

interface PageProps {

} // 1. Define the props

const Page: FC<PageProps> = (props) => { // 2. Define the component
  const [state, setState] = useState(); // 3. Define the state

  return <div>Page</div>; // 4. Render the component
};

export default Page; // 5. Export the component

