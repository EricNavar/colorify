/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from 'react-router-dom';

import { Colorify } from './screens/Colorify';
import { PlaylistPage } from './screens/PlaylistPage';

type ScrollToTopProps = {
  children: JSX.Element;
};

function ScrollToTop(props: ScrollToTopProps) {
  const history = useHistory();
  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    });
    return unlisten;
  }, [history]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

function Root(): JSX.Element {
  const Helper = (props: any) => {
    return <PlaylistPage playlistId={props.match.params.id} />;
  };

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/playlist/:id">
              {Helper}
            </Route>
            <Route path="/">
              <Colorify />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export { Root };
