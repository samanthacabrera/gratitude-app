import React from 'react';

const BackgroundIframe = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <div style={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
        <iframe
          src="https://giphy.com/embed/KH032Trb531MHWPUgj"
          width="100%"
          height="100%"
                  style={{
                      position: 'absolute',
                      bottom: 0,
          }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default BackgroundIframe;
