import React from 'react';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<Component {...props} />);
    return (
      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <p>?#^#LOADING THE THINGS!#$$#</p>
      </div>
    );
  }
}
export default WithLoading;