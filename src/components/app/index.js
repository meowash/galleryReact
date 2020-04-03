import React from 'react';

import UploadImage from '../upload-image'
import ErrorBoundary from '../Error-boundry'

function App() {
  return (
    <>
      <ErrorBoundary>
        <UploadImage />
      </ErrorBoundary>
    </>
  );
}

export default App;