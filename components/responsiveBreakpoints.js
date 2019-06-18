import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={1440} />;
export const Tablet  = props => <Responsive {...props} minWidth={768} maxWidth={1439} />;
export const Mobile  = props => <Responsive {...props} maxWidth={767} />;
export const Default = props => <Responsive {...props} minWidth={768} />;
