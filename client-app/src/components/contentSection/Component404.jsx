import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Component404 = () => (
  <div className="jumbotron block-404">
    <h1 className="display-3 text-404">
      Page not found
      <br />
      😦
    </h1>
    <p className="lead">
      <Link className="btn btn-primary btn-lg" to="/">Back home</Link>
    </p>
  </div>
);

export default memo(Component404);
