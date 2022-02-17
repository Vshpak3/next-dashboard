import React from "react";
import { pollyLogo } from './polly-logo'
export const LogoIcon: React.FC = () => (
  <svg
    width="474"
    height="483"
    viewBox="0 0 474 483"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="474" height="483" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0"
          transform="translate(-0.00524789) scale(0.00212289)"
        />
      </pattern>
      <image
        id="image0"
        width="476"
        height="480"
        xlinkHref={pollyLogo}
      />
    </defs>
  </svg>
);
